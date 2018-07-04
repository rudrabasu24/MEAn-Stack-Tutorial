const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', (req, res) => {
    let user = new User({
        email: req.body.email.toLowerCase(),
        username: req.body. username.toLowerCase(),
        password: req.body.password
    });
    user.save((err) => {
        if(err) {
            if(err.code === 11000) {
                res.send({ success: false, msg: 'Username or email already exists' })
            } else {
                if(err.errors) {
                    if(err.errors.email) {
                        res.send({ success: false, msg: err.errors.email.message });
                    } else if(err.errors.username) {
                        res.send({ success: false, msg: err.errors.username.message });
                    } else if(err.errors.password) {
                        res.send({ success: false, msg: err.errors.password.message });
                    } else {
                        res.send({ success: false, msg: err });
                    }
                } else {
                    res.send({ success: false, msg: 'Could not register user, Error: ', err });
                }
            }
        } else {
            res.send({ success: true, msg: 'Account registered successfully!'});
        }
    })        
});

module.exports = router;