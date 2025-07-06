const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash("admin123", 10); // 🔐 your admin password

    const adminUser = new User({
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      isAdmin: true,
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully!");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Error:", err);
    mongoose.disconnect();
  });
