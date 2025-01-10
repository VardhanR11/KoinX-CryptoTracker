# KoinX Server

A Node.js and MongoDB based server-side application.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/koinx
   ```

3. Start the server:
   - For development: `npm run dev`
   - For production: `npm start`

## API Endpoints

- GET `/`: Welcome message

## Project Structure
```
KoinX/
├── models/
│   └── CryptoPrice.js     # Database schema
├── routes/
│   └── cryptoRoutes.js    # API routes
├── services/
│   └── cryptoService.js   # Price fetching service
├── server.js              # Main application
├── .env                   # Configuration
└── package.json          # Dependencies
```

## Implementation Details
1. Database Schema:
```
{
    coinId: String,
    priceUSD: Number,
    marketCapUSD: Number,
    priceChange24h: Number,
    timestamp: Date
}
```
2. Background Service:
- Uses node-cron for scheduling
- Runs every 2 hours (0 */2 * * *)
- Fetches data from CoinGecko API
- Stores in MongoDB Atlas

3. Testing:
Test the API using Postman or curl:
```
#Get Bitcoin stats
postman-get "http://localhost:5000/api/stats?coin=bitcoin"

# Get Bitcoin price deviation
postman-get "http://localhost:5000/api/deviation?coin=bitcoin"
```

## Features:
- Real-time price tracking for Bitcoin, Ethereum, and Matic
- Price statistics endpoint (/api/stats)
- Standard deviation calculation endpoint (/api/deviation)
- Automated price updates every 2 hours
- MongoDB Atlas integration
- Error handling and logging

## Technical details:
- Node.js/Express backend
- MongoDB Atlas database
- CoinGecko API integration
- Cron job scheduling
- dotenv for environment variables
