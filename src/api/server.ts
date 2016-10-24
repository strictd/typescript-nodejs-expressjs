'use strict';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as Person from './routes/person';

let cors = require('cors'),
    dotenv = require('dotenv'),
    errorhandler = require('errorhandler'),
    logger = require('morgan')
;


/**
 * The server.
 *
 * @class Server
 */
class Server {
  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    // create expressjs application
    this.app = express();

    // configure application
    this.config();

    // configure modules
    this.modules();

    // configure routes
    this.routes();

    // Error Handling
    this.app.use(this.errorHandler);
  }
/*
  private generateToken() {
    let buf = crypto.randomBytes(4);
    let ret = Math.floor(buf.readUInt32BE(0) % 6);

    return base58.encode(ret);
  }*/
  /**
   * Configure application
   *
   * @class Server
   * @method config
   * @return void
   */
  private config() {
    // configure jade
    // this.app.set("views", path.join(__dirname, "views"));
    // this.app.set("view engine", "jade");

    // Load .env File
    dotenv.load();

    // mount logger
    // this.app.use(logger("dev"));

    // mount json form parser
    this.app.use(bodyParser.json());

    // mount query string parser
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // CORS - Whitelisting
    this.app.use(cors({
      origin: function(origin, callback){
        let whitelist = process.env.WHITELISTCORS;
        let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
      },
      credentials: true
    }));

    // Switches for development mode
    if (process.env.NODE_ENV === 'development') {
      this.app.use(logger('dev'));
      this.app.use(errorhandler({ dumpExceptions: true, showStack: true }));
    }

  }

  /**
   * Load Modules
   */
  private modules() {

  }
  /**
   * Configure routes
   *
   * @class Server
   * @method routes
   * @return void
   */
  private routes() {
    // get router
    let person: Person.Info = new Person.Info();

    // login - session/create
    this.app.get('/', person.show.bind(person.show));
  }

  private errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    // Error Handling
    if (err.name === 'StatusError') {
      res.status(err.status).send(err.message);
    } else if (err.name === 'UnauthorizedError') {
      res.status(401).send(JSON.stringify({error: 'unauthorized'}));
    } else {
      next(err);
    }
  }
}

let server = Server.bootstrap();
export = server.app;
