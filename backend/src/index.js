const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://optics-photonics-2026-frontend.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'OPTICPHOTONSUMMIT2026 Backend is running',
    timestamp: new Date().toISOString(),
    database: 'Connected'
  });
});

// Basic API route
app.get('/api', (req, res) => {
  res.json({ 
    api: 'OPTICPHOTONSUMMIT2026 API',
    version: '1.0.0',
    event: 'Global Summit on Optics Photonics and Laser Technology',
    dates: 'November 16-18, 2026',
    location: 'Amsterdam, Netherlands'
  });
});

// API Routes
app.use('/api/registration', require('./routes/registration'));
app.use('/api/contact', require('./routes/contact'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    error: 'Internal Server Error',
    message: err.message 
  });
});

// Only start server if not in Vercel serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📅 Event: OPTICPHOTONSUMMIT2026`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}\n`);
  });
}

module.exports = app;
