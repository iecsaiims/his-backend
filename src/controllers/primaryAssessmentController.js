const PrimaryAssessment = require('../models/primaryAssessmetModel');

exports.createPrimaryAssessment = async (req, res) => {
  try {
    const { patient_id, ...assessmentData } = req.body;

    if (!patient_id) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    const existing = await PrimaryAssessment.findOne({ where: { patient_id } });

    if (existing) {
      return res.status(400).json({ error: 'Assessment already exists for this patient' });
    }

    const record = await PrimaryAssessment.create({
      patient_id,
      ...assessmentData
    });

    res.status(201).json({
      message: 'Primary assessment saved successfully',
      data: record
    });
  } catch (err) {
    console.error('Error saving assessment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
