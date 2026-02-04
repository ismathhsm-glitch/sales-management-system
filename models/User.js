// models/User.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // used as username
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'salesman'], default: 'salesman' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
