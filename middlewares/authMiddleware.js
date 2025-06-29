// Importa o módulo jsonwebtoken para manipulação de tokens JWT
const jwt = require('jsonwebtoken');
// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Middleware para verificar o token JWT em rotas protegidas
function authenticateToken(req, res, next) {
  // Recupera o header Authorization da requisição
  const authHeader = req.headers['authorization'];
  // Extrai o token do header (espera formato: 'Bearer TOKEN')
  const token = authHeader && authHeader.split(' ')[1];
  // Se não houver token, retorna erro 401 (não autorizado)
  if (!token) return res.status(401).json({ error: 'Token não fornecido.' });

  // Verifica e decodifica o token usando a chave secreta
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // Se o token for inválido ou expirado, retorna erro 403
    if (err) return res.status(403).json({ error: 'Token inválido.' });
    // Adiciona os dados do usuário decodificados à requisição
    req.user = user;
    // Chama o próximo middleware ou controller
    next();
  });
}

// Middleware para autorizar apenas usuários de determinados roles
function authorizeRoles(...roles) {
  // Retorna uma função middleware
  return (req, res, next) => {
    // Verifica se o usuário autenticado possui um dos roles permitidos
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acesso negado.' });
    }
    // Se permitido, segue para o próximo middleware/controller
    next();
  };
}

// Exporta os middlewares
module.exports = {
  authenticateToken,
  authorizeRoles
};
