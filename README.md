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

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests
- dotenv for environment variables
