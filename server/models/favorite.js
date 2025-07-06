const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: String,
  poster: String,
  year: String,
});

module.exports = mongoose.model('Favorite', FavoriteSchema); // ✅ Capital F
