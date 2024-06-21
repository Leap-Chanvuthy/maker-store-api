// const Order = require('../models/orderModel');
// const Product = require('../models/productModel');
// const User = require('../models/userModel');
// const errorHandler = require('../utils/error');

// const createOrder = async (req, res, next) => {
//   try {
//     const products = req.body.products || []; 
//     const user_id = req.user.id;

//     if (!user_id || !products.length) {
//       return next(errorHandler(400, 'Please provide a user ID and at least one product in the order.'));
//     }

//     let totalAmount = 0;
//     const productErrors = []; 

//     for (const product of products) {
//       const { productId, quantity } = product;

//       if (!productId || !quantity || quantity <= 0) {
//         productErrors.push({ message: 'Invalid product details provided.', productId });
//         continue; 
//       }

//       const foundProduct = await Product.findById(productId);
//       if (!foundProduct) {
//         productErrors.push({ message: 'Product not found.', productId });
//         continue;
//       }

//       const unitPrice = foundProduct.price;
//       const totalPrice = unitPrice * quantity;

//       product.unitPrice = unitPrice; 
//       product.totalPrice = totalPrice; 

//       totalAmount += totalPrice;
//     }

//     if (productErrors.length > 0) {
//       return res.status(400).json({ message: 'Errors found in some products:', errors: productErrors });
//     }

//     const order = new Order({
//       user_id,
//       products,
//       totalAmount,
//     });

//     const savedOrder = await order.save();
//     res.status(201).json({ message: 'Order created successfully', order: savedOrder });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error creating order' });
//   }
// };

// module.exports = {createOrder};





// const Order = require('../models/orderModel'); 
// const Product = require('../models/productModel'); 
// const User = require('../models/userModel'); 
// const errorHandler = require('../utils/error'); 

// const createOrder = async (req, res, next) => {
//   try {
//     const products = req.body.products || [];
//     const user_id = req.user.id;
//     const foundUser = await User.findById(user_id);
//     const { phone_number, google_map_link, location } = req.body.shipping_information;

//     if (!foundUser) {
//       return next(errorHandler(400, 'You are not authenticated.'));
//     }

//     // Check for products
//     if (!products.length) {
//       return next(errorHandler(400, 'Please provide at least one product in the order.'));
//     }

//     let totalAmount = 0;
//     const productErrors = [];

//     for (const product of products) {
//       const { productId, quantity } = product;

//       // Check for product details
//       if (!productId || !quantity || quantity <= 0) {
//         productErrors.push({ message: 'Invalid product details provided.', productId });
//         continue;
//       }

//       const foundProduct = await Product.findById(productId);
//       console.log('Found Product:', foundProduct); // Log product details for debugging

//       if (!foundProduct) {
//         productErrors.push({ message: 'Product not found.', productId });
//         continue;
//       }

//       const unitPrice = foundProduct.price;
//       const totalPrice = unitPrice * quantity;

//       product.unitPrice = unitPrice;
//       product.totalPrice = totalPrice;

//       totalAmount += totalPrice;
//     }

//     if (productErrors.length > 0) {
//       return res.status(400).json({ message: 'Errors found in some products:', errors: productErrors });
//     }

//     const orderData = {
//       user_id,
//       user_credentials: {
//         username: foundUser.username,
//         email: foundUser.email,
//       },
//       shipping_information : {
//         phone_number : phone_number,
//         google_map_link : google_map_link,
//         location : location
//       },
//       products,
//       totalAmount,
//     };

//     const order = new Order(orderData);
//     const savedOrder = await order.save();

//     res.status(201).json({ message: 'Order created successfully', order : savedOrder });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error creating order' });
//   }
// };

// module.exports = { createOrder };



const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const errorHandler = require('../utils/error');
const stripe = require('stripe')('sk_test_51OwMDfEOGwCRRHlxAp6K1OJAYLqJQmxn2UcYOWs25uujrR34dPD9sogUXulvafinmpHW91zyQ8Ba0k7e4vy65zOG00EkVjRTcW'); // Replace with your secret key

const createOrder = async (req, res, next) => {
  try {
    const products = req.body.products || [];
    const user_id = req.user.id;
    const foundUser = await User.findById(user_id);
    const { phone_number, google_map_link, location } = req.body.shipping_information;

    if (!foundUser) {
      return next(errorHandler(400, 'You are not authenticated.'));
    }

    // Check for products
    if (!products.length) {
      return next(errorHandler(400, 'Please provide at least one product in the order.'));
    }

    let totalAmount = 0;
    const productErrors = [];

    for (const product of products) {
      const { productId, quantity } = product;

      // Check for product details
      if (!productId || !quantity || quantity <= 0) {
        productErrors.push({ message: 'Invalid product details provided.', productId });
        continue;
      }

      const foundProduct = await Product.findById(productId);
      console.log('Found Product:', foundProduct); // Log product details for debugging

      if (!foundProduct) {
        productErrors.push({ message: 'Product not found.', productId });
        continue;
      }

      const unitPrice = foundProduct.price;
      const totalPrice = unitPrice * quantity;

      product.unitPrice = unitPrice;
      product.totalPrice = totalPrice;

      totalAmount += totalPrice;
    }

    if (productErrors.length > 0) {
      return res.status(400).json({ message: 'Errors found in some products:', errors: productErrors });
    }

    // Calculate total amount in cents (Stripe uses cents as the unit)
    const totalAmountInCents = totalAmount * 100;

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmountInCents,
      currency: 'usd', // Change currency if needed (e.g., 'eur' for Euro)
    });

    const orderData = {
      user_id,
      user_credentials: {
        username: foundUser.username,
        email: foundUser.email,
      },
      shipping_information: {
        phone_number,
        google_map_link,
        location,
      },
      products,
      totalAmount,
      payment_intent_id: paymentIntent.id, // Add payment intent ID
    };

    const order = new Order(orderData);
    const savedOrder = await order.save();

    // Optional: Return client secret for Stripe Elements (if applicable)
    if (req.body.payment_intent_client_secret) {
      res.status(201).json({
        message: 'Order created successfully',
        order: savedOrder,
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

module.exports = { createOrder };

