const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const passport = require('passport');

const User = require('../models/User');

require('../config/passport/passport-google')(passport);
// @route POST api/users/login
// @desc  Login user
// @access  Public
router.post('/login', [
    check('email')
        .isEmail().withMessage('Vnesete validna email adresa'),
    check('password')
        .notEmpty().withMessage('Lozinkata ne moze da e prazna')
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json(errors);
    const { email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json('Ne e pronajden korisnik so taa email adresa');
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) return res.status(400).json('Pogresna lozinka');

        const payload = {
            user: {
                id: user._id
            }
        };

        jwt.sign(payload, config.get('jwt_secret'), {
            expiresIn: 3600,
            algorithm: "HS256"
        }, (err, token) => {
            if(err) throw new Error(err.message);
            return res.status(200).json({token});
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: [{ msg: error.message}]});
    }
});

// @route GET auth/google
// @desc  Login with google
// @access  Public
router.post('/google', 
    passport.authenticate('google', { scope: ['profile'], session: false}));

router.get('/google/callback', 
    passport.authenticate('google', { session: false}), (req, res) => {
        console.log(req);
    })

module.exports = router;