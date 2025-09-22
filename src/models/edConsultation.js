const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Patient = require('./patientModel');
const istTimestamps = require('./baseModel');

const EdConsultation = sequelize.define('EdConsultation', istTimestamps({
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    department: {
        type: DataTypes.STRING
    },
    callRespondentAt: {
        type: DataTypes.DATE
    },
    consultantName: {
        type: DataTypes.STRING
    },
    callGivenTo:{
        type: DataTypes.STRING
    },
    callSeenAt:{
        type: DataTypes.DATE
    },
    dispositionPlan:{
        type: DataTypes.STRING
    },
    consultationImage: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    submittedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    } // Add other relevant fields for the treatment nursing model
}), {
    tableName: 'ed_consultation',
    underscored: true
});

module.exports = EdConsultation;
