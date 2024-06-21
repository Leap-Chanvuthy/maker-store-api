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
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  totalAmount: {
    type: Number,
    required: true,
  },
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;