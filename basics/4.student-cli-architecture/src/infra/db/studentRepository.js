import { prisma } from './prismaClient.js';

// findById — retrieve one student by primary key.
// Returns: the student object, or null if not found.
// prisma.student.findUnique = SELECT * FROM Student WHERE id = ?
export async function findById(id) {
  return prisma.student.findUnique({
    where: { id: Number(id) },
    // where: the SQL WHERE clause condition
    // Number(id) ensures the id is always an integer, not a string
  });
}

// findByName — check for duplicate names.
// Returns: existing student object, or null.
// Used by addStudent to prevent duplicate enrolments.
export async function findByName(name) {
  return prisma.student.findFirst({
    where: {
      name:   name.trim(),
      status: 'ACTIVE',
      // Only check active students — deleted students can be re-enrolled
    },
  });
}

// list — retrieve all active students, newest first.
// Returns: array of student objects (empty array if none).
export async function list() {
  return prisma.student.findMany({
    where:   { status: 'ACTIVE' },
    // Only return non-deleted students
    orderBy: { createdAt: 'desc' },
    // orderBy = SQL ORDER BY — newest first
  });
}

// save — insert a new student record.
// Returns: the newly created student object with id and timestamps set.
// prisma.student.create = INSERT INTO Student (...) VALUES (...)
export async function save({ name, grade, subject }) {
  return prisma.student.create({
    data: {
      name,
      grade:   Number(grade),
      subject,
      status:  'ACTIVE',
      // createdAt and updatedAt are set automatically by Prisma
      // (@default(now()) and @updatedAt in schema.prisma)
    },
  });
}

// softDelete — mark a student as deleted without removing the row.
// Returns: the updated student object.
// prisma.student.update = UPDATE Student SET ... WHERE id = ?
export async function softDelete(id) {
  return prisma.student.update({
    where: { id: Number(id) },
    data:  { status: 'DELETED' },
    // Only the status field changes — all other data is preserved
  });
}

