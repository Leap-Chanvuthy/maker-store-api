// const mongoose = require('mongoose');
// const Product = require('../models/productModel');

// const orderSchema = new mongoose.Schema({
//   // User who placed the order
//   user_id: {
//     type: String,
//     required: true,
//   },
//   // List of ordered products
//   products: [
//     {
//       productId: {
//         type : String,
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//         min: 1, 
//       },
//       status: {
//         type: String,
//         enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
//         default: 'pending',
//       },
//     },
//   ],
//   // Total order amount
//   totalAmount: {
//     type: Number,
//     required: true,
//   },
// }, {timestamps : true});

// const Order = mongoose.model('Order' , orderSchema);

// module.exports = Order;


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_credentials: {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  shipping_information : {
    phone_number : {
      type : String,
      required : true,
    },
    google_map_link : {
      type : String,
    },
    location : {
      type : String,
    }
  },
  products: [
    {
      productId: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
      },
      unitPrice: {  
        type: Number,
        required: true,
      },
      totalPrice: {  
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;