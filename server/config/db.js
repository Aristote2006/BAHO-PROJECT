const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

// Try to force Google DNS for SRV resolution
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
  console.log('DNS servers set to Google (8.8.8.8) and Cloudflare (1.1.1.1)');
} catch (e) {
  console.log('Note: Could not override system DNS.');
}

// Force IPv4 for DNS resolution to fix ECONNREFUSED on Windows/Node 17+
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
  console.log('DNS result order set to IPv4 first');
}

mongoose.set('strictQuery', false);

const connectDB = async () => {
  const connUri = process.env.MONGODB_URI || 'mongodb://BAHOAFRICA:BAHOAFRICA12345@cluster0.kk6f8.mongodb.net:27017/baho-africa?ssl=true&authSource=admin&retryWrites=true&w=majority';
  
  // Log connection attempt (hiding password)
  const maskedUri = connUri.replace(/:([^@]+)@/, ':****@');
  console.log(`Attempting to connect to MongoDB: ${maskedUri}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Using DNS servers: 8.8.8.8, 8.8.4.4, 1.1.1.1`);
  console.log(`IPv4 preference enabled`);

  const options = {
    serverSelectionTimeoutMS: 15000, // Increase timeout
    socketTimeoutMS: 45000,
    maxPoolSize: 10, // Maintain up to 10 socket connections
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4, // Force IPv4
  };

  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(connUri, options);
    console.log("✅ MongoDB Connected Successfully");
    console.log(`Connected to host: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
    
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    
    // Specific error handling
    if (error.message.includes('Authentication failed')) {
      console.error('🔐 AUTHENTICATION ERROR: Check your username and password');
      console.error('   - Username: BAHOAFRICA');
      console.error('   - Make sure password is correct');
    } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
      console.error('🌐 NETWORK ERROR: Cannot resolve MongoDB hostname');
      console.error('   Try changing your DNS to 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare)');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('🔌 CONNECTION REFUSED: MongoDB server not accepting connections');
      console.error('   Check if your IP is whitelisted in MongoDB Atlas');
      console.error('   Current IP Whitelist entries: 0.0.0.0/0 should allow all IPs');
    } else if (error.message.includes('bad auth')) {
      console.error('🔐 BAD AUTHENTICATION: Invalid credentials');
      console.error('   Double-check your MongoDB username/password');
    }
    
    console.log('\n🔧 TROUBLESHOOTING STEPS:');
    console.log('1. Verify MongoDB Atlas cluster is NOT paused');
    console.log('2. Check Network Access tab - IP Whitelist should include your current IP');
    console.log('3. Confirm database user credentials are correct');
    console.log('4. Try connecting with MongoDB Compass to test credentials');
    console.log('5. Check if your ISP/firewall blocks MongoDB connections\n');
    
    // Don't exit the process, just log the error
    console.log('⚠️ Server will continue running without database connection');
  }
};

module.exports = connectDB;
