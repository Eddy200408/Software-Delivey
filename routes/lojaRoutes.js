const express = require('express');
const router = express.Router();
const lojaController = require('../controllers/lojaController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Admin cadastra nova loja
router.post('/', authenticateToken, authorizeRoles('admin'), lojaController.criarLoja);

// Listar todas as lojas (acesso público)
router.get('/', lojaController.listarLojas);

module.exports = router;
