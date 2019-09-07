const express = require('express');
const router = express.Router();

// Recipe Model
const Recipe = require('../../models/Recipe');
// Group Model
const Group = require('../../models/Group');

// @route   GET api/recipes/scrape
// @desc    Get Recipe data using Python scraper
// @access  Public
router.get('/scrape', async (req, res) => {
  console.log("Starting to scrape");
  // Spawns Recipe scraper
  const recipeLink = req.body.recipeLink;
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn('python', ['./test2.py', recipeLink]);
  // Reads data retrieved from Recipe scraper
  pythonProcess.stdout.on('data', (data) => {
    // Should do something with data, but doesn't work
  });
});

// @route   GET api/recipes/:id
// @desc    Get All Recipes from Group
// @access  Public
router.get('/:id', async (req, res) => {
  let group = await Group.findById(req.params.id);
  let recipeIds = group.recipes;
  let recipeObjects = await Recipe.find( { '_id': { $in: recipeIds } } );
  res.json(recipeObjects);
});

// @route   POST api/items/:id
// @desc    Create A Recipe and add it to a Group
// @access  Private
router.post('/:id', async (req, res) => {
  // Create Recipe
  const newRecipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    totalTime: req.body.totalTime,
    yields: req.body.yields
  });
  // Add recipe to Recipe collection
  const recipe = await newRecipe.save();
  // Add recipe id to Group collection
  await Group.findByIdAndUpdate(req.params.id,
    { "$push": { "recipes": recipe._id } } );

  res.json(recipe);
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
