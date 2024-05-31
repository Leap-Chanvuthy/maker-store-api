const { guest , admin } = require('../controllers/guestController');
const auth = require('../middleware/auth');
const adminCheck = require('../middleware/adminCheck');
const express = require('express');
const router = express.Router();

router.get('/guest', auth, guest);
router.get('/admin' , auth , adminCheck ,admin);

module.exports = router;
