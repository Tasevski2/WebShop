const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestModel = new Schema({
    postId: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    color: {
        type: String
    },
    action: {
        type: Boolean
    },
    isForAdult: {
        type: Boolean
    },
    sex: {
        type: String
    },
    season: {
        type: String
    },
    productType: {
        type: String
    },
    productPattern: {
        type: String
    },
    photos: [
        {
            type: {
                type: String
            },
            data: {
                type: Buffer
            },
            src: {
                type: String
            }
        }
    ]
});

const Test = mongoose.model('test', TestModel);

module.exports = Test;