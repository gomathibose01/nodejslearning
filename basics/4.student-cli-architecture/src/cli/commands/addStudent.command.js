import * as studentService        from '../../services/studentService.js';
import { printResult, printError } from '../formatters/output.js';

export function registerAddStudent(program) {
  // program is the commander Command object passed in from cli/index.js

  program
    .command('add-student')
    // Declares a subcommand. User types: studentctl add-student [options]

    .description('Enrol a new student')

    .requiredOption('--name <name>', 'student full name')
    // requiredOption = commander will refuse to run if --name is missing
    // <name> = placeholder shown in --help output
    // PARALLEL: like a mandatory field in a CICS map

    .requiredOption('--grade <grade>', 'grade level (1-12)', Number)
    // Number at the end = commander converts the string "4" to the number 4
    // Without this, grade would be the string "4", and Zod's .int() check
    // would fail because "4" !== 4 in JavaScript's strict type system.

    .requiredOption(
      '--subject <subject>',
      'subject (Maths|Science|English|History|Geography)'
    )

    .option('--json', 'output result as JSON', false)
    // --json is optional (no "required"). Default: false.
    // When true, printResult outputs raw JSON instead of formatted text.

    .option('--dry-run', 'validate without saving', false)
    // --dry-run: validate input and show what would be saved,
    // but don't actually write to the database.

    .action(async (opts) => {
      // .action() is called when this subcommand is invoked.
      // opts = { name, grade, subject, json, dryRun } — already parsed by commander

      try {
        if (opts.dryRun) {
          // Dry-run: validate only, don't call the service
          const { validateStudentInput } = await import('../../core/student.schema.js');
          const { applyStudentRules }    = await import('../../core/student.rules.js');
          const validated = validateStudentInput(opts);
          applyStudentRules(validated);
          printResult({ dryRun: true, would: 'add', data: validated }, { json: opts.json });
          return;
        }

        // Call the service — this is the only line that matters.
        // Everything else in this file is CLI scaffolding around this call.
        const student = await studentService.addStudent({
          name:    opts.name,
          grade:   opts.grade,
          subject: opts.subject,
        });

        printResult(student, { json: opts.json });

      } catch (err) {
        printError(err, { json: opts.json });
      }
    });
}

