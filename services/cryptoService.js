const axios = require('axios');
const CryptoPrice = require('../models/CryptoPrice');

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';
const COIN_IDS = ['bitcoin', 'matic-network', 'ethereum'];

async function fetchCryptoPrices() {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
      params: {
        ids: COIN_IDS.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true
      }
    });

    const data = response.data;
    
    for (const coinId of COIN_IDS) {
      const coinData = data[coinId];
      if (coinData) {
        await CryptoPrice.create({
          coinId,
          priceUSD: coinData.usd,
          marketCapUSD: coinData.usd_market_cap,
          priceChange24h: coinData.usd_24h_change
        });
      }
    }

    console.log('Cryptocurrency prices updated successfully');
  } catch (error) {
    console.error('Error fetching cryptocurrency prices:', error.message);
  }
}

module.exports = {
  fetchCryptoPrices
};
