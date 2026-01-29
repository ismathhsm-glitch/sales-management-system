const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);
