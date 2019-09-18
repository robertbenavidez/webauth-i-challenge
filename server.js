const express = require("express");
const helmet = require("helmet");
const session = require('express-session');

const UsersRouter = require('./users/users-router.js')

const server = express();
const cors = require('cors');


const sessionConfig = {
    name: 'oatmeal',
    secret: process.env.SESSION_SECRET || 'shhhh',
    cookie: {
        maxAge: 100 * 60 * 60,
        secure: false,
        httpONly: true
    },
    resave: false,
    saveUninitialized: true,
}



server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))

server.use('/api/auth', UsersRouter);





module.exports = server;