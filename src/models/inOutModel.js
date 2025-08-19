const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const InOut = sequelize.define('InOut',istTimestamps({
    
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    inParameter: {
        type: DataTypes.ENUM('Blood', 'Body Fluid', 'Drain','Feed','Frozen Plasma','Gastric Lavage',
            'IV Fluid','IV Medication', 'Medication', 'Oral Feeding', 'PBRC', 'Platelets', 'RT Aspiration'
            ,'Ryle Tube Feeding','Stool','Urine'),
    },
    route: {
        type: DataTypes.STRING
    },
    pulseRate: {
        type: DataTypes.INTEGER
    },
    volume: {
        type: DataTypes.STRING
    },
    remarks: {
        type: DataTypes.TEXT
    },
    allergies: {
        type: DataTypes.TEXT
    },
    height: {
        type: DataTypes.FLOAT
    },
    temperature: {
        type: DataTypes.FLOAT
    },
    respiration: {
        type: DataTypes.INTEGER
    },
    diastolicBp: {
        type: DataTypes.INTEGER
    },
    spo2: {
        type: DataTypes.INTEGER
    },
    rbs: {
        type: DataTypes.INTEGER
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
    tableName: 'in_out',
    underscored: true
});

module.exports = InOut;