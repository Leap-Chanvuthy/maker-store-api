const express = require('express');
const router = express.Router();
const {getProducts , getProduct , createProducts , deleteProduct , updateProduct} = require('../../controllers/productController')
const upload = require('../../middleware/fileUpload');
const auth = require('../../middleware/auth');
const adminCheck = require('../../middleware/adminCheck');


router.get('/products' , getProducts );
router.get('/product/:id' , getProduct);
router.post('/product', upload.single('image'), auth ,createProducts);
router.delete('/product/:id' , deleteProduct);
router.patch('/product/:id' , updateProduct);

module.exports = router;