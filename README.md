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
