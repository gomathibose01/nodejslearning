#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';
import readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

async function showMainMenu() {
    console.log('\n--- ◮ PRISMA STUDENT MANAGEMENT SYSTEM ---');
    console.log('1. View Roster (Type-Safe)');
    console.log('2. Register New Student');
    console.log('3. Quit');
    
    const choice = await askQuestion('Select Option (1-3): ');

    if (choice === '1') {
        try {
            // No SQL strings! Pure JavaScript object query array execution
            const roster = await prisma.student.findMany();
            console.log('\n--- 📋 Live Student Roster ---');
            console.table(roster);
        } catch (err) {
            console.error('❌ Failed to fetch roster:', err.message);
        }
        showMainMenu();
    } 
    else if (choice === '2') {
        const name = await askQuestion('Enter Name: ');
        const email = await askQuestion('Enter Email: ');
        const grade = await askQuestion('Enter Grade: ');

        try {
            const newStudent = await prisma.student.create({
                data: { name, email, grade }
            });
            console.log(`✅ Student registered successfully with Prisma ID: ${newStudent.id}`);
        } catch (err) {
            console.error('❌ Registration aborted:', err.message);
        }
        showMainMenu();
    } 
    else if (choice === '3') {
        console.log('👋 Turning off Prisma Client. Goodbye!');
        rl.close();
        await prisma.$disconnect();
        process.exit(0);
    } 
    else {
        console.log('❌ Selection out of bounds.');
        showMainMenu();
    }
}

showMainMenu();

