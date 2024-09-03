const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/Users');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// tell express to use the helper libraries
app.use(
    cookieSession({
        // set cookie session expiry to 30 days
        maxAge: 30 * 24 * 60 * 60 * 1000,
        // encrypt cookie
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.get('/healthcheck', (req,res) => {
    res.send({ status:'ok'});
})

const PORT = process.env.PORT || 5000; 
app.listen(PORT);