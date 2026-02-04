const express = require('express');
const router = express.Router();
const {
  addSalesman,
  getSalesmen,
  updateSalesman,
  deleteSalesman
} = require('../controllers/salesman.controller');

const protect = require('../middleware/auth.middleware');

// Admin-only middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
};

// All routes protected + admin only
router.post('/', protect, adminOnly, addSalesman);
router.get('/', protect, adminOnly, getSalesmen);
router.put('/:id', protect, adminOnly, updateSalesman);
router.delete('/:id', protect, adminOnly, deleteSalesman);

module.exports = router;
