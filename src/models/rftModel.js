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
    type: DataTypes.STRING,
    allowNull: false
  },
    creatine: {
    type: DataTypes.STRING,
    allowNull: false
  },
    na: {
    type: DataTypes.STRING,
    allowNull: false
  },
    k: {
    type: DataTypes.STRING,
    allowNull: false
  },
    cl: {
    type: DataTypes.STRING,
    allowNull: false
  },
    uricAcid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  submittedBy: {
    type: DataTypes.STRING,
    allowNull: false
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false
  }
}), {
  tableName: 'rft',
  underscored: true
});

module.exports = Rft;

