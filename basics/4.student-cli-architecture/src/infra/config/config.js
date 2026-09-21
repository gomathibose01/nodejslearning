export const config = {
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  logLevel:    process.env.LOG_LEVEL    || 'info',
  logFormat:   process.env.LOG_FORMAT   || 'pretty',
  nodeEnv:     process.env.NODE_ENV     || 'development',
};
