const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const errorHandler = require('../utils/error');

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
    };

    const order = new Order(orderData);
    const savedOrder = await order.save();
    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
};


const getOrders = (async (req , res , next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find().skip(skip).limit(limit);
    const totalItem = await Order.countDocuments();

    if (orders.length > 0){
      res.status(200).json({
        message : 'success',
        orders,
        currentPage : page,
        previous  : Math.ceil(page - 1),
        next : Math.ceil(page + 1),
        totalPage : Math.ceil(totalItem / limit)
      });
    }else {
      res.status(400).json({message : 'No orders data found'});
    }

  }catch (error){
    next(errorHandler(400, error));
  }
});



const getOrder = (async (req , res , next) => {
  try {
    const id = req.params.id;
    const order = await Order.findOne({_id : id});

    if (order){
      res.status(200).json({message : 'success' , order});
    }else {
      res.status(400).json({message : 'Order is not found'});
    }

  }catch (error){
    next(errorHandler(400, error));
  }
});


const updateOrderStatus = async (req, res, next) => {
  const { orderId, status } = req.body;
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
      return next(errorHandler(400, 'Invalid status'));
  }
  try {
      const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

      if (!order) {
          return next(errorHandler(404, 'Order not found'));
      }
      res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
      next(error);
  }
};




module.exports = { createOrder ,getOrders , getOrder, updateOrderStatus };

