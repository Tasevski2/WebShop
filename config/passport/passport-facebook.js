const FaceBookStrategy = require('passport-facebook').Strategy;
const config = require('config');

const User = require('../../models/User');

module.exports = (passport) => {
    passport.use(new FaceBookStrategy({
        clientID: config.get('facebook_app_id'),
        clientSecret: config.get('facebook_app_secret'),
        callbackURL: "http://localhost:5000/auth/facebook",
        profileFields: ['id', 'first_name', 'last_name', 'picture', 'email']
    }, async(accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value;

        try {
            let user = await User.findOne({ email });
            if(user) {
                if(user.facebook.id) return done(null, user);
                user.facebook = {
                    id: profile.id,
                    photo: profile.photos[0].value
                }
                await user.save();
                return done(null, user);
            }
            user = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: email,
                facebook: {
                    id: profile.id,
                    photo: profile.photos[0].value
                }
            };
            user = await new User(user).save();
            return done(null, user);
        } catch (err) {
           return done(err, null); 
        }
    }))
}