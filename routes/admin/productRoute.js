const express = require('express');
const router = express.Router();
const {getProducts , getProduct , createProducts , deleteProduct , updateProduct} = require('../../controllers/productController')
const upload = require('../../middleware/fileUpload');
const auth = require('../../middleware/auth');
const adminCheck = require('../../middleware/adminCheck');


router.get('/products' , getProducts );
router.get('/product/:id' , getProduct);
router.post('/product', upload.array('images', 10), auth, adminCheck, createProducts);
router.delete('/product/:id' , auth, adminCheck , deleteProduct);
router.patch('/product/:id' , auth, adminCheck , updateProduct);

module.exports = router;