const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient')

const surveySchema = new Schema({
    title: String,
    subject: String,
    body: String,
    // array of schema - recipient schema, purpose of this is for sub document collection
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    // relationship field to another model w/c is user model
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('survey', surveySchema);