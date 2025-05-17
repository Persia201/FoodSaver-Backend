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

// CORS (Allow frontend to access backend API)
app.use(cors({
  origin: 'https://foodsaver-frontend.vercel.app', // Replace with your actual frontend domain if needed
  credentials: true
}));

// Health check endpoints
app.get('/', (req, res) => {
  res.send('FoodSaver API Running ✅');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy' });
});

// API Routes
app.use('/api/food', foodRoutes);
app.use('/api/users', userRoutes);

// Dynamic port for deployment (fallback to 8080 locally)
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
