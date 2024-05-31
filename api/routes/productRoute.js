const express = require('express');
const router = express.Router();
const {getProducts , getProduct , createProducts , deleteProduct} = require('../controllers/productController')

router.get('/products' , getProducts );
router.get('/product/:id' , getProduct);
router.post('/product' , createProducts);
router.delete('/product/:id' , deleteProduct);

module.exports = router;