// Model de Produto
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Loja = require('./Loja');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lojaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Loja,
      key: 'id',
    },
  },
}, {
  tableName: 'produtos',
});

// Relacionamento: Produto pertence a uma Loja
Produto.belongsTo(Loja, { foreignKey: 'lojaId' });
Loja.hasMany(Produto, { foreignKey: 'lojaId' });

module.exports = Produto;
