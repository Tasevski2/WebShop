const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    deliveryInfo: {
        phoneNumber: {
            type: String
        },
        city: {
            type: String
        },
        settlement: {
            type: String
        },
        streetAndNum: {
            type: String
        },
        postalCode: {
            type: String
        }
    },
    shoppingCart: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'test'
            },
            size: {
                type: String,
                required: true,
            },
            quantaty: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    orders: [
        {
            orderId: {
                type: Schema.Types.ObjectId,
                ref: 'order'
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    google: {
        id:{
            type: String
        },
        photo: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now()
    },
    facebook: {
        id:{
            type: String
        },
        photo: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('user', UserModel);

module.exports = User;