const express = require('express');
const router = express.Router();

const {
  getProducts,
  getExpiryAlerts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
 
} = require('../controllers/product.controller');

const protect = require('../middleware/auth.middleware');


// PUBLIC — list all products
router.get('/', getProducts);

// PUBLIC — get expiry alerts
router.get('/alerts/expiry', getExpiryAlerts);

// PUBLIC — get single product
router.get('/:id', getProductById);


// PROTECTED — create product
router.post('/', protect, createProduct);

// PROTECTED — update product
router.put('/:id', protect, updateProduct);

// PROTECTED — delete product
router.delete('/:id', protect, deleteProduct);

module.exports = router;
