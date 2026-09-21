import { ValidationError, ConflictError,
         NotFoundError, ExecutionError } from '../../core/errors.js';

export function formatStudent(s) {
  return `  #${String(s.id).padStart(3, '0')}  ${s.name.padEnd(30)}  ` +
         `Grade ${s.grade}  ${s.subject}  [${s.status}]`;
}

export function formatStudentList(students) {
  if (students.length === 0) return '  (no students found)';
  const header  = `  ${'ID'.padStart(3)}  ${'NAME'.padEnd(30)}  GRADE  SUBJECT`;
  const divider = `  ${'─'.repeat(3)}  ${'─'.repeat(30)}  ${'─'.repeat(5)}  ${'─'.repeat(10)}`;
  return [header, divider, ...students.map(formatStudent)].join('\n');
}

export function printResult(data, { json = false } = {}) {
  if (json) { console.log(JSON.stringify(data, null, 2)); return; }
  if (Array.isArray(data)) {
    console.log('\nStudents:\n');
    console.log(formatStudentList(data));
    console.log(`\n  Total: ${data.length}`);
  } else {
    console.log('\n✓ ' + JSON.stringify(data, null, 2));
  }
}

export function printError(err, { json = false } = {}) {
  const msg = json
    ? JSON.stringify({ error: err.message, code: err.code, details: err.details })
    : `\n✗ ${err.message}${err.details ? '\n  ' + err.details.join('\n  ') : ''}`;
  console.error(msg);
  if (err instanceof ValidationError)                              process.exitCode = 2;
  else if (err instanceof NotFoundError  ||
           err instanceof ConflictError  ||
           err instanceof ExecutionError) process.exitCode = 1;
  else                                                             process.exitCode = 1;
}
