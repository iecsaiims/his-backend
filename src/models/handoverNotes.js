const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const HandoverNotes = sequelize.define('HandoverNotes',istTimestamps({

    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    shift: {
        type: DataTypes.ENUM('Morning', 'Afternoon', 'Evening')
    },
    vitalDetails: {
        type: DataTypes.TEXT
    },
    investigationDetails: {
        type: DataTypes.TEXT
    },
    medicationDetails: {
        type: DataTypes.TEXT
    },
    pendingInvestigations: {
        type: DataTypes.TEXT
    },
    pendingTreatment: {
        type: DataTypes.TEXT
    },
    transferNotes: {
        type: DataTypes.TEXT
    },
    handoverTo: {
        type: DataTypes.STRING
    },
    handoverNotes: {
        type: DataTypes.TEXT
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
    tableName: 'handover_notes',
    underscored: true
});

module.exports = HandoverNotes;