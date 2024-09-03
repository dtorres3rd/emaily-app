const passport = require('passport');

module.exports = app => {
app.get('/auth/google',
    //uses passport.use with GoogleStrategy acting as middleware function
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)

app.get('/auth/google/callback', passport.authenticate('google'))
};