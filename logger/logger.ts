import winston from 'winston';
import morgan from 'morgan';

const { combine, timestamp, json } = winston.format;

export const logger = winston.createLogger({
  level: 'info', //add process env for getting log level
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: './logs/application.log',
    }),
    new winston.transports.File({
      filename: './logs/app-error.log',
      level: 'error',
    }),
  ],
});

export const morganMiddleware = morgan(
  function (tokens, req, res) {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      content_length: tokens.res(req, res, 'content-length'),
      response_time: Number.parseFloat(tokens['response-time'](req, res)),
    });
  },
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: message => {
        const data = JSON.parse(message);
        logger.http(`incoming-request`, data);
      },
    },
  },
);
