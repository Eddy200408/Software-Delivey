const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Admin cadastra novo produto
router.post('/', authenticateToken, authorizeRoles('admin'), produtoController.criarProduto);

// Listar todos os produtos de uma loja
router.get('/loja/:lojaId', produtoController.produtosPorLoja);

// Listar todos os produtos (opcional)
router.get('/', produtoController.listarProdutos);

module.exports = router;
