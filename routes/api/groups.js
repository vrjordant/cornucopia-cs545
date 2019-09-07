const express = require('express');
const router = express.Router();

// Group Model
const Group = require('../../models/Group');

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
router.post('/', (req, res) => {
  const newGroup = new Group({
    name: req.body.name,
    owner: req.body.owner
  });

  newGroup.save().then(group => res.json(group));
});

module.exports = router;
