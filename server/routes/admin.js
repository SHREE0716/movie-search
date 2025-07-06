const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Favorite = require('../models/favorite');
const verifyToken = require('../middleware/verifyToken');

// Middleware to check admin
function checkAdmin(req, res, next) {
  if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized' });
  User.findById(req.user.id).then(user => {
    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  }).catch(() => res.status(500).json({ message: 'Server error' }));
}

// ✅ Get all users
router.get('/users', verifyToken, checkAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
});

// ✅ Get all favorites
router.get('/favorites', verifyToken, checkAdmin, async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch favorites', error: err.message });
  }
});

// ✅ Get specific user's favorites
router.get('/user/:userId/favorites', verifyToken, checkAdmin, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Export router (only once!)
module.exports = router;
