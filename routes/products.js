const express = require('express');
const router = express.Router();
const request = require('request');
const Product = require('../models/Product');
const Test = require('../models/Test');
const { route } = require('./auth');
const isAuth = require('../middleware/isAuth');

const User = require('../models/User');

// TEST TEST TEST

const min_price = 10;
const max_price = 500000;
const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white'];
const sex = ['female', 'male'];
const seasons = ['spring-summer', 'fall-winter', 'resort', 'pre-fall'];
const product_type = ['maica', 'trenerki', 'rambovka', 'dukser', 'dzemper', 'corapi', 'kosula', 'pizami', 'bodi'];
const product_pattern = ['none', 'slika', 'rigi', 'tocki', 'tartan'];

// @route GET products/
// @desc  Get filtered products
// @access  Public
router.get('/', async (req, res) => {

    //  PAGE NUMBER AND SKIP

    const page = parseInt(req.query.page) < 1 || !parseInt(req.query.page) ? 1 : parseInt(req.query.page);
    const skip = (page - 1) * 20;

    // IS ON ACTION

    const action = req.query.action && req.query.action == "false" ? 0 : -1;
    const sortAction = action === -1 ? { action: -1 } : null;

    // COLORS

    const color = req.query.color ? req.query.color.split(' ') : colors;
    let colorsArray = [];
    color.forEach(c => {
        colorsArray.push({ color: c });
    });


    // MIN CENA - MAX CENA

    let minPrice = req.query['min-price'] ? parseInt(req.query['min-price']) : min_price;
    let maxPrice = req.query['max-price'] ? parseInt(req.query['max-price']) : max_price;

    if (minPrice < min_price || minPrice > max_price || minPrice > maxPrice) minPrice = min_price; console.log("VLEZE!!");
    if (maxPrice > max_price || maxPrice < min_price || maxPrice < minPrice) maxPrice = max_price; console.log("VLEZE");


    // ADULT OR KID

    const adult = req.query.kids && req.query.kids == "true" ? false : true;

    //   MALE OR FEMALE

    const sexArr = req.query.sex ? req.query.sex.split(' ') : sex;
    let sexArray = [];
    sexArr.forEach(s => {
        sexArray.push({ sex: s });
    });

    // SEASON 

    const seasonArr = req.query.season ? req.query.season.split(' ') : seasons;
    let seasonArray = [];
    seasonArr.forEach(s => {
        seasonArray.push({ season: s });
    });

    // PRODUCT TYPE

    const productTypeArr = req.query['product-type'] ? req.query['product-type'].split(' ') : product_type;
    let productTypeArray = [];
    productTypeArr.forEach(p => {
        productTypeArray.push({ productType: p });
    });

    // PRODUCT PATTERN

    const productPatternArr = req.query['product-pattern'] ? req.query['product-pattern'].split(' ') : product_pattern;
    const productPatternArray = productPatternArr.map(product => ({ productPattern: product }));

    console.log(minPrice + " - " + maxPrice);
    console.log("Skip: " + skip + " Page: " + page);
    console.log(colorsArray);
    console.log("Action: " + action);
    console.log("Adult: " + adult);
    console.log(sexArray);
    console.log(seasonArray);
    console.log(productTypeArray);
    console.log(productPatternArray);

    // FIND OPTIONS

    let findOptions = {
        isForAdult: adult,
        $and: [
            {
                $or: colorsArray
            },
            {
                $or: seasonArray
            },
            {
                $or: productTypeArray
            },
            {
                $or: productPatternArray
            }
        ]
    }
    if (req.query.sex) {
        findOptions.sex = req.query.sex;
    }
    console.log(findOptions);

    //   FINAL SEARCH

    try {
        const result = await Test.find(findOptions).where('price').gte(minPrice).lte(maxPrice).skip(skip).limit(21).sort(sortAction);
        // if(result.length < 21 && result.length !== 0) console.log('Posledna strana - Sokrij kopce');
        // if(result.length === 0) console.log('Ne se pronajdeni proizvodi so opisite: ...');
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }

    // request('https://jsonplaceholder.typicode.com/photos', async (err, response, body) => {
    //     if (err) return res.send('Request err: ' + err);
    //     const result = JSON.parse(body);
    //     console.log(result.length);
    //     let tests = await Test.find();
    //     for (let i = 0; i < 500; i++) {
    //         for (let j = 1; j < 3; j++) {
    //             tests[i].photos.push({
    //                 src: result[i+j].url
    //             });
    //         }
    //         await tests[i].save();
    //     }
    //     return res.send('Done');
    // });

    // ADD NEKOE POLE
    // let tests = await Test.find();
    // for (let i = 0; i < 500; i++) {
    //     tests[i].photos = [];
    //     await tests[i].save();
    // }
    // return res.json("DONE");
});

// @route GET products/:product_id
// @desc  Get single product by id 
// @access  Public
router.get('/:product_id', async (req, res) => {
    try {
        const product = await Test.findOne({ _id: req.params.product_id });
        if (!product) throw new Error('The product could not be found');
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
});

// @route PUT products/add-to-shopping-cart
// @desc  Add to shopping cart product by id 
// @access  Private
router.put('/add-to-shopping-cart', isAuth, async (req, res) => {
    const {
        product_id,
        size,
        quantaty
    } = req.body;

    try {
        const user = await User.findOne({ _id: req.user.id }).select('shoppingCart');
        let exists = false;
        user.shoppingCart.map(pro => {
            if (pro.product.toString() === product_id && pro.size === size) {
                pro.quantaty += 1;
                exists = true;
                return pro;
            }
            return pro;
        });
        if (!exists) user.shoppingCart.push({
            product: product_id,
            size,
            quantaty
        });

        user.save();
        return res.status(200).json(user.shoppingCart);
    } catch (error) {
        return res.status(500)
    }
});

// @route PUT products/shopping-cart/change-quantaty/:item_id
// @desc  Change quantaty of product in shopping cart by item id 
// @access  Private
router.put('/shopping-cart/change-quantaty/:item_id', isAuth, async (req, res) => {
    const { quantaty } = req.body;
    if (quantaty <= 0) return res.status(400).json('Kolicestvoto ne moze da bide 0 ili negativno');
    try {
        const user = await User.findOne({ _id: req.user.id }).select('shoppingCart');
        user.shoppingCart.map(item => {
            if (item._id.toString() === req.params.item_id) {
                item.quantaty = quantaty;
                return item;
            }
            return item;
        });
        user.save();
        return res.status(200).json(user.shoppingCart);
    } catch (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] })
    }

});

// @route Delete products/shopping-cart/:item_id
// @desc Delete item from shopping cart by item id 
// @access  Private
router.delete('/shopping-cart/:item_id', isAuth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id }).select('shoppingCart');
        user.shoppingCart = user.shoppingCart.filter(item => item._id.toString() !== req.params.item_id);
        user.save();
        return res.status(200).json(user.shoppingCart);
    } catch (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
});

// @route Delete products/shopping-cart
// @desc Clear shopping cart 
// @access  Private
router.delete('/shopping-cart', isAuth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id }).select('shoppingCart');
        user.shoppingCart = [];
        user.save();
        return res.status(200).json(user.shoppingCart);
    } catch (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
});
module.exports = router;