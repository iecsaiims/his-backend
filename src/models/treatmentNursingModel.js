const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');
const Treatment = require('./treatmentModel');
const TreatmentNursing = sequelize.define('TreatmentNursing', istTimestamps({
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    treatmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Treatment,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    // Common Fields
    // givenDose: {
    //     type: DataTypes.TEXT
    // },
    nextDose: {
        type: DataTypes.TEXT
    },
    dosageTime: {
        type: DataTypes.TIME
    },
    submittedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    }// Add other relevant fields for the treatment nursing model
}), {
    tableName: 'treatment_nursing',
    underscored: true
});

module.exports = TreatmentNursing;
