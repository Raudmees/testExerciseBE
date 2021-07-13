const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    temperature: {
      type: Number,
      required: true
    },
    windSpeed: {
      type: Number,
      required: true
    },
    humidity: {
      type: Number,
      required: true
    }
  }
);

module.exports = mongoose.model('City', citySchema);