const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Create a new salesman (Admin only)
exports.addSalesman = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Salesman already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const salesman = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'salesman',
    });

    res.status(201).json(salesman);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all salesmen (Admin only)
exports.getSalesmen = async (req, res) => {
  try {
    const salesmen = await User.find({ role: 'salesman' }).select('-password');
    res.json(salesmen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update salesman (Admin only)
exports.updateSalesman = async (req, res) => {
  const { id } = req.params;
  const { name, email, status } = req.body;

  try {
    const salesman = await User.findById(id);
    if (!salesman) return res.status(404).json({ message: 'Salesman not found' });

    if (name) salesman.name = name;
    if (email) salesman.email = email;
    if (status) salesman.status = status;

    const updated = await salesman.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete salesman (Admin only)
exports.deleteSalesman = async (req, res) => {
  const { id } = req.params;

  try {
    const salesman = await User.findById(id);
    if (!salesman) return res.status(404).json({ message: 'Salesman not found' });

    await salesman.deleteOne();
    res.json({ message: 'Salesman removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
