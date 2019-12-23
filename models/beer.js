import { Schema, model } from 'mongoose';

var BeerSchema = new Schema({
  name: String,
  style: String,
  brewer: String,
  liked: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
});

export default model('Beer', BeerSchema);
