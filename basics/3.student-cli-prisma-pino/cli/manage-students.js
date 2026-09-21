#!/usr/bin/env node
import { PrismaClient } from '@prisma/client';
import readline from 'readline';
import logger from '../src/config/telemetry.js';

const prisma = new PrismaClient();
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

async function showMainMenu() {
    console.log('\n--- ◮ SYSTEM DASHBOARD PORTAL ---');
    console.log('1. Fetch Student Roster');
    console.log('2. Provision New Registration');
    console.log('3. Terminate Connection');
    
    const choice = await askQuestion('Select Operation Choice (1-3): ');

    if (choice === '1') {
        logger.info('Request received: Fetching entire roster records array...');
        try {
            const roster = await prisma.student.findMany();
            console.log('\n--- 📋 Student Roster ---');
            console.table(roster);
            logger.info({ recordCount: roster.length }, 'Roster query operation successfully logged out.');
        } catch (err) {
            logger.error(err, 'Failed to extract records matrix from SQLite.');
        }
        showMainMenu();
    } 
    else if (choice === '2') {
        const name = await askQuestion('Enter Student Name: ');
        const email = await askQuestion('Enter Unique Email: ');
        const grade = await askQuestion('Enter Grade Score: ');

        logger.info({ payload: { name, email, grade } }, 'Attempting creation transaction sequence...');

        try {
            const newStudent = await prisma.student.create({
                data: { name, email, grade }
            });
            logger.info({ newStudentId: newStudent.id }, '✅ Record successfully written down to structural tables.');
        } catch (err) {
            // Logs a level 50 warning block mapping unique index constraint failures cleanly!
            logger.error(
                { context: { failedEmail: email, sqliteErrorCode: err.code } }, 
                `Registration transaction rejected: ${err.message}`
            );
        }
        showMainMenu();
    } 
    else if (choice === '3') {
        logger.info('Shutting down framework operations, closing active worker streams.');
        rl.close();
        await prisma.$disconnect();
        process.exit(0);
    } 
    else {
        logger.warn({ invalidInput: choice }, 'Selection parameter mismatch outside dashboard boundaries.');
        showMainMenu();
    }
}

showMainMenu();

