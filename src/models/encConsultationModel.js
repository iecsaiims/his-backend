const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const Consultation = sequelize.define(
  'consultation',
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

    department: {
      type: DataTypes.STRING,
      allowNull: true
    },

    doctorName: {
      type: DataTypes.STRING,
      allowNull: true
    },

    callGivenBy: {
      type: DataTypes.STRING,
      allowNull: true
    },

    time: {
      type: DataTypes.STRING,
      allowNull: true
    },
    completed: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "No"
    }

  }),
  {
    tableName: 'consultation',
    underscored: true
  }
);

module.exports = Consultation;