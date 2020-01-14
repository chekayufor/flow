const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check'); //https:express-validator.github.io/docs/

const User = require('../models/User');

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
    // res.send('Get logged user');
    try {
        const user = await User.findById(req.user.id).select('-password'); // to not return the password
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post(
    '/',
    //https:express-validator.github.io/docs/
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        // res.send('Login user');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email }) //promise;

            if (!user) {
                //bad request 400
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }
            //there is the user => compare the hash password and the password from the form
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                //bad request 400
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }
            //  to incrypt(#) the password with bcrypt
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000
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