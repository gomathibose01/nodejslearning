import { appendFileSync } from 'fs';
import { logger }         from '../logger/logger.js';

const AUDIT_FILE = './data/audit.jsonl';

export const auditLog = {
  record({ action, data, dryRun = false }) {
    const entry = {
      timestamp: new Date().toISOString(),
      action,
      data,
      dryRun,
    };
    try {
      appendFileSync(AUDIT_FILE, JSON.stringify(entry) + '\n', 'utf8');
    } catch (err) {
      logger.error({ err, entry }, 'audit log write failed');
    }
  },
};
