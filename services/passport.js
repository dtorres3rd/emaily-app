const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// user params will be from mongoDb - user collection
// turn user to internal mongoDb - user collection id 
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// opposite of serializeUser
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientId,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id })
            if (existingUser) {
                //existing record
                return done(null, existingUser);
            }
            
            const user = await new User({ googleId: profile.id }).save()
            done(null, user);

        })
);