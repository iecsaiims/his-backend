const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const VitalRecording = sequelize.define('VitalRecording',istTimestamps({
    
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    weight: {
        type: DataTypes.INTEGER
    },
    bmi: {
        type: DataTypes.FLOAT
    },
    pulseRate: {
        type: DataTypes.INTEGER
    },
    systolicBp: {
        type: DataTypes.INTEGER
    },
    meanBp: {
        type: DataTypes.INTEGER
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
    tableName: 'vital_recording',
    underscored: true
});

module.exports = VitalRecording;