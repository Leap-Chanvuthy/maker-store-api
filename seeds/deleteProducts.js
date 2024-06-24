const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' }); 

// Import the Product model
const Product = require('../models/productModel'); // Adjust the path as necessary

// Function to delete all products
const deleteAllProducts = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Delete all products
    const result = await Product.deleteMany({});
    console.log(`Deleted ${result.deletedCount} products`);

    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error deleting products:', error);
    process.exit(1);
  }
};

deleteAllProducts();
