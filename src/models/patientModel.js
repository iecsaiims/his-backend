const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Patient = sequelize.define('Patient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cr_number:{
    type: DataTypes.STRING,
    allowNull:false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department:{
    type:DataTypes.STRING,
    allowNull:false
  },
  room:{
    type:DataTypes.STRING,
    allowNull:false
  },
  visitDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  visitTime: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {
  tableName: 'patients',
  underscored: true
});

module.exports = Patient;
