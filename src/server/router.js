'use strict';

let router = require('express').Router;
class Router {
    constructor() {
        this.router = router();
        this.init();
    }
    init() {

        this.router.get('/', (req, res, next) => {
            res.send('index.html');
        });

    }
}
module.exports = new Router().router;
