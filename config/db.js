const mongoose = require('mongoose');
const config = require('config');

module.exports = async() => {
    try {
    await mongoose.connect(config.get('mongoURI'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log("Connected to database");
    } catch (err) {
        console.log(err);
    }
}