import * as studentService         from '../../services/studentService.js';
import { printResult, printError } from '../formatters/output.js';

export function registerListStudents(program) {
  program
    .command('list-students')
    .description('List all enrolled students')
    .option('--grade <grade>', 'filter by grade level', Number)
    .option('--json', 'output as JSON', false)
    .action(async (opts) => {
      try {
        let students = await studentService.listStudents();
        if (opts.grade) students = students.filter((s) => s.grade === opts.grade);
        printResult(students, { json: opts.json });
      } catch (err) {
        printError(err, { json: opts.json });
      }
    });
}
