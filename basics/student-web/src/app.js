import express from 'express';
import studentRoutes from './routes/studentRoutes.js';

const app = express();
const PORT = 5000;

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Mount our student routes under the /api prefix
app.use('/api', studentRoutes);

// Catch-all fallback route
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Student Management Server running at http://localhost:${PORT}`);
    console.log(`Student details in http://localhost:${PORT}/api/students/`);
});

