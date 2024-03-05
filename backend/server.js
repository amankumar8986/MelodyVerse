const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

// Database connection
mongoose
  .connect('mongodb+srv://ak7323:12345@amankumar.06kevri.mongodb.net/newDB')
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Error"))

// User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware for JSON parsing
app.use(express.json());
app.use(cors());

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ error: 'Username or email already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  // Generate JWT token
  const token = jwt.sign({ userId: newUser._id }, 'secretKey', { expiresIn: '1h' });

  // Respond with success and token
  res.json({ message: 'Signup successful', token });
});

app.get('/posts', (req, res) => {
  // Replace this with actual implementation to fetch posts from the database
  const posts = [
    { id: 1, title: 'Post 1', content: 'This is the content of post 1' },
    { id: 2, title: 'Post 2', content: 'This is the content of post 2' },
  ];

  res.json(posts);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
