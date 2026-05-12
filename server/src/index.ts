import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/database.js';

import habitRoutes from './routes/habitRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// API Routes
app.use('/api/habits', habitRoutes);
app.use('/api/users', userRoutes);

// Serve static files from the React app
const clientPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientPath));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// Connect to PostgreSQL and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Connected to PostgreSQL');
    return sequelize.sync({ alter: true }); // Sync models with database
  })
  .then(() => {
    console.log('✅ Database synchronized');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error('❌ Database connection/sync error:', err);
  });
