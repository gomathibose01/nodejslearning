// ValidationError — input failed schema or business rule checks.
// Thrown by: core/student.schema.js, core/student.rules.js
// Caught by:  CLI (exit 2), Express errorHandler (HTTP 400)
export class ValidationError extends Error {
  constructor(message, details = []) {
    super(message);
    this.name    = 'ValidationError';
    this.code    = 'VALIDATION_ERROR';
    this.details = details;   // array of field-level errors from Zod
  }
}

// NotFoundError — a requested record does not exist in the database.
// Thrown by: services/studentService.js (getStudent, deleteStudent)
// Caught by:  CLI (exit 1), Express errorHandler (HTTP 404)
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.code = 'NOT_FOUND';
  }
}

// ConflictError — operation would create a duplicate.
// Thrown by: services/studentService.js (addStudent duplicate check)
// Caught by:  CLI (exit 1), Express errorHandler (HTTP 409)
export class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.code = 'CONFLICT';
  }
}

// ExecutionError — an external command or database call failed.
// Thrown by: infra/shell/commandExecutor.js, infra/db/
// Caught by:  CLI (exit 1), Express errorHandler (HTTP 500)
export class ExecutionError extends Error {
  constructor(message, cause) {
    super(message);
    this.name  = 'ExecutionError';
    this.code  = 'EXECUTION_ERROR';
    this.cause = cause;   // the original error from execa or Prisma
  }
}

