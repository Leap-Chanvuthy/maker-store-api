const mongoose = require('mongoose');

const productSchma = new mongoose.Schema({
    productName : {
        type : String,
        required : true,
    },
    productType : {
        type : String,
        required : true,
    },
    productQty : {
        type : Number,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    imagePath : {
        type : String,
        required : true,
    },
    description :{
        type : String,
        required : true
    },
    user_id :{
        type : String,
        required : true
    }
}, {timestamps : true});

const Product = mongoose.model('Product' , productSchma);
module.exports = Product;