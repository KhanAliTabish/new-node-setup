import app from './app';
import mongoose from 'mongoose';

global.Promise = require('bluebird');
mongoose.Promise = global.Promise;

import { logger } from './logger';
import { config } from './config';

let server;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://localhost:27017/testing`);
    logger.info(`MongoDB Connected: {conn.connection.host}`);
    const port = config.get('server:port');
    server = app.listen(port, () => {
      logger.info(`server started on port 3000`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

//connect to DB and then start the server
connectDB();

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = error => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
  //close db connection
  await mongoose.connection.close();
});
