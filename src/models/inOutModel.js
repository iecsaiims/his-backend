const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Patient = require("./patientModel");
const istTimestamps = require("./baseModel");

const InOut = sequelize.define(
  "InOut",
  istTimestamps({
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    inParameter: {
      type: DataTypes.ENUM(
        "Blood",
        "Body Fluid",
        "Drain",
        "Feed",
        "Frozen Plasma",
        "Gastric Lavage",
        "IV Fluid",
        "IV Medication",
        "Medication",
        "Oral Feeding",
        "PBRC",
        "Platelets",
        "RT Aspiration",
        "Ryle Tube Feeding",
        "Stool",
        "Urine"
      ),
    },
    routeIn: {
      type: DataTypes.STRING,
    },
    volumeIn: {
      type: DataTypes.STRING,
    },
    remarksIn: {
      type: DataTypes.TEXT,
    },
    inDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    inTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    outParameter: {
      type: DataTypes.ENUM(
        "Blood",
        "Body Fluid",
        "Drain",
        "Feed",
        "Frozen Plasma",
        "Gastric Lavage",
        "IV Fluid",
        "IV Medication",
        "Medication",
        "Oral Feeding",
        "PBRC",
        "Platelets",
        "RT Aspiration",
        "Ryle Tube Feeding",
        "Stool",
        "Urine"
      ),
    },
    routeOut: {
      type: DataTypes.STRING,
    },
    volumeOut: {
      type: DataTypes.STRING,
    },
    remarksOut: {
      type: DataTypes.TEXT,
    },
    outDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    outTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    submittedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }),
  {
    tableName: "in_out",
    underscored: true,
  }
);

module.exports = InOut;
