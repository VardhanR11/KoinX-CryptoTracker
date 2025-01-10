const express = require('express');
const router = express.Router();
const CryptoPrice = require('../models/CryptoPrice');

// Validate coin parameter
const validateCoin = (req, res, next) => {
  const validCoins = ['bitcoin', 'matic-network', 'ethereum'];
  const coin = req.query.coin;

  if (!coin) {
    return res.status(400).json({ error: 'Coin parameter is required' });
  }

  if (!validCoins.includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin. Must be one of: bitcoin, matic-network, ethereum' });
  }

  next();
};

// Calculate standard deviation
const calculateStandardDeviation = (prices) => {
  const n = prices.length;
  if (n === 0) return 0;

  // Calculate mean
  const mean = prices.reduce((sum, price) => sum + price, 0) / n;

  // Calculate sum of squared differences from mean
  const sumSquaredDiff = prices.reduce((sum, price) => {
    const diff = price - mean;
    return sum + (diff * diff);
  }, 0);

  // Calculate standard deviation
  const standardDeviation = Math.sqrt(sumSquaredDiff / n);

  // Round to 2 decimal places
  return Math.round(standardDeviation * 100) / 100;
};

// GET /stats endpoint
router.get('/stats', validateCoin, async (req, res) => {
  try {
    const coin = req.query.coin;
    
    const latestPrice = await CryptoPrice.findOne(
      { coinId: coin },
      {},
      { sort: { timestamp: -1 } }
    );

    if (!latestPrice) {
      return res.status(404).json({ error: 'No data found for the specified coin' });
    }

    const response = {
      price: latestPrice.priceUSD,
      marketCap: latestPrice.marketCapUSD,
      "24hChange": latestPrice.priceChange24h
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching crypto stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /deviation endpoint
router.get('/deviation', validateCoin, async (req, res) => {
  try {
    const coin = req.query.coin;
    
    // Get the last 100 records for the specified coin
    const records = await CryptoPrice.find(
      { coinId: coin },
      { priceUSD: 1 },
      { 
        sort: { timestamp: -1 },
        limit: 100
      }
    );

    if (!records || records.length === 0) {
      return res.status(404).json({ error: 'No data found for the specified coin' });
    }

    // Extract prices from records
    const prices = records.map(record => record.priceUSD);

    // Calculate standard deviation
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation });

  } catch (error) {
    console.error('Error calculating deviation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
