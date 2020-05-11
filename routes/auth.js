const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/User');


// @route POST api/users/login
// @desc  Login user
// @access  Public
router.post('/login', [
    check('email')
        .isEmail().withMessage('Vnesete validna email adresa'),
    check('password')
        .notEmpty().withMessage('Lozinkata ne moze da e prazna')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json('Ne e pronajden korisnik so taa email adresa');
        if (!user.password) return res.status(400).json('Vie ste vekje logirani so google ili facebook');

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) return res.status(400).json('Pogresna lozinka');


        const payload = {
            user: {
                id: user._id
            }
        };

        jwt.sign(payload, config.get('jwt_secret'), {
            expiresIn: 3600,
            algorithm: "HS256"
        }, (err, token) => {
            if (err) throw new Error(err.message);
            return res.status(200).json({ token });
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: [{ msg: error.message }] });
    }
});

// @route GET auth/google
// @desc  Login with google and return token
// @access  Public
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false }), (req, res) => {
        if (req.err) return res.status(400).json(req.err);
        const payload = {
            user: {
                id: req.user._id
            }
        };
        try {
            jwt.sign(payload, config.get('jwt_secret'), {
                expiresIn: 3600,
                algorithm: "HS256"
            }, (err, token) => {
                if (err) throw new Error(err.meesage);
                return res.status(200).json({ token });
            })
        } catch (err) {
            return res.status(500).json({ errors: [{ msg: err.message }] })
        }
    });

// @route GET auth/facebook
// @desc  Login with facebook and return token
// @access  Public
router.get('/facebook',
    passport.authenticate('facebook', { scope: ['email'], session: false }), (req, res) => {
        if (req.err) return res.status(400).json(req.user);
        const payload = {
            user: {
                id: req.user._id
            }
        };

        try {
            jwt.sign(payload, config.get('jwt_secret'),
            {
                expiresIn: 3600,
                algorithm: 'HS256'
            }, (err, token) => {
                if(err) throw new Error(err.message);
                return res.status(200).json({ token });
            })
        } catch (err) {
            return res.status(500).json({ errors: [{ msg: err.message}]})
        }
    });
module.exports = router;