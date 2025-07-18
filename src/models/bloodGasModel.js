const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');

const BloodGas = sequelize.define('BoodGas', {
    
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    sample: {
        type: DataTypes.ENUM('Arterial', 'Venous')
    },
    ph: {
        type: DataTypes.STRING
    },
    pco2: {
        type: DataTypes.STRING
    },
    hco3: {
        type: DataTypes.STRING
    },
    na: {
        type: DataTypes.STRING
    },
    k: {
        type: DataTypes.STRING
    },
    cl: {
        type: DataTypes.STRING
    },
    bloodGasOther: {
        type: DataTypes.STRING
    },
    bloodGasInterpretation: {
        type: DataTypes.TEXT
    },
    bloodGasImage: {
        type: DataTypes.TEXT
    },
    submitted_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'blood_gas',
    underscored: true
});

module.exports = BloodGas;