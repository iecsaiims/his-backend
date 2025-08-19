const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const Cbc = sequelize.define('Cbc',istTimestamps({
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
  hemoglobin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hct: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mcv: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rdwcv: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tlc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  neutrophils: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lymphocytes: {
    type: DataTypes.STRING,
    allowNull: false
  },
  monocytes: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eosinophils: {
    type: DataTypes.STRING,
    allowNull: false
  },
  basophil: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plateletCount: {
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
  tableName: 'cbc',
  underscored: true
});

module.exports = Cbc;

