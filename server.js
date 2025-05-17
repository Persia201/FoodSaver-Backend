require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const foodRoutes = require('./routes/foodRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Health Check
app.get('/', (req, res) => {
  res.send('FoodSaver API Running ✅');
});
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy' });
});

// Routes
app.use('/api/food', foodRoutes);
app.use('/api/users', userRoutes);

// Use the port from environment (Render or Railway sets this automatically)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
