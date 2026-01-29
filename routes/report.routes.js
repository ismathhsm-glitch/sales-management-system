const express = require('express');
const router = express.Router();
const { getSalesReport } = require('../controllers/report.controller');
const protect = require('../middleware/auth.middleware');

router.get('/sales', protect, getSalesReport);

module.exports = router;