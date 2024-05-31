const express = require('express');
const router = express.Router();
const {getProducts , getProduct , createProducts} = require('../controllers/productController')

router.get('/products' , getProducts );
router.get('/product/:id' , getProduct);
router.post('/product' , createProducts);

module.exports = router;