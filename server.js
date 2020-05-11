const express = require('express');
const app = express();
const db = require('./config/db');
const passport = require('passport');
const fs = require('fs');
const path = require('path');
db();

require('./config/passport/passport-google')(passport);
require('./config/passport/passport-facebook')(passport);

app.use(express.json({ extended: false}));


// PROBA ZA UPLOAD NA SLIKA NA MONGO
// app.use(express.static(path.join(__dirname, 'public')));


// app.get('/:product_id', async (req, res) => {
//     // res.send("Server test route");
//     try {
//         const image = fs.readFileSync(__dirname + '/public/images/proba1.png');
//         const product = await Test.findOne({ _id: req.params.product_id});
//         product.photos.push({
//             type: 'image/png',
//             data: image,
//             src: `/images/proba.png`
//         });
//         await product.save();
//         return res.json(product);
//     } catch (error) {
//         return res.json(error);
//     }
    
// });

// app.get('/:product_id', async (req, res) => {
//     // res.send("Server test route");
//     try {
        
//         let html = ``;
//         const product = await Test.findOne({ _id: req.params.product_id});
//         product.photos.map(photo => {
//             html += `<img src="${photo.src}"/>`;
//         });
//         // await product.save();
//         return res.send(`<body>${html}</body>`);
//     } catch (error) {
//         return res.json(error);
//     }
    
// });

app.get('/', (req, res) => {
    res.send('Server route');
})

app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));


const port = process.env.PORT || 5000;

app.listen( port ,() => {
    console.log(`Server started on port: ${port}`);
});