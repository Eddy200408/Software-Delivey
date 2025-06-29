const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Cliente cria novo pedido
router.post('/', authenticateToken, authorizeRoles('cliente'), pedidoController.criarPedido);

// Cliente vê seus pedidos
router.get('/meus', authenticateToken, authorizeRoles('cliente'), pedidoController.meusPedidos);

// Admin vê todos os pedidos
router.get('/todos', authenticateToken, authorizeRoles('admin'), pedidoController.todosPedidos);

// Entregador aceita pedido
router.post('/:id/aceitar', authenticateToken, authorizeRoles('entregador'), pedidoController.aceitarPedido);

// Entregador atualiza status do pedido
router.patch('/:id/status', authenticateToken, authorizeRoles('entregador'), pedidoController.atualizarStatus);

module.exports = router;
