const express = require('express');
const router = express.Router();
var multer  = require('multer')
const fs = require("fs");

var upload = multer({ dest: __dirname+"/files" })

// Recipe Model
const Recipe = require('../../models/Recipe');
// Group Model
const Group = require('../../models/Group');

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

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

// @route   POST api/recipes/:id
// @desc    Create A Recipe and add it to a Group
// @access  Private
router.post('/:id', upload.single('file'), async (req, res) => {
  // Create Recipe


  
  
  let recipe = JSON.parse(req.body.recipe)

  console.log("********88")
  console.log(recipe)
  console.log(req.file)

  let base64 = base64_encode(req.file.path);


  const newRecipe = new Recipe({
    name: recipe.name,
    description: recipe.description,
    image: base64,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    totalTime: recipe.totalTime,
    yields: recipe.yields
  });

  // Add recipe to Recipe collection
  const final_recipe = await newRecipe.save();
  // Add recipe id to Group collection
  await Group.findByIdAndUpdate(req.params.id,
    { "$push": { "recipes": final_recipe._id } } );
  res.json(final_recipe);
});

module.exports = router;
