const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');

// Example: Get current logged-in user profile
router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;