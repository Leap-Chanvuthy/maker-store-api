const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const errorHandler = require('../utils/error');


const statistic = (async(req , res , next) => {
    try{
        const totalProduct = await Product.countDocuments();
        const totalUser = await User.countDocuments();
        const totalOrder = await Order.countDocuments();
        const productType = await Product.find({} , 'productType').countDocuments();

        res.status(200).json({message : 'successful' , totalProduct, productType : productType , totalUser , totalOrder})  
    }catch(error){
        next(errorHandler(400 , error ));
    }
} );

module.exports = {statistic};