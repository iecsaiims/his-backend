const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const Pocus = sequelize.define('Pocus', istTimestamps({
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
  protocol: {
    type: DataTypes.ENUM('eFAST', 'RUSH', 'BLUE', 'MSK')
  },
  findings: {
    type: DataTypes.TEXT,
    allowNull:true
  },
  submittedBy:{
    type:DataTypes.STRING,
    allowNull:false
  },
  designation:{
    type:DataTypes.STRING,
    allowNull:false
  }

}), {
  tableName: 'pocus',
  underscored: true
});

module.exports = Pocus;

