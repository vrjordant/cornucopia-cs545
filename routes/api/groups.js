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

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
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
