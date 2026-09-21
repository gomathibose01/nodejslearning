import { Command }               from 'commander';
import { registerAddStudent }    from './commands/addStudent.command.js';
import { registerListStudents }  from './commands/listStudents.command.js';
import { registerGetStudent }    from './commands/getStudent.command.js';
import { registerDeleteStudent } from './commands/deleteStudent.command.js';

export function buildCli() {
  const program = new Command();
  program
    .name('studentctl')
    .description('Student management CLI')
    .version('1.0.0')
    .addHelpCommand(true);

  registerAddStudent(program);
  registerListStudents(program);
  registerGetStudent(program);
  registerDeleteStudent(program);

  return program;
}
