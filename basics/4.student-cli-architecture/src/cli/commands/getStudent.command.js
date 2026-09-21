// src/cli/commands/getStudent.command.js
// LAYER: cli — get-student subcommand

import * as studentService         from '../../services/studentService.js';
import { printResult, printError } from '../formatters/output.js';

export function registerGetStudent(program) {
  program
    .command('get-student')
    .description('Get details of a specific student')
    .requiredOption('--id <id>', 'student ID', Number)
    .option('--json', 'output as JSON', false)
    .action(async (opts) => {
      try {
        const student = await studentService.getStudent(opts.id);
        printResult(student, { json: opts.json });
      } catch (err) {
        printError(err, { json: opts.json });
      }
    });
}

