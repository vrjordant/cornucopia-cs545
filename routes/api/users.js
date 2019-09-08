const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');
// Group Model
const Group = require('../../models/Group');

// @route   GET api/users
// @desc    Get Groups by User
// @access  Public
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
  	.then(user => Group.find({
  		'_id': { $in: user.groups }
  		})
  		.then(groups => res.json(groups)));
});

// @route   POST api/users
// @desc    Create a User
// @access  Private
router.post('/', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });

  newUser.save().then(user => res.json(user));
});

module.exports = router;
