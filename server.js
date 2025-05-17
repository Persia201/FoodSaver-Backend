require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const foodRoutes = require('./routes/foodRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('FoodSaver API Running ✅');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is healthy' });
});

app.use('/api/food', foodRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT;

if (!PORT) {
  console.error('❌ PORT environment variable not set!');
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('⚠️ Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});
