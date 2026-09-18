#!/usr/bin/env node
import sqlite3 from 'sqlite3';
import readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

// 1. Setup paths and lazy-load the SQLite database connection wrapper
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../data/school.db');

const connectDb = () => {
    return new (sqlite3.verbose().Database)(dbPath);
};

// 2. Setup the interface to read inputs from the standard terminal stream
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper function to turn readline questions into cleaner Promises
const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

// 3. The Core business logic functions
async function showMainMenu() {
    console.log('\n--- 🏫 STUDENT MANAGEMENT SYSTEM CLI ---');
    console.log('1. View All Students');
    console.log('2. Add New Student');
    console.log('3. Exit');
    
    const choice = await askQuestion('Select an option (1-3): ');
    
    // Lazy-load the DB connection ONLY when an action is selected
    const db = connectDb();

    if (choice === '1') {
        db.all('SELECT * FROM students', [], (err, rows) => {
            if (err) console.error('❌ Error fetching records:', err.message);
            else {
                console.log('\n--- 📋 Student Roster ---');
                console.table(rows); // Beautiful built-in terminal table printing tool!
            }
            db.close();
            showMainMenu(); // Loop back to the menu
        });
    } 
    else if (choice === '2') {
        const name = await askQuestion('Enter Student Name: ');
        const email = await askQuestion('Enter Student Email: ');
        const grade = await askQuestion('Enter Student Grade (A/B/C): ');

        db.run('INSERT INTO students (name, email, grade) VALUES (?, ?, ?)', [name, email, grade], function(err) {
            if (err) console.error('❌ Failed to add student:', err.message);
            else console.log(`✅ Success! Student added with ID: ${this.lastID}`);
            
            db.close();
            showMainMenu(); // Loop back to the menu
        });
    } 
    else if (choice === '3') {
        console.log('👋 Exiting system. Goodbye!');
        rl.close();
        db.close();
        process.exit(0);
    } 
    else {
        console.log('❌ Invalid selection. Please choose 1, 2, or 3.');
        db.close();
        showMainMenu();
    }
}

// Kick off the application loop
showMainMenu();
