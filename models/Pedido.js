// Model de Pedido (Order) com campos essenciais para o sistema de delivery
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  entregadorId: {
    type: DataTypes.INTEGER,
    allowNull: true, // só é preenchido quando o entregador aceita o pedido
  },
  produtos: {
    type: DataTypes.JSON, // lista de produtos do pedido
    allowNull: false,
  },
  valorTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('aguardando', 'preparando', 'saiu_para_entrega', 'entregue'),
    allowNull: false,
    defaultValue: 'aguardando',
  },
  latitude_cliente: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  longitude_cliente: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'pedidos',
});

module.exports = Pedido;
