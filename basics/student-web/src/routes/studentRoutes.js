import express from 'express';
import { getAllStudents, createStudent } from '../controllers/studentController.js';

const router = express.Router();

// Define our endpoints
router.get('/students', getAllStudents);
router.post('/students', createStudent);

export default router;

