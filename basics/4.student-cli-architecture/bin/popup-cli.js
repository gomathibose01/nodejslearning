import { prisma }   from '../src/infra/db/prismaClient.js';
import { buildCli } from '../src/cli/index.js';
import { logger } from '../src/infra/logger/logger.js';

// Ensure the database schema exists before any command runs.
// $executeRaw runs a raw SQL statement — we use it to test connectivity.
// Prisma migrations (prisma migrate deploy) handle schema creation.
try {
  await prisma.$connect();
  // $connect() opens the database connection.
  // On SQLite this also creates the file if it doesn't exist.
} catch (err) {
  logger.fatal({ err }, 'database connection failed at startup');
  console.error('✗ Database connection failed:', err.message);
  process.exit(1);
}

// Build the commander program (registers all subcommands)
const program = buildCli();

// Parse process.argv — this triggers the .action() of whichever
// subcommand was typed. process.argv is the array of command-line
// arguments Node.js receives.
// e.g.: node bin/popup-cli.js add-student --name "Asha" --grade 4
//       process.argv = ['node', 'bin/popup-cli.js', 'add-student', '--name', 'Asha', '--grade', '4']
program.parse(process.argv);
