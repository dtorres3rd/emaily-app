const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/Users');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/authRoutes')(app);

app.get('/healthcheck', (req,res) => {
    res.send({ status:'ok'});
})

const PORT = process.env.PORT || 5000; 
app.listen(PORT);