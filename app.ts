import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';

import { morganMiddleware } from './logger/logger';

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    // this.mountRoutes();
  }

  config() {
    // parse json request body
    this.app.use(express.json());

    //enabling cors
    this.app.use(cors);

    // gzip compression
    this.app.use(compression());

    //enable HTTP headers
    this.app.use(helmet());

    //enabling body-parser
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    //using middleware for logging HTTP requests
    this.app.use(morganMiddleware);
  }

  //   mountRoutes() {
  //     this.app.use(router);
  //   }
}

export default new App().app;

//const app = express();

// export const expressApp = app;
