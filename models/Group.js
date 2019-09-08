const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Create Schema
const GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
  	type: ObjectId,
  	required: true
  },
  recipes: {
    type: [ObjectId]
  }
});

module.exports = Group = mongoose.model('group', GroupSchema);