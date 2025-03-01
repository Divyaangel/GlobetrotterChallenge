const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const destinationRoutes = require('./routes/destinationRoutes');
const userRoutes = require('./routes/userRoutes');


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/destinations', destinationRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
