import { PrismaClient }        from '@prisma/client';
import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';
import { config }              from '../config/config.js';
const adapter = new PrismaBetterSQLite3({ url: config.databaseUrl });
export const prisma = new PrismaClient({ adapter });
