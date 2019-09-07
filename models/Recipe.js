const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
  	type: String,
  	required: true
  },
  ingredients: {
  	type: [String],
  	required: true
  },
  instructions: {
  	type: String,
  	required: true
  },
  total_time: {
  	type: Number,
  	required: true
  },
  yields: {
  	type: String,
  	required: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);