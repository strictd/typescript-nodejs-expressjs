'use strict';
var bodyParser = require('body-parser');
var express = require('express');
var Person = require('./routes/person');
var cors = require('cors'), dotenv = require('dotenv'), errorhandler = require('errorhandler'), logger = require('morgan');
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
        this.modules();
        this.routes();
        this.app.use(this.errorHandler);
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        dotenv.load();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors({
            origin: function (origin, callback) {
                var whitelist = process.env.WHITELISTCORS;
                var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
                callback(null, originIsWhitelisted);
            },
            credentials: true
        }));
        if (process.env.NODE_ENV === 'development') {
            this.app.use(logger('dev'));
            this.app.use(errorhandler({ dumpExceptions: true, showStack: true }));
        }
    };
    Server.prototype.modules = function () {
    };
    Server.prototype.routes = function () {
        var person = new Person.Info();
        this.app.get('/', person.show.bind(person.show));
    };
    Server.prototype.errorHandler = function (err, req, res, next) {
        if (err.name === 'StatusError') {
            res.status(err.status).send(err.message);
        }
        else if (err.name === 'UnauthorizedError') {
            res.status(401).send(JSON.stringify({ error: 'unauthorized' }));
        }
        else {
            next(err);
        }
    };
    return Server;
}());
var server = Server.bootstrap();
module.exports = server.app;
