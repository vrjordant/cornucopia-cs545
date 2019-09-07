const express = require('express');
const router = express.Router();

// Group Model
const Group = require('../../models/Group');
// User Model
const User = require('../../models/User');

// @route   GET api/groups
// @desc    Get Group by Id
// @access  Public
router.get('/:id', (req, res) => {
  Group.findById(req.params.id)
    .then(group => res.json(group));
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
