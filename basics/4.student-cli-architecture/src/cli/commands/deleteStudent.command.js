// src/cli/commands/deleteStudent.command.js
// LAYER: cli — delete-student subcommand

import * as studentService         from '../../services/studentService.js';
import { printResult, printError } from '../formatters/output.js';

export function registerDeleteStudent(program) {
  program
    .command('delete-student')
    .description('Remove a student (soft delete — record is kept for audit)')
    .requiredOption('--id <id>', 'student ID to delete', Number)
    .option('--json', 'output as JSON', false)
    .action(async (opts) => {
      try {
        const result = await studentService.deleteStudent(opts.id);
        printResult(result, { json: opts.json });
      } catch (err) {
        printError(err, { json: opts.json });
      }
    });
}

