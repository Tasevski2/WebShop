const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');


const User = require('../models/User');


// @route POST users/register
// @desc  Register user
// @access  Public
router.post('/register', [
    check('firstName')
        .notEmpty().withMessage('Ve molime vnesete go vaseto ime'),
    check('lastName')
        .notEmpty().withMessage('Ve molime vnesete go vaseto prezime'),
    check('email')
        .isEmail().withMessage('Vnesete validna email adresa'),
    check('password')
        .isLength({ min: 6}).withMessage('Lozinkata treba da e podolga od 6 karakteri')
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json(errors);
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.findOne({email});
        if(user) return res.status(400).json('Korisnikot vise postoi!');
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        await new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();

        return res.status(200).json('User registered!');

    } catch (error) {
        console.log(error);

        return res.status(500).json({errors: [{ msg: error.message}]});
    }
});






module.exports = router;