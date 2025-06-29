const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de cadastro de cliente
router.post('/register', authController.register);

// Rota de login de usuário
router.post('/login', authController.login);

module.exports = router;
