// logger.js
import winston from 'winston';

const formatToIST = (date = new Date()) => {
  const dtf = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const parts = dtf.formatToParts(date);
  const get = (type) => parts.find(p => p.type === type)?.value || '';
  return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}:${get('second')} IST`;
};

const logger = winston.createLogger({
  level: 'info', // or 'debug', etc.
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: () => formatToIST() }),
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
