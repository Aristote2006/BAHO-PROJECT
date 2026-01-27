const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dns = require('dns');
require('dotenv').config();

// Handle DNS resolution for Windows compatibility
dns.setDefaultResultOrder('ipv4first');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - Allow specific origins for production
const corsOptions = {
  origin: function (origin, callback) {
    // In development, allow localhost origins
    if (process.env.NODE_ENV !== 'production' || !origin) return callback(null, true);
    
    // In production, allow your specific frontend domain
    const allowedOrigins = [
      'https://www.bahoafrica.rw/',  // Replace with your actual frontend URL
      'https://www.bahoafrica.rw/',  // Add your custom domain if you have one
      'http://localhost:3000', // Allow local development
      'http://localhost:3001', // Alternative local dev port
      'http://localhost:8080'  // Another common dev port
    ];
    
    const isAllowed = origin ? allowedOrigins.some(allowed => origin.includes(allowed)) : true;
    callback(null, isAllowed);
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Import routes
const contactRoutes = require('./routes/contacts');
const projectRoutes = require('./routes/projects');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');

// API routes - place these BEFORE static file serving
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Add a specific health check for auth endpoints
app.get('/api/health/auth', (req, res) => {
  res.json({ 
    status: 'OK', 
    endpoint: 'auth',
    timestamp: new Date().toISOString(),
    message: 'Auth endpoint is accessible'
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Important: Define API routes BEFORE static middleware
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Catch-all handler for SPA - but make sure API routes are not affected
  app.get('*', (req, res) => {
    // Ensure API routes are not caught by this handler
    if (req.originalUrl.startsWith('/api/') || req.originalUrl.startsWith('/health')) {
      // If we get here, it means an API route wasn't matched earlier
      res.status(404).json({ 
        error: 'API endpoint not found',
        path: req.originalUrl,
        message: 'Make sure your API route is defined before the static file handler'
      });
    } else {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    }
  });
}

// Database connection
const connectDB = require('./config/db');
connectDB();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    message: 'Server is running and API is accessible',
    endpoints: {
      events: '/api/events',
      projects: '/api/projects',
      auth: '/api/auth',
      contacts: '/api/contacts'
    }
  });
});

// Additional health checks for specific services
app.get('/health/db', async (req, res) => {
  try {
    // Check if MongoDB connection is alive
    const dbState = mongoose.connection.readyState;
    const dbStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    
    res.json({
      status: dbState === 1 ? 'OK' : 'ERROR',
      database: dbStates[dbState],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'BAHO AFRICA API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  
  // Ensure JSON response for API routes
  if (req.path.startsWith('/api/')) {
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message
    });
  } else {
    // For non-API routes, send JSON as well to maintain consistency
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message
    });
  }
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  console.log(`API 404: ${req.method} ${req.path}`);
  res.status(404).json({ 
    message: 'API endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`API available at: http://localhost:${PORT}/api`);
});
