import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dbPath = path.resolve(__dirname, '../../data/school.db');

export const connectDb = () => {
    const sqlite = sqlite3.verbose();
    return new sqlite.Database(dbPath, (err) => {
        if (err) {
            console.error('❌ Independent Web Server database connection failed:', err.message);
        }
    });
};
