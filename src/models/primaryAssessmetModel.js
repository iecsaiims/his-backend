const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PrimaryAssessment = sequelize.define('PrimaryAssessment', {
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'patients',
      key: 'id'
    }
  },

  // Airway
  airway_open_stable: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: true
  },

  // Breathing
  rr: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  spo2: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  respiratory_effort: {
    type: DataTypes.STRING,
    allowNull: true
  },
  air_entry: {
    type: DataTypes.ENUM('equal', 'unequal'),
    allowNull: true
  },
  breathing_other: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gross_added_sounds: {
    type: DataTypes.STRING,
    allowNull: true
  },

  // Circulation
  pulse_rate: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  pulse_regular: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: true
  },
  crt_seconds: {
    type: DataTypes.STRING,
    allowNull: true
  },
  skin: {
    type: DataTypes.STRING,
    allowNull: true
  },
  circulation_other: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bp_right_arm: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bp_left_arm: {
    type: DataTypes.STRING,
    allowNull: true
  },

  // Disability - GCS
  gcs_e: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  gcs_v: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  gcs_m: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  gcs_total: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  // Pupils
  pupil_size_mm: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pupil_right_eye: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pupil_left_eye: {
    type: DataTypes.STRING,
    allowNull: true
  },
  reaction_to_light_right: {
    type: DataTypes.STRING,
    allowNull: true
  },
  reaction_to_light_left: {
    type: DataTypes.STRING,
    allowNull: true
  },

  // Neurological signs
  asymmetry_limb_movement: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: true
  },
  facial_asymmetry: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: true
  },
  posturing: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: true
  },

  // Exposure
  temperature_f: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  rash: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: true
  },
  cynosis: {
    type: DataTypes.ENUM('Yes', 'No'),
    allowNull: true
  },

  // Final notes
  assessment_other: {
    type: DataTypes.TEXT,
    allowNull: true
  }

}, {
  tableName: 'primary_assessment',
  underscored: true,
});

module.exports = PrimaryAssessment;
