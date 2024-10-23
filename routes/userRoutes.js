const express = require('express');
const User = require('../models/user');
const router = express.Router();

// POST: Register a new user
router.post('/', async (req, res) => {
  try {
    const { name, address, n_id } = req.body;
    const newUser = new User({ name, address, n_id });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
