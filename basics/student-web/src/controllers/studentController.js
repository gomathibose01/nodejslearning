import { connectDb } from '../config/database.js';

// Handler: GET /api/students
export const getAllStudents = (req, res) => {
    // 💥 FIX: You must assign the execution call to a variable named 'db'!
    const db = connectDb(); 
    const query = 'SELECT * FROM students';

    db.all(query, [], (err, rows) => {
        db.close(); // Clean teardown
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows); // Stream records back to client
    });
};

// Handler: POST /api/students
export const createStudent = (req, res) => {
    const { name, email, grade } = req.body;

    if (!name || !email || !grade) {
        return res.status(400).json({ error: 'Payload missing parameters.' });
    }

    // 💥 FIX: Assign the execution call to 'db' here as well!
    const db = connectDb();
    const query = 'INSERT INTO students (name, email, grade) VALUES (?, ?, ?)';

    db.run(query, [name, email, grade], function (err) {
        db.close();
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: '🚀 Success! Student posted via Web Server.',
            studentId: this.lastID
        });
    });
};
