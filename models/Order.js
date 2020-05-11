const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderModel = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'test'
            },
            boughtPrice: {
                type: Number,
                required: true
            },
            size: {
                type: String,
                required: true
            },
            quantaty: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    paymentType: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Order = mongoose.model('order', OrderModel);

module.exports = Order;