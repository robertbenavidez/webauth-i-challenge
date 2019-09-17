const express = require('express');
const bcrypt = require('bcrypt')

const Users = require('./users-model.js')

const router = express.Router();
const cors = require('cors')


router.get('/', (req, res) => {
    res.send("It's alive")
})

router.post('/api/register', (req, res) => {
    let { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 8)

    Users.add({ username, password: hash})
})



module.exports = router;
