import pino       from 'pino';
import { config } from '../config/config.js';

const transport = config.logFormat === 'pretty'
  ? { target: 'pino-pretty', options: { colorize: true } }
  : undefined;

export const logger = pino({ level: config.logLevel, transport });
