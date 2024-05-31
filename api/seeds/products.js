// api/seeds/products.js

const mongoose = require('mongoose');
const Product = require('../models/productModel'); // Ensure correct path to the Product model

mongoose.connect('mongodb+srv://MakerAdmin:MakerAdmin011203@vuthy.ifubzha.mongodb.net/Maker-Store?retryWrites=true&w=majority&appName=vuthy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');

  // Clear existing product data
  await Product.deleteMany({});

  // Sample product data
  const products = Array.from({ length: 50 }, (_, index) => ({
    productName: `Product ${index + 1}`,
    productType: `Type ${index + 1}`,
    productQty: 10,
    price: 100,
    imagePath: `/images/product${index + 1}.jpg`,
    description: `Description of Product ${index + 1}`,
  }));

  // Insert sample products into the database
  await Product.insertMany(products);
  console.log('Inserted sample products');

  mongoose.connection.close();
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
});
