'use strict';

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

var connection = mongoose.createConnection(process.env.MONGODB_URI);
var Schema = mongoose.Schema;

var PaymentSchema = Schema({
    amount: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    }
});

module.exports = connection.model('Payment', PaymentSchema);