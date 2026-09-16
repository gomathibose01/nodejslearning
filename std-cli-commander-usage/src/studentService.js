export class StudentService {
  constructor(dbEngine) {
    this.db = dbEngine;
  }

  getAll() {
    return this.db.read();
  }

  add(validatedData) {
    const students = this.db.read();
    
    // Auto-increment ID strategy
    const nextId = students.length > 0 ? Math.max(...students.map(s => Number(s.id))) + 1 : 1;
    
    const newStudent = { id: nextId, ...validatedData };
    students.push(newStudent);
    
    this.db.write(students);
    return newStudent;
  }

  delete(id) {
    const students = this.db.read();
    const initialLength = students.length;
    
    const filtered = students.filter(s => Number(s.id) !== Number(id));
    
    if (filtered.length === initialLength) {
      return false; // Student ID not found
    }
    
    this.db.write(filtered);
    return true;
  }
}

