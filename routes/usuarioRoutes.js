const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Admin cadastra entregador
router.post('/entregador', authenticateToken, authorizeRoles('admin'), usuarioController.criarEntregador);

module.exports = router;