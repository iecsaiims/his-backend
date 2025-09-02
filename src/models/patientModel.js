const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const istTimestamps = require('./baseModel.js');

const Patient = sequelize.define('Patient', istTimestamps({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  crNumber:{
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
  guardianType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  guardianName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT
  },
  // department:{
  //   type:DataTypes.STRING,
  //   allowNull:false
  // },
  // room:{
  //   type:DataTypes.STRING,
  //   allowNull:false
  // },
  submittedBy:{
    type:DataTypes.STRING,
    allowNull:false
  },
  designation:{
    type:DataTypes.STRING,
    allowNull:false
  }
}), {
  tableName: 'patients',
  underscored: true
});

module.exports = Patient;
