const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

// Try to force Google DNS for SRV resolution
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.log('Note: Could not override system DNS.');
}

// Force IPv4 for DNS resolution to fix ECONNREFUSED on Windows/Node 17+
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

mongoose.set('strictQuery', false);

const connectDB = async () => {
  const connUri = process.env.MONGODB_URI || 'mongodb+srv://BAHOAFRICA:BAHOAFRICA12345@cluster0.kk6f8.mongodb.net/baho-africa?retryWrites=true&w=majority';
  
  // Log connection attempt (hiding password)
  const maskedUri = connUri.replace(/:([^@]+)@/, ':****@');
  console.log(`Attempting to connect to MongoDB...`);

  const options = {
    serverSelectionTimeoutMS: 10000, // Increase timeout to 10s
    socketTimeoutMS: 45000,
  };

  try {
    const conn = await mongoose.connect(connUri, options);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    
    if (error.message.includes('ECONNREFUSED') && connUri.includes('+srv')) {
      console.log('TIP: This error often means your DNS provider cannot resolve MongoDB SRV records.');
      console.log('Try changing your DNS to 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare).');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;
