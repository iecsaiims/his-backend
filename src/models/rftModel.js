const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const Rft = sequelize.define('Rft',istTimestamps({
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  // Common Fields
  urea: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
    creatine: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
    na: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
    k: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
    cl: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
    uricAcid: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}), {
  tableName: 'rft',
  underscored: true
});

module.exports = Rft;

