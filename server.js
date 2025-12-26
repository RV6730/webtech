require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./backend/config/database');
const { apiLimiter } = require('./backend/middleware/rateLimiter');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// Serve static files from the root directory (HTML, CSS, images)
app.use(express.static(path.join(__dirname)));

// API Routes
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/candidates', require('./backend/routes/candidates'));
app.use('/api/elections', require('./backend/routes/elections'));
app.use('/api/votes', require('./backend/routes/votes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
});
