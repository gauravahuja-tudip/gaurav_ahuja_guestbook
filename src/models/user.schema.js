// get an instance of mongoose
var mongoose = require('mongoose');
// Create a mongoose schema
var schema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String
    }
});
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User',schema);