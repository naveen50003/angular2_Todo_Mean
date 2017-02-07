'use strict';

process.env.ROOT = __dirname;

let app = require('./src/server/app');

class Server {

    constructor() {

        this.app = app;
        this.port = process.env.PORT || 3000;
        this.run()
    }

    run() {

        this.app.listen(this.port, () => console.log(`server running at ${this.port})`));
    }
}

new Server();
