const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../controllers/product.controller');
const protect = require('../middleware/auth.middleware');

// Public route: anyone can see products
router.get('/', getProducts);

// Protected route: only logged-in users can add products
router.post('/', protect, createProduct);

module.exports = router;