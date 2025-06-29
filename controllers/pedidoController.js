// Controller de Pedido com funções básicas
const Pedido = require('../models/Pedido');

// Criar novo pedido (cliente)
exports.criarPedido = async (req, res) => {
  try {
    const { produtos, valorTotal, latitude_cliente, longitude_cliente } = req.body;
    const clienteId = req.user.id;
    const novoPedido = await Pedido.create({
      clienteId,
      produtos,
      valorTotal,
      latitude_cliente,
      longitude_cliente,
      status: 'aguardando',
    });
    res.status(201).json(novoPedido);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pedido.' });
  }
};

// Listar pedidos do cliente logado
exports.meusPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({ where: { clienteId: req.user.id } });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos.' });
  }
};

// Listar todos os pedidos (admin)
exports.todosPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar todos os pedidos.' });
  }
};

// Entregador aceita pedido
exports.aceitarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado.' });
    if (pedido.entregadorId) return res.status(400).json({ error: 'Pedido já aceito.' });
    pedido.entregadorId = req.user.id;
    pedido.status = 'preparando';
    await pedido.save();
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao aceitar pedido.' });
  }
};

// Entregador atualiza status do pedido
exports.atualizarStatus = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado.' });
    if (pedido.entregadorId !== req.user.id) return res.status(403).json({ error: 'Acesso negado.' });
    pedido.status = req.body.status;
    await pedido.save();
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status.' });
  }
};
