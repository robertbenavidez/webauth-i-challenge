const express = require("express");
const helmet = require("helmet");

const UserRouter = require('./users/users-router.js')

const server = express();
const cors = require('cors');



// const db = require('./database/dbConfig.js');
// const Users = require('./users/users-model.js');
// const restricted = require('./auth/restricted-middleware.js');



server.use(helmet());
server.use(express.json());
server.use(cors());
server.use('/', UserRouter)



server.use(helmet());
server.use(express.json());



module.exports = server;