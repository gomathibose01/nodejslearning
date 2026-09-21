import pino from 'pino';

// Initialize a standardized production telemetry channel logger
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard'
        }
    }
});

export default logger;

