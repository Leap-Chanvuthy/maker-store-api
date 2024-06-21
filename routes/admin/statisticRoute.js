const express = require('express');
const router = express.Router();
const {statistic} = require('../../controllers/statisticController');
const auth = require('../../middleware/auth');
const adminCheck = require('../../middleware/adminCheck');


router.get('/statistic' , auth , adminCheck , statistic );

module.exports = router;