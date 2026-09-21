import { ValidationError } from './errors.js';

// Subject-to-grade restrictions — a sample business rule.
// Grade 1-3 students can only do Maths or English.
// This rule is separate from the schema because the SCHEMA just checks
// that subject is one of the valid values — this checks whether THAT
// COMBINATION of subject + grade is permitted.
const JUNIOR_GRADES   = [1, 2, 3];
const JUNIOR_SUBJECTS = ['Maths', 'English'];

export function applyStudentRules({ grade, subject }) {
  if (
    JUNIOR_GRADES.includes(grade) &&
    !JUNIOR_SUBJECTS.includes(subject)
  ) {
    throw new ValidationError(
      `Grade ${grade} students can only study ${JUNIOR_SUBJECTS.join(' or ')}`
    );
  }
  // Add more business rules here as policy evolves.
  // Each rule is a pure check — no DB calls, no I/O.
}

