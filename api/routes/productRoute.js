const express = require('express');
const router = express.Router();
const {getProducts , getProduct , createProducts , deleteProduct , updateProduct} = require('../controllers/productController')

router.get('/products' , getProducts );
router.get('/product/:id' , getProduct);
router.post('/product' , createProducts);
router.delete('/product/:id' , deleteProduct);
router.patch('/product/:id' , updateProduct);

module.exports = router;