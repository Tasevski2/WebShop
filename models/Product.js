const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductModel = new Schema({
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    material: [
        {
            type: String
        }
    ],
    season: [
        {
            type: String
        }
    ],
    sleevs: {
        type: String,
        required: true
    },
    onAction: {
        type: Boolean,
        required
    },
    available: {
        type: Boolean,
        required: true
    },
    sizes: [
        {
            type: String
        }
    ],
    productType: {
        type: String,
        required: true
    },
    productPattern: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Product = mongoose.model('product', ProductModel);

module.exports = Product;