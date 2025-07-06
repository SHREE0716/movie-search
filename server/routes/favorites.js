const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite');
const verifyToken = require('../middleware/verifyToken');

// ✅ POST /api/favorites
router.post('/', verifyToken, async (req, res) => {
  const { title, poster } = req.body;

  if (!title || !poster) {
    return res.status(400).json({ message: 'Title and poster are required' });
  }

  try {
    const newFavorite = new Favorite({
      userId: req.user.id,
      title,
      poster
    });

    await newFavorite.save();
    res.status(201).json({ message: 'Movie saved to favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving favorite', error: err.message });
  }
});

// ✅ GET /api/favorites – Fetch all favorites for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching favorites', error: err.message });
  }
});

// ✅ DELETE /api/favorites/:id
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    console.log("🗑 DELETE requested for:", req.params.id);
    console.log("👤 From user:", req.user.id);

    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found or unauthorized' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('❌ Delete Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Export routes at the end (only once)
module.exports = router;
