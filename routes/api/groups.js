const express = require('express');
const router = express.Router();

// Group Model
const Group = require('../../models/Group');
// User Model
const User = require('../../models/User');
// Recipe Model
const Recipe = require('../../models/Recipe');

// @route   GET api/groups/:id
// @desc    Get Group by Id, including Recipes
// @access  Public
router.get('/:id', async (req, res) => {
  let group = await Group.findById(req.params.id).lean();
  // Replaces Recipe Ids with actual Recipes
  const recipeIds = group.recipes;
  const recipeObjects = await Recipe.find( { '_id': { $in: recipeIds } } );
  group.recipes = recipeObjects;
  res.json(group);
});

// @route   GET api/groups/join/:id
// @desc    Join a group given the currently logged in User and Group Id
// @access  Public
router.get('/join/:gid/:uid', async (req, res) => {
  console.log("Joining group");

  await User.findByIdAndUpdate(req.params.uid, {
    "$push": { "groups": req.params.gid }
  });
  res.json(uid);
});

// @route   POST api/groups
// @desc    Create a Group
// @access  Private
router.post('/', async (req, res) => {
  let newOwnerId = req.body.owner;
  const newGroup = new Group({
    name: req.body.name,
    owner: newOwnerId
  });

  // Post new group to user
  let newOwner = await User.findById(newOwnerId);
  let updatedGroups = newOwner.groups;
  updatedGroups.push(newGroup._id);
  await User.updateOne({ _id: newOwnerId }, { groups: updatedGroups });

  newGroup.save().then(group => res.json(group));
});

module.exports = router;
