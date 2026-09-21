
import { z }               from 'zod';
import { ValidationError } from './errors.js';

// z.object() defines a schema for a plain JS object.
// Each key is a field name; the value is a Zod validator for that field.
const studentInputSchema = z.object({

  name: z.string()
    // z.string() — must be a string (not a number, not null)
    .min(1,  'name cannot be empty')
    .max(50, 'name cannot exceed 50 characters')
    .trim(),
    // .trim() — strips leading/trailing whitespace before validation
    // PARALLEL: like INSPECT CONVERTING in COBOL

  grade: z.number()
    // z.number() — must be a number
    .int('grade must be a whole number')
    // .int() — no decimals (4 not 4.5)
    .min(1,  'grade must be at least 1')
    .max(12, 'grade cannot exceed 12'),

  subject: z.enum(['Maths', 'Science', 'English', 'History', 'Geography'])
    // z.enum() — value must be one of these exactly
    // PARALLEL: like a DB2 CHECK constraint or a COBOL 88-level condition
});

// validateStudentInput — the ONLY function exported from this file.
// Services call this; they never import zod directly.
// This keeps Zod as an implementation detail of core/ — if we switch
// to AJV later, only this file changes. Services are untouched.
export function validateStudentInput(input) {
  // .safeParse() tries to validate and returns a result object.
  // It does NOT throw — it returns { success: true, data } or
  // { success: false, error }.
  // We convert the Zod result into our own typed error below.
  const result = studentInputSchema.safeParse(input);

  if (!result.success) {
    // result.error.issues is an array of every field that failed.
    // e.g. [{ path: ['grade'], message: 'grade must be at least 1' }]
    const details = result.error.issues.map(
      (issue) => `${issue.path.join('.')}: ${issue.message}`
    );
    // Throw our OWN ValidationError (from core/errors.js), not a Zod error.
    // The service and CLI only ever see ValidationError — they never
    // know Zod exists.
    throw new ValidationError('Invalid student input', details);
  }

  // result.data is the validated and coerced input.
  // .trim() was applied to name, defaults were applied, etc.
  return result.data;
}

