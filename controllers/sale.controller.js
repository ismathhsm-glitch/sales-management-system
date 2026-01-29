const Sale = require('../models/Sale');
const Product = require('../models/Product');

exports.createSale = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    const totalPrice = product.price * quantity;

    // Create the sale record
    const sale = await Sale.create({
      product: productId,
      user: req.user._id, // Assumes auth middleware is used
      quantity,
      totalPrice
    });

    // Reduce product stock
    product.stock -= quantity;
    await product.save();

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};