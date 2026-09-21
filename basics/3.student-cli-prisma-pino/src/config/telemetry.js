import pino from 'pino';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup a clean destination path to house our persistent error/log file
const logFilePath = path.resolve(__dirname, '../../data/combined.log');

// Define our separate logging pipeline destination streams
const streams = [
    // Destination 1: The real-time interactive terminal layout (Pretty formatting)
    {
        level: 'info',
        stream: pino.transport({
            target: 'pino-pretty',
            options: { colorize: true, translateTime: 'SYS:standard' }
        })
    },
    // Destination 2: The structural raw JSON log database file on the hard drive
    {
        level: 'info',
        stream: pino.destination({
            dest: logFilePath,
            sync: false // Asynchronous logging = ultra-fast performance!
        })
    }
];

// Initialize the multi-stream pipeline wrapper logger instance
const logger = pino({}, pino.multistream(streams));

export default logger;
