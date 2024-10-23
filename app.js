const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Function to connect to the database
const connectToDatabase = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/vaccinationSystem';
    await mongoose.connect(mongoUrl);
    console.log('Database connected!');
  } catch (err) {
    console.error(err.message);
  }
};

// Only start the server if this file is executed directly
if (require.main === module) {
  const PORT = process.env.PORT || '0.0.0.0';
  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
}

// Export the app and connect function for testing
module.exports = { app, connectToDatabase };
