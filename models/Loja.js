// Model de Loja
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Loja = sequelize.define('Loja', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'lojas',
});

module.exports = Loja;
