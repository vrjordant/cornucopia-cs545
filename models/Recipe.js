const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Create Schema
const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
  	type: String,
  	required: true
  },
  image: {
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
  totalTime: {
  	type: Number,
  	required: true
  },
  yields: {
  	type: String,
  	required: true
  }
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);