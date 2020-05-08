const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('config');

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: config.get('google_client_id'),
        clientSecret: config.get('google_client_secret'),
        // callbackURL: '/auth/google/callback',
        // proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(accessToken);
        
    }));
}