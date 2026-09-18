#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';

// Initialize the automatically generated type-safe client instance
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting Prisma Database Mock Seeding...');

    // Use a native JavaScript array to pass records
    const studentsToSeed = [
        { name: 'Evan Rogers', email: 'evan@school.com', grade: 'A' },
        { name: 'Fiona Gallagher', email: 'fiona@school.com', grade: 'B' }
    ];

    for (const student of studentsToSeed) {
        // upsert avoids duplicate crashes: updates if exists, creates if missing
        await prisma.student.upsert({
            where: { email: student.email },
            update: {}, 
            create: student
        });
    }

    console.log('✅ Prisma database successfully initialized and seeded.');
}

main()
    .catch((e) => console.error('❌ Seeding failed:', e))
    .finally(async () => {
        await prisma.$disconnect(); // Clean connection channel breakdown
    });

