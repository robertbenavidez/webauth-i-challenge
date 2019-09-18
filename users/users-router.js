const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('./users-model.js')

const router = express.Router();
const restricted = require('../auth/restricted-middleware');





//Registers user and hash password

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error)
        })
})


router.post('/login', (req, res) => {
    let { username, password } = req.body;
    
    Users.findBy ({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({ message: `${user.username}, you may enter.` });
            } else {
                res.status(401).json({ message: 'You shall not pass.'});
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/users', restricted,  (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.send(err);
        });
});




module.exports = router;
