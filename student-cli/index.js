#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

// Mock Database (In real life, connect this to SQLite, MongoDB, or a JSON file)
const students = [
  { id: "1", name: "Alice Smith", grade: "A", age: 20 },
  { id: "2", name: "Bob Jones", grade: "B", age: 22 }
];

program
  .name('student-db')
  .description('A simple CLI for managing a student database')
  .version('1.0.0');

// --- ADD COMMAND ---
program
  .command('add')
  .description('Add a new student to the database')
  .requiredOption('-n, --name <string>', 'Student full name')
  .requiredOption('-g, --grade <char>', 'Student letter grade (A, B, C, D, F)')
  .option('-a, --age <number>', 'Student age', parseInt)
  .action((options) => {
    const newStudent = {
      id: String(students.length + 1),
      name: options.name,
      grade: options.grade.toUpperCase(),
      age: options.age || 'N/A'
    };
    
    students.push(newStudent);
    console.log(`Successfully added student: ${newStudent.name} (ID: ${newStudent.id})`);
    console.log('Current DB:', students);
  });
// Parse the arguments provided by the user
// program.parse(process.argv);
program.parse(); 