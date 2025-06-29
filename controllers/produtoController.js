// Controller de Produto
const Produto = require('../models/Produto');
const Loja = require('../models/Loja');

// Cadastrar novo produto (admin)
exports.criarProduto = async (req, res) => {
  try {
    const { nome, preco, descricao, lojaId } = req.body;
    // Verifica se a loja existe
    const loja = await Loja.findByPk(lojaId);
    if (!loja) return res.status(404).json({ error: 'Loja não encontrada.' });
    const produto = await Produto.create({ nome, preco, descricao, lojaId });
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar produto.' });
  }
};

// Listar todos os produtos de uma loja
exports.produtosPorLoja = async (req, res) => {
  try {
    const { lojaId } = req.params;
    const produtos = await Produto.findAll({ where: { lojaId } });
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
};

// Listar todos os produtos (opcional)
exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
};
