const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const Event = require('./server/models/Event');
const Project = require('./server/models/Project');

// Sample Data
const sampleEvents = [
  {
    title: "Annual Cultural Festival",
    description: "Join us for our biggest celebration of the year featuring traditional music, dance, and art from across Africa.",
    scope: { startDate: "2024-03-15" },
    time: "18:00",
    location: "Kigali Convention Center",
    category: "Festival",
    image: "/images/BAHO(55).jpg",
    featured: true
  },
  {
    title: "Youth Art Exhibition",
    description: "Showcasing talented young artists from Rwanda and neighboring countries.",
    scope: { startDate: "2024-03-22" },
    time: "10:00",
    location: "National Gallery",
    category: "Exhibition",
    image: "/images/LeeImage_100.jpg",
    featured: true
  },
  {
    title: "Music Workshop Series",
    description: "Learn from renowned African musicians and producers in this intensive workshop series.",
    scope: { startDate: "2024-04-05" },
    time: "09:00",
    location: "BAHO Creative Hub",
    category: "Workshop",
    image: "/images/JKP_2677.JPG",
    featured: true
  }
];

const sampleProjects = [
  {
    title: "Baho Performing Arts",
    description: "Showcasing African performing arts through theater, dance, and music performances. This program provides a platform for local artists to showcase their talents and connect with audiences.",
    location: "Kigali, Rwanda",
    image: "/images/LeeImage_128_project.jpg",
    category: "Performing Arts",
    featured: true
  },
  {
    title: "Talent Gear Program",
    description: "A comprehensive talent development program for emerging artists and creatives. The program includes mentorship, skills training, and exhibition opportunities.",
    location: "Kigali, Rwanda",
    image: "/images/LeeImage_150.jpg",
    category: "Education",
    featured: true
  },
  {
    title: "Baho Events",
    description: "Organizing cultural events, festivals, and exhibitions to promote African arts and culture. These events provide networking opportunities and exposure for artists.",
    location: "Kigali, Rwanda",
    image: "/images/BAHO(28).jpg",
    category: "Cultural Events",
    featured: true
  },
  {
    title: "Heritage Preservation Initiative",
    description: "A program focused on documenting and preserving traditional African art forms, crafts, and cultural practices for future generations.",
    location: "Ruhengeri, Rwanda",
    image: "/images/LeeImage_61.jpg",
    category: "Heritage",
    featured: false
  },
  {
    title: "Creative Entrepreneurship Program",
    description: "Training and support for creative professionals to build sustainable businesses in the creative economy. Includes business development and marketing training.",
    location: "Kigali, Rwanda",
    image: "/images/LeeImage_200.jpg",
    category: "Entrepreneurship",
    featured: false
  },
  {
    title: "Inclusive Arts Project",
    description: "Specialized programs for artists with disabilities, refugees, and other marginalized communities, ensuring equal access to creative opportunities.",
    location: "Kigali, Rwanda",
    image: "/images/LeeImage_38.jpg",
    category: "Inclusion",
    featured: false
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Handle DNS resolution for Windows compatibility
    const dns = require('dns');
    dns.setDefaultResultOrder('ipv4first');
    
    // Use the MongoDB Atlas connection string from environment variables
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/baho-africa';
    
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Seed Database
const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    console.log('Deleting existing data...');
    await Event.deleteMany({});
    await Project.deleteMany({});
    
    // Insert sample events
    console.log('Inserting sample events...');
    await Event.insertMany(sampleEvents);
    
    // Insert sample projects
    console.log('Inserting sample projects...');
    await Project.insertMany(sampleProjects);
    
    console.log('Sample data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run seeding
if (require.main === module) {
  seedDatabase();
}

module.exports = {
  seedDatabase,
  sampleEvents,
  sampleProjects
};