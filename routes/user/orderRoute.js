const express = require('express');
const {createOrder} = require('../../controllers/orderController');
const router = express.Router();
const auth = require('../../middleware/auth');

router.post('/order' , auth , createOrder );

module.exports = router;