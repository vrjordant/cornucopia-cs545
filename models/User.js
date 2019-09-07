const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Create Schema
const UserSchema = new Schema({
  groups: {
    type: [ObjectId]
  }
});

module.exports = Group = mongoose.model('group', GroupSchema);