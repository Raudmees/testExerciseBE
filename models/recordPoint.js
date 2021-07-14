const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema ({

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
      },
      belongsToCityId: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
      }
    },
    { timestamps: true }
)

module.exports = mongoose.model('RecordPoint', recordSchema);