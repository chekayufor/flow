const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');//https://express-validator.github.io/docs/

const User = require('../models/User');

// @route     POST api/users
// @desc      Regiter a user
// @access    Public
router.post(
    '/',
    [
        //https:express-validator.github.io/docs/
        check('name', 'Please add name')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        // res.send(' Register a user');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //bad request 400
            return res.status(400).json({ errors: errors.array() });
        }
        // res.send('passed');
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                //bad request 400
                return res.status(400).json({ msg: 'User already exists' });
            }
            //create a new instanceof User
            user = new User({
                name,
                email,
                password
            });
            //  to incrypt(#) the password with bcrypt
            const salt = await bcrypt.genSalt(10); //promise

            user.password = await bcrypt.hash(password, salt); // promise

            await user.save(); //promise
            //res.send('User saved');

            //the obj that sand to jwt
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000 //in production preferable expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
