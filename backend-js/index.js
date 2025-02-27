const express = require('express');
  const cors = require('cors');
  const morgan = require('morgan');
  const mongoose = require('mongoose');
  const dotenv = require('dotenv');
  const path = require('path');

  // Load environment variables
  dotenv.config();

  // Initialize express
  const app = express();
  const PORT = process.env.PORT || 5000;

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  // MongoDB connection
  const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };

  // Define schemas
  const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    bio: { type: String, required: true },
    order: { type: Number, default: 0 }
  }, { timestamps: true });

  const AreaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 }
  }, { timestamps: true });

  const PublicationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: [String],
    publishDate: { type: Date, default: Date.now }
  }, { timestamps: true });

  const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'resolved'],
      default: 'pending'
    }
  }, { timestamps: true });

  // Define models
  const Team = mongoose.model('Team', TeamSchema);
  const Area = mongoose.model('Area', AreaSchema);
  const Publication = mongoose.model('Publication', PublicationSchema);
  const Contact = mongoose.model('Contact', ContactSchema);

  // Routes
  // Team routes
  app.get('/api/team', async (req, res) => {
    try {
      const team = await Team.find().sort({ order: 1, createdAt: -1 });
      res.json({ status: 'success', data: team });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

  // Areas routes
  app.get('/api/areas', async (req, res) => {
    try {
      const areas = await Area.find().sort({ order: 1, createdAt: -1 });
      res.json({ status: 'success', data: areas });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

  // Publications routes
  app.get('/api/publications', async (req, res) => {
    try {
      const publications = await Publication.find().sort({ publishDate:
  -1 });
      res.json({ status: 'success', data: publications });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

  // Contact route
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          status: 'error',
          message: 'Please provide name, email and message'
        });
      }

      const newContact = new Contact({
        name,
        email,
        phone,
        message
      });

      await newContact.save();

      res.status(201).json({
        status: 'success',
        message: 'Contact message sent successfully',
        data: newContact
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

  // Health check route
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running'
  });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong on the server',
      error: process.env.NODE_ENV === 'development' ? err.message :
  undefined
    });
  });

  // Start server
  const startServer = async () => {
    try {
      // Connect to database
      await connectDB();

      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  };

  startServer();