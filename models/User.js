const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  groups: {
    type: [ObjectId]
  }
});

module.exports = User = mongoose.model('user', UserSchema);