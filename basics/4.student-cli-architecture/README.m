node bin/popup-cli.js get-student --id 1

node bin/popup-cli.js --help


# student-mgmt — Architecture Hands-On

A complete, runnable student management CLI that mirrors the
create-volumes architecture designed by Arun. Every folder, every
file, and every dependency is explained line by line with mainframe
parallels throughout the code comments.


## Section 1: Folder → Architecture layer mapping

  bin/                    Entry point only. Thin as JCL.
  prisma/                 Schema = DB2 CREATE TABLE. Migrations = SYSIBM.SYSHISTORY.
  src/core/               Pure logic. Zero I/O. Like a COBOL validation routine.
  src/services/           Use cases. The only thing CLI and API both call.
  src/infra/shell/        The ONE place execa/child_process is used.
  src/infra/db/           The ONE place Prisma is used.
  src/infra/config/       Like SYS1.PARMLIB — one place for all parameters.
  src/infra/logger/       Like SMF but for application events. Uses Pino.
  src/infra/audit/        Like SMF type 30 records — durable, append-only.
  src/cli/                Delivery adapter #1. Commander + formatters.
  src/api/                Delivery adapter #2 (future Express). Documented as placeholder.
  test/unit/              Core + services tested in isolation. No real DB.
  test/integration/       Real Prisma + real SQLite. Run in CI.

## Section 2: The one rule that makes web reuse work

  src/cli/ and src/api/ may ONLY import from src/services/.
  They never reach into src/core/ or src/infra/ directly.
  This means: adding the web API = adding src/api/ files only.
  Zero changes to core, services, or infra.

## Setup (with Prisma installed)

  - install prisma
  npm install prisma --save-dev --legacy-peer-deps

    npm install prisma --save-dev


  npm install
  npm run db:push          # creates data/students.db from prisma/schema.prisma
  node bin/popup-cli.js --help

## Commands

  node bin/popup-cli.js add-student --name "Asha Rao" --grade 4 --subject Maths
  node bin/popup-cli.js add-student --name "Ravi Kumar" --grade 6 --subject Science
  node bin/popup-cli.js list-students
  node bin/popup-cli.js list-students --grade 4
  node bin/popup-cli.js get-student --id 1
  node bin/popup-cli.js delete-student --id 1
  node bin/popup-cli.js add-student --name "Test" --grade 4 --subject Maths --dry-run
  node bin/popup-cli.js add-student --name "Test" --grade 4 --subject Maths --json

