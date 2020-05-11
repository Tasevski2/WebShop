const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const isAuth = require('../middleware/isAuth');

const User = require('../models/User');
const Order = require('../models/Order');


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
        .isLength({ min: 6 }).withMessage('Lozinkata treba da e podolga od 6 karakteri')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) return res.status(400).json('Korisnikot vise postoi!');

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

        return res.status(500).json({ errors: [{ msg: error.message }] });
    }
});


// @route GET users/me
// @desc  Return auth user
// @access  Private
router.get('/me', isAuth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id }).select('-password');
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
});

// @route PUT users/delivery
// @desc  Update or add delivery informations
// @access  Private
router.put('/deliveryInfo', [isAuth, [
    check('city')
        .notEmpty().withMessage('Ve molime vnesete od koj grad ste'),
    check('settlement')
        .notEmpty().withMessage('Ve molime vnesete od koja naselba ste'),
    check('postalCode')
        .isLength({ min: 4, max: 4 }).withMessage('Ve molime vnesete validen postenski broj'),
    check('streetAndNum')
        .notEmpty().withMessage('Vnesete na koja ulica ziveete')
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    const {
        phoneNumber,
        city,
        settlement,
        streetAndNum,
        postalCode
    } = req.body;
    const deliveryInfo = {
        phoneNumber: phoneNumber ? phoneNumber : null,
        city,
        settlement,
        streetAndNum,
        postalCode
    };
    try {
        const user = await User.findOne({ _id: req.user.id }).select('deliveryInfo');
        user.deliveryInfo = deliveryInfo;
        await user.save();
        return res.status(200).json(user);
    } catch (err) {
        return res.json({ errors: [{ msg: err.message }] });
    }
});

// @route PUT users/order
// @desc  Order
// @access  Private
router.put('/order', isAuth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id }).populate('shoppingCart.product', 'price').select('-password');
        let totalPrice = 0;
        let order = {
            products: user.shoppingCart.map(product => {
                totalPrice += product.product.price;
                console.log(product);
                return {
                    product: product.product._id,
                    size: product.size,
                    quantaty: product.quantaty,
                    boughtPrice: product.product.price
                }
            }),
            user: req.user.id,
            totalPrice: totalPrice
        };
        order = await new Order(order).save();
        user.orders.push({ orderId: order._id});
        await user.save();
        return res.json(order);
        // return res.json(order._id);
    } catch (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
});

// @route DELETE users/orders/:order_id
// @desc  Delete order
// @access  Private
router.delete('/orders/:order_id', isAuth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id}).select('orders');
        user.orders = user.orders.filter(order => order.orderId.toString() !== req.params.order_id);
        await user.save();
        await Order.findOneAndRemove({ _id: req.params.order_id});
        return res.status(200).json('Deleted');

    } catch (err) {
        return res.status(500).json({errors: [{ msg: err.message}]});
    }
});


module.exports = router;