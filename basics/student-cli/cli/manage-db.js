#!/usr/bin/env node
import db from '../src/config/database.js';

console.log('🏁 Starting Modern ESM Database Initialization CLI Tool...');

db.serialize(() => {
    // 1. Setup the table structure
    db.run(`
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            grade TEXT NOT NULL
        )
    `, (err) => {
        if (err) return console.error('❌ Error creating table:', err.message);
        console.log('   ↳ ✅ Students table verified/created.');
    });

    // 2. Prep secure seed data statements
    const insertStmt = db.prepare('INSERT OR IGNORE INTO students (name, email, grade) VALUES (?, ?, ?)');
    
    insertStmt.run('Alice Smith', 'alice@school.com', 'A');
    insertStmt.run('Bob Jones', 'bob@school.com', 'B');
    
    insertStmt.finalize((err) => {
        if (err) return console.error('❌ Error seeding data:', err.message);
        console.log('   ↳ 🌱 Mock student records successfully seeded.');
        
        db.close((closeErr) => {
            if (closeErr) console.error('❌ Error closing database:', closeErr.message);
            else console.log('🏁 Database ready! CLI script finished execution.');
        });
    });
});

