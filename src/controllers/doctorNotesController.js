const GeneralEmergencyCare = require('../models/generalEmergencyCaseModel');
const TraumaTemplate =require('../models/traumaTemplateModel')
const ProgressNotes = require('../models/progressNotesModel');
const DischargeSummary = require('../models/dischargeSummayModel');
const TransferOut = require('../models/transferOutModel');
const LamaConsent = require('../models/lamaConsentModel')

exports.createGeneralEmergencyCare = async (req, res) => {
  try {
    const data = await GeneralEmergencyCare.create({
      ...req.body,
      submitted_by: req.user.user,
      designation:req.user.designation // Injected from token
    });

    res.status(201).json({
      message: 'General emergency care record created successfully',
      data
    });
  } catch (err) {
    console.error('Error creating general emergency care:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getGeneralEmergencyCareByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await GeneralEmergencyCare.findAll({
      where: { patient_id: patientId }
    });

    if (!records.length) {
      return res.status(404).json({ message: 'No records found for this patient' });
    }

    res.status(200).json({
      message: 'Records fetched successfully',
      data: records
    });
  } catch (err) {
    console.error('Error fetching records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createTraumaTemplate = async(req, res) => {
  try{
    const data = await TraumaTemplate.create({
      ...req.body,
      submitted_by: req.user.user,
      designation:req.user.designation
    });

    res.status(201).json({
      message:'Trauma record created successfully',
      data
    });
  }catch(err){
    console.error('Error creating trauma record:', err);
    res.status(500).json({error:'Internal server error'});
  }
};

exports.getTraumaTemplateByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await TraumaTemplate.findAll({
      where: { patient_id: patientId }
    });

    if (!records.length) {
      return res.status(404).json({ message: 'No records found for this patient' });
    }

    res.status(200).json({
      message: 'Records fetched successfully',
      data: records
    });
  } catch (err) {
    console.error('Error fetching records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.createProgressNotes = async(req, res) => {
  try{
    const data = await ProgressNotes.create({
      ...req.body,
      submitted_by: req.user.user,
      designation:req.user.designation
    });

    res.status(201).json({
      message:'Trauma record created successfully',
      data
    });
  }catch(err){
    console.error('Error creating trauma record:', err);
    res.status(500).json({error:'Internal server error'});
  }
};

exports.getProgressNotesByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await ProgressNotes.findAll({
      where: { patient_id: patientId }
    });

    if (!records.length) {
      return res.status(404).json({ message: 'No records found for this patient' });
    }

    res.status(200).json({
      message: 'Records fetched successfully',
      data: records
    });
  } catch (err) {
    console.error('Error fetching records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.createDischargeSummary = async(req, res) => {
  try{
    const data = await DischargeSummary.create({
      ...req.body,
      submitted_by: req.user.user,
      designation:req.user.designation
    });

    res.status(201).json({
      message:'Trauma record created successfully',
      data
    });
  }catch(err){
    console.error('Error creating trauma record:', err);
    res.status(500).json({error:'Internal server error'});
  }
};

exports.getDischargeSummaryByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await DischargeSummary.findAll({
      where: { patient_id: patientId }
    });

    if (!records.length) {
      return res.status(404).json({ message: 'No records found for this patient' });
    }

    res.status(200).json({
      message: 'Records fetched successfully',
      data: records
    });
  } catch (err) {
    console.error('Error fetching records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createTransferOut = async(req, res) => {
  try{
    const data = await TransferOut.create({
      ...req.body,
      submitted_by: req.user.user,
      designation:req.user.designation
    });

    res.status(201).json({
      message:'Trauma record created successfully',
      data
    });
  }catch(err){
    console.error('Error creating trauma record:', err);
    res.status(500).json({error:'Internal server error'});
  }
};

exports.getTransferOutByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await TransferOut.findAll({
      where: { patient_id: patientId }
    });

    if (!records.length) {
      return res.status(404).json({ message: 'No records found for this patient' });
    }

    res.status(200).json({
      message: 'Records fetched successfully',
      data: records
    });
  } catch (err) {
    console.error('Error fetching records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createLamaDocument = async(req, res) => {
  try{
    console.log('BODY:', req.body);
     console.log('FILE:', req.file);
     console.log(req.body.name);
     res.status(200).json({
      message: 'File uploaded successfully'
    });
 }catch(err){
    console.error('Error fetching records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}



exports.createLamaConsent = async (req, res) => {
  try {
    // Debug output
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: 'LAMA consent document is required.' });
    }

    const {
      name,
      age,
      sex,
      guardian_name,
      address,
      patient_id
    } = req.body;

    const lamaConsent = await LamaConsent.create({
      name,
      age,
      sex,
      guardian_name,
      address,
      patient_id,
      lama_consent_document: req.file.filename // ✅ Store filename
    });

    return res.status(201).json({
      message: 'LAMA Consent created successfully',
      data: lamaConsent
    });

  } catch (error) {
    console.error('Error creating LAMA consent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// GET all records or by patient_id
exports.getLamaConsent = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (patientId) {
      const record = await LamaConsent.findOne({ where: { patient_id: patientId } });

      if (!record) {
        return res.status(404).json({ message: 'LAMA consent not found for this patient' });
      }

      return res.status(200).json({ data: record });
    }

    // Optional: fetch all records
    const allRecords = await LamaConsent.findAll();
    return res.status(200).json({ data: allRecords });

  } catch (err) {
    console.error('Error fetching LAMA consent:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.uploadXray = async(req, res) => {
  try{
    console.log('BODY:', req.body);
     console.log('FILE:', req.file);
     console.log(req.body.name);
     res.status(200).json({
      message: 'File uploaded successfully'
    });
 }catch(err){
    console.error('Error fetching records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}