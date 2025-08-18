// logger.js
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // or 'debug', etc.
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    // Optionally log to a file:
    // new winston.transports.File({ filename: 'logs/test.log', level: 'info' }),
  ],
});

export default logger;
