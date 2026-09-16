import fs from 'fs';
import path from 'path';

export class JSONDatabase {
  constructor(filePath) {
    this.filePath = filePath;
  }

  // Ensure file exists, create with initial mock data if missing
  ensureExists() {
    if (!fs.existsSync(this.filePath)) {
      const defaultData = [
        { id: 1, name: 'Alice Smith', grade: 'A', age: 20 },
        { id: 2, name: 'Bob Jones', grade: 'B', age: 22 }
      ];
      fs.writeFileSync(this.filePath, JSON.stringify(defaultData, null, 2));
    }
  }

  read() {
    this.ensureExists();
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }
}
