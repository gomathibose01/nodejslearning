export function validateAndSanitizeStudent(rawOptions) {
  if (!rawOptions.name || rawOptions.name.trim() === '') {
    throw new Error('Student name cannot be blank.');
  }

  // Grade normalization
  const cleanedGrade = (rawOptions.grade || 'Ungraded').trim().toUpperCase();

  // Age parsing with proper fallbacks
  let cleanedAge = 'N/A';
  if (rawOptions.age !== undefined && rawOptions.age !== null) {
    const parsed = parseInt(rawOptions.age, 10);
    if (isNaN(parsed) || parsed <= 0) {
      throw new Error('Age must be a valid positive integer number.');
    }
    cleanedAge = parsed;
  }

  return {
    name: rawOptions.name.trim(),
    grade: cleanedGrade,
    age: cleanedAge
  };
}

