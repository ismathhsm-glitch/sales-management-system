const Sale = require('../models/Sale');

exports.getSalesReport = async (req, res) => {
  try {
    const stats = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
          totalSalesCount: { $sum: 1 }
        }
      }
    ]);
    res.json(stats[0] || { totalRevenue: 0, totalSalesCount: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};