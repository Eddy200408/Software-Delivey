const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Cadastro de cliente
exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }
    // Verifica se já existe usuário com o mesmo email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }
    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);
    // Cria usuário com role 'cliente'
    const user = await User.create({ nome, email, senha: hashedPassword, role: 'cliente' });
    return res.status(201).json({ message: 'Cliente cadastrado com sucesso!', user: { id: user.id, nome: user.nome, email: user.email, role: user.role } });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao cadastrar cliente.' });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }
    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) {
      return res.status(401).json({ error: 'Senha inválida.' });
    }
    // Gera token JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token, user: { id: user.id, nome: user.nome, email: user.email, role: user.role } });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao fazer login.' });
  }
};
