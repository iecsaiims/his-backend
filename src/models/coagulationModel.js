const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const Coagulation = sequelize.define('Coagulation',istTimestamps({
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
  ptinr: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
    apttt: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
    d_dimer: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
}), {
  tableName: 'Coagulation',
  underscored: true
});

module.exports = Coagulation;

