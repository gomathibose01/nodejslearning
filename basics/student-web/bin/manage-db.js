#!/usr/bin/env node
import { connectDb } from '../src/config/database.js';

console.log('🏁 Initializing independent student-web database...');

const db = connectDb();

db.serialize(() => {
    // 1. Create table structure
    db.run(`
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            grade TEXT NOT NULL
        )
    `);

    // 2. Seed fresh independent mock records
    const insertStmt = db.prepare('INSERT OR IGNORE INTO students (name, email, grade) VALUES (?, ?, ?)');
    insertStmt.run('Charlie Brown', 'charlie@school.com', 'B');
    insertStmt.run('Diana Prince', 'diana@school.com', 'A');
    
    insertStmt.finalize((err) => {
        if (err) console.error('❌ Error seeding web database:', err.message);
        else console.log('🌱 Independent web database successfully seeded with Charlie & Diana!');
        db.close();
    });
});
