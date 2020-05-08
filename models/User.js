const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    deliveryData: {
        phone_number: {
            type: String
        },
        city: {
            type: String
        },
        settlement: {
            type: String
        },
        street_and_num: {
            type: String
        }
    },
    shoppingCart: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product'
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('user', UserModel);

module.exports = User;