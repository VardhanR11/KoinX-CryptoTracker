const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const { fetchCryptoPrices } = require('./services/cryptoService');
const cryptoRoutes = require('./routes/cryptoRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/koinx')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Schedule cryptocurrency price updates every 2 hours
cron.schedule('0 */2 * * *', async () => {
  console.log('Running scheduled cryptocurrency price update');
  await fetchCryptoPrices();
});

// Initial fetch when server starts
fetchCryptoPrices();

// Routes
app.use('/api', cryptoRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to KoinX API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
