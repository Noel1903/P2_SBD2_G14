require('dotenv').config();

const Server = require('./server');

const serv = new Server();

serv.listen();