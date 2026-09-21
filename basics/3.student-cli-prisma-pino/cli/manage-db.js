#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';
import logger from '../src/config/telemetry.js';

const prisma = new PrismaClient();

async function main() {
    logger.info('🏁 Initiating database structural layout verification and mock seeding...');

    const seedData = [
        { name: 'Gomathi Pillai', email: 'gomathi@school.com', grade: 'A1' },
        { name: 'Hari Prasad', email: 'hari@school.com', grade: 'B' }
    ];

    for (const student of seedData) {
        // Upsert guarantees no crashes on rerun: drops updates if matching email matches
        const record = await prisma.student.upsert({
            where: { email: student.email },
            update: {},
            create: student
        });
        logger.info({ studentId: record.id, email: record.email }, 'Mock record transaction processed successfully.');
    }
    
    logger.info('✅ Database setup phase completed safely.');
}

main()
    .catch((err) => {
        logger.error(err, '❌ Critical database provisioning crash occurred.');
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

