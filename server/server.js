const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const favoriteRoutes = require('./routes/favorites');
const adminRoutes = require('./routes/admin'); // ✅ Move up

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/admin', adminRoutes); // ✅ Good now!

// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected ✅'))
  .catch((err) => console.log('MongoDB Error ❌', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
