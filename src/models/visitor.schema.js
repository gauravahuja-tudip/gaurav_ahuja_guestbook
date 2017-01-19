// get an instance of mongoose
var mongoose = require('mongoose');
// Create a mongoose schema
var schema =  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    mobile: {
      type: Number,
      required: true
    },
    intime: {
      type: String
    },
    outtime: {
      type: String
    },

    user_id: {
      type: String
    }
  },
  {
    timestamps: {created: 'created_at', updatedAt: 'updated_at'}
  });
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Visitor',schema);
