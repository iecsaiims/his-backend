const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const Enc = sequelize.define(
  'enc',
  istTimestamps({
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    disposition_status: {
      type: DataTypes.STRING, 
      allowNull: true
    },

    disposition_time: {
      type: DataTypes.STRING,
      allowNull: true
    },

    disposition_notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }),
  {
    tableName: 'enc',
    underscored: true
  }
);

module.exports = Enc;