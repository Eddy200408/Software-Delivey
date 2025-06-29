const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');

const sequelize = require('./config/database');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const lojaRoutes = require('./routes/lojaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
require('dotenv').config();

const app = express(); // Inicializa o app antes de usar

// Middleware Globais
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rotas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/lojas', lojaRoutes);
app.use('/api/produtos', produtoRoutes);

// Apenas uma rota para '/'
app.get('/', (req, res) => {
  res.send('Bem-vindo à API!');
});

//Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

// Função para criar admin padrão, removendo o antigo se existir
async function criarAdminPadrao() {
  const adminEmail = 'admin@email.com';
  const adminSenha = 'admin1234';
  // Remove o admin antigo, se existir
  await User.destroy({ where: { email: adminEmail, role: 'admin' } });
  // Cria o admin com a senha definida no código
  const senhaHash = await bcrypt.hash(adminSenha, 10);
  await User.create({
    nome: 'Admin',
    email: adminEmail,
    senha: senhaHash,
    role: 'admin'
  });
  console.log('Usuário admin criado ou recriado com sucesso!');
}

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

sequelize.sync({ alter: true })
  .then(async () => {
    console.log('Tabelas sincronizadas com sucesso!');
    await criarAdminPadrao(); // Cria admin após sincronizar tabelas
  })
  .catch((error) => {
    console.error('Erro ao sincronizar tabelas:', error);
  });