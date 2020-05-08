const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('config');

module.exports = () => {
    passport.use(new GoogleStrategy({

    }), (accessToken, refreshToken, profile, done) => {
        
    })
}