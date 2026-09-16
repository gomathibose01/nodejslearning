#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import { JSONDatabase } from './src/database.js';
import { StudentService } from './src/studentService.js';
import { validateAndSanitizeStudent } from './src/studentParser.js';

// Instantiate your modular system architecture
const dbPath = path.resolve('./students.json');
const dbEngine = new JSONDatabase(dbPath);
const studentService = new StudentService(dbEngine);

const program = new Command();

program
  .name('student-db')
  .description('A modular, high-testability Student System')
  .version('2.0.0');

// ADD
program
  .command('add')
  .description('Register a student profile')
  .requiredOption('-n, --name <string>', 'Full name')
  .requiredOption('-g, --grade <string>', 'Current grade')
  .option('-a, --age <number>', 'Age')
  .action((options) => {
    try {
      const cleanData = validateAndSanitizeStudent(options);
      const record = studentService.add(cleanData);
      console.log(`✅ Success: Saved ${record.name} (ID: ${record.id})`);
    } catch (err) {
      console.error(`❌ Input Error: ${err.message}`);
    }
  });

// LIST
program
  .command('list')
  .description('List student registry profiles')
  .action(() => {
    const list = studentService.getAll();
    list.length === 0 ? console.log('ℹ️ DB is empty.') : console.table(list);
  });

// DELETE
program
  .command('delete')
  .description('Delete a student profile by ID')
  .argument('<id>', 'Target ID')
  .action((id) => {
    const deleted = studentService.delete(id);
    deleted ? console.log(`🗑️ Removed ID ${id}`) : console.error(`❌ Student ID ${id} not found.`);
  });

program.parse();

