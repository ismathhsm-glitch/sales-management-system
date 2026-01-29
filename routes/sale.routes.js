const express = require('express');
const router = express.Router();
const { createSale } = require('../controllers/sale.controller');
const protect = require('../middleware/auth.middleware');

// Users must be logged in to make a sale
router.post('/', protect, createSale);

module.exports = router;