// Controller de Loja
const Loja = require('../models/Loja');

// Cadastrar nova loja (admin)
exports.criarLoja = async (req, res) => {
  try {
    const { nome, endereco, telefone } = req.body;
    const loja = await Loja.create({ nome, endereco, telefone });
    res.status(201).json(loja);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar loja.' });
  }
};

// Listar todas as lojas
exports.listarLojas = async (req, res) => {
  try {
    const lojas = await Loja.findAll();
    res.json(lojas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar lojas.' });
  }
};
