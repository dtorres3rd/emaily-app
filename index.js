const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// initialize
require('./models/Users');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.get('/healthcheck', (req,res) => {
    res.send({ status:'ok'});
})

// middlewares: preprocessing of incoming requests before sent out to route handles E.G. business logic - authentication
// puts session data to req.session for passport consumption
app.use(
    // sessions manager
    cookieSession({
        // set cookie session expiry to 30 days
        maxAge: 30 * 24 * 60 * 60 * 1000,
        // encrypt cookie
        keys: [keys.cookieKey]
    })
);

// pulls user id out of cookie data/ session data
app.use(passport.initialize());
app.use(passport.session());

// route handlers: routes available for this web server
require('./routes/authRoutes')(app);




const PORT = process.env.PORT || 5000; 
console.log('Listening to port', PORT);
app.listen(PORT);