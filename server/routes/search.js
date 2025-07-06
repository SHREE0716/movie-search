const express = require('express');
const axios = require('axios');
const router = express.Router();

const OMDB_API_KEY = process.env.OMDB_API_KEY;

// GET /api/search?title=batman
router.get('/', async (req, res) => {
  const title = req.query.query;


  if (!title) {
    return res.status(400).json({ message: 'Movie title is required' });
  }

  try {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}`);
    
    if (response.data.Response === 'False') {
      return res.status(404).json({ message: response.data.Error });
    }

    res.json(response.data.Search); // Return only movie array
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
