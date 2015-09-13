var mongoose = require('mongoose');

var BeerSchema = new mongoose.Schema({
  name: String,
  style: String,
  brewer: String,
  liked: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Beer', BeerSchema);
