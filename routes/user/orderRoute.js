const express = require('express');
const {createOrder , updateOrderStatus , getOrder , getOrders} = require('../../controllers/orderController');
const router = express.Router();
const auth = require('../../middleware/auth');
const adminCheck = require('../../middleware/adminCheck');

router.get('/orders' , auth , adminCheck , getOrders);
router.get('/order' , auth  , adminCheck , getOrder);
router.post('/order' , auth , createOrder );
router.put('/order', auth , adminCheck  , updateOrderStatus);

module.exports = router;