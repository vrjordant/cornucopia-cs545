const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Create Schema
const GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  recipes: {
    type: [ObjectId],
    default: Date.now
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);