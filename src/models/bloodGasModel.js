const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const BloodGas = sequelize.define('BoodGas',istTimestamps({
    
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    bloodGasType: {
        type: DataTypes.ENUM('Arterial', 'Venous')
    },
      ph: { type: DataTypes.STRING },
      cohb: { type: DataTypes.STRING },     
      pco2: { type: DataTypes.STRING },
      mchb: { type: DataTypes.STRING },  
      hco3: { type: DataTypes.STRING },
      na: { type: DataTypes.STRING },
      be: { type: DataTypes.STRING },    
      k: { type: DataTypes.STRING },
      hct: { type: DataTypes.STRING },   
      ca: { type: DataTypes.STRING },
      hb: { type: DataTypes.STRING },
      mosm: { type: DataTypes.STRING },     
      so2: { type: DataTypes.STRING },   
      glu: { type: DataTypes.STRING },    
      lac: { type: DataTypes.STRING }, 
    bloodGasOther: {
        type: DataTypes.STRING
    },
    bloodGasInterpretation: {
        type: DataTypes.TEXT
    },
    bloodGasImage: {
        type: DataTypes.TEXT,
        allowNull:true
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
    tableName: 'blood_gas',
    underscored: true
});

module.exports = BloodGas;