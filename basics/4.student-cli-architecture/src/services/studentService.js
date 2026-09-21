import { validateStudentInput } from '../core/student.schema.js';
import { applyStudentRules }    from '../core/student.rules.js';
import { ConflictError,
         NotFoundError }        from '../core/errors.js';
import * as studentRepository   from '../infra/db/studentRepository.js';
import { auditLog }             from '../infra/audit/auditLog.js';
import { logger }               from '../infra/logger/logger.js';

// ── addStudent ───────────────────────────────────────────────────────

export async function addStudent(input, deps = { db: studentRepository }) {
  // deps.db defaults to the real repository.
  // In tests: addStudent(input, { db: mockDb }) — mock injected here.

  // Step 1: validate shape (Zod schema check)
  // If invalid, validateStudentInput throws ValidationError.
  // Execution stops here — no DB call made.
  const validated = validateStudentInput(input);

  // Step 2: apply business rules (grade/subject combination check)
  // Separate from schema because rules change independently.
  applyStudentRules(validated);

  // Step 3: check for duplicate (business rule requiring DB access)
  // Schema/rules can't check the DB — that's why this step is here
  // in the service, not in core/.
  const existing = await deps.db.findByName(validated.name);
  if (existing) {
    throw new ConflictError(
      `Student '${validated.name}' is already enrolled`
    );
  }

  // Step 4: persist the record
  const student = await deps.db.save(validated);
  // student now has: id, name, grade, subject, status, createdAt, updatedAt
  // (Prisma fills in id and timestamps automatically)

  // Step 5: write audit trail
  auditLog.record({ action: 'addStudent', data: { id: student.id, name: student.name } });

  // Step 6: log the operation (application log, not audit)
  logger.info({ studentId: student.id, name: student.name }, 'student added');

  // Step 7: return plain data to the caller
  // The CLI will format and print this.
  // The future API will JSON.stringify this.
  // This function never does either — that's the caller's job.
  return student;
}

// ── listStudents ─────────────────────────────────────────────────────

export async function listStudents(deps = { db: studentRepository }) {
  const students = await deps.db.list();
  // Returns array of student objects. Empty array if none — never null.
  logger.debug({ count: students.length }, 'students listed');
  return students;
}

// ── getStudent ───────────────────────────────────────────────────────

export async function getStudent(id, deps = { db: studentRepository }) {
  const student = await deps.db.findById(id);

  if (!student || student.status === 'DELETED') {
    // Treat soft-deleted records as not found — the caller doesn't
    // need to know the difference between "never existed" and "deleted".
    throw new NotFoundError(`Student with id ${id} not found`);
  }

  return student;
}

// ── deleteStudent ────────────────────────────────────────────────────

export async function deleteStudent(id, deps = { db: studentRepository }) {
  // First verify the student exists (reuses getStudent — throws NotFoundError if not)
  const student = await getStudent(id, deps);

  // Soft delete — sets status='DELETED', does not remove the row
  await deps.db.softDelete(id);

  // Audit trail — record who was deleted
  auditLog.record({
    action: 'deleteStudent',
    data:   { id: student.id, name: student.name },
  });

  logger.info({ studentId: id }, 'student deleted');

  // Return a confirmation object — CLI will print it, API will JSON-ify it
  return { deleted: true, id: Number(id), name: student.name };
}

