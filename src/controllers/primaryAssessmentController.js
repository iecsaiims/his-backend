const PrimaryAssessment = require('../models/primaryAssessmetModel');

exports.createPrimaryAssessment = async (req, res) => {
  try {
    const { patientId, ...assessmentData } = req.body;
    
    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }
    
    const existing = await PrimaryAssessment.findOne({ where: { patient_id:patientId } });
    
    if (existing) {
      return res.status(400).json({ error: 'Assessment already exists for this patient' });
    }
    
    const record = await PrimaryAssessment.create({
      patientId,
      ...assessmentData,
      submittedBy: req.user.user,
      designation:req.user.designation
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


exports.getPrimaryAssessmentDetails = async (req, res) => {
  try {
    const { patientId } = req.params;
    
    if (!patientId) {
      return res.status(400).json({ error: 'Patient ID is required' });
    }

    const assessment = await PrimaryAssessment.findOne({ where: { patientId } });

    if (!assessment) {
      return res.status(404).json({ error: 'Primary assessment not found for this patient' });
    }
    
    res.status(200).json({
      message: 'Primary assessment details retrieved successfully',
      data: assessment
    });
  } catch (err) {
    console.error('Error retrieving assessment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
