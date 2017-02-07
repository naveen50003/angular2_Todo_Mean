'use strict';

let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let ejs = require('ejs');

class App {

    constructor() {

        this.app = express();
        this.root = process.env.ROOT;
        this.config();
        this.routes();
        this.api();
    }
    config() {

        this.loadTemplates();
        this.app.use(express.static(path.join(this.root, 'dist')));
        //this.app.use(express.static(path.join(this.root, 'node_modules')));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    }
    routes() {

        let router = require('./router');
        this.app.use(router);
    }
    api() {

        let router = require('./api');
        this.app.use('/api', router);
    }
    loadTemplates() {

        this.app.set('views', path.join(this.root, 'views'));
        this.app.engine('html', ejs.renderFile);
        this.app.set('view engine', 'html');
        this.app.use(function(req, res, next) {

            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            next();
        });
    }
}
module.exports = new App().app;
