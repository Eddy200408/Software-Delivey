const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Admin cadastra entregador
exports.criarEntregador = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);
    const entregador = await User.create({
      nome,
      email,
      senha: hashedPassword,
      role: 'entregador'
    });
    res.status(201).json(entregador);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar entregador.' });
  }
};