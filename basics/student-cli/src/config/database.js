import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

// ESM workaround to recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Locate or create the database file inside the data folder
const dbPath = path.resolve(__dirname, '../../data/school.db');
const sqlite = sqlite3.verbose();
const db_connection = new sqlite.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('🔌 Connect ed to the SQLite student database (ESM).');
    }
});

export default db_connection;

