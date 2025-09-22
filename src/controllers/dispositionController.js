const DischargeSummary = require('../models/dischargeSummayModel');
const TransferOut = require('../models/transferOutModel');
const LamaConsent = require('../models/lamaConsentModel');
const Admission = require('../models/admissionModel');
const fileService = require('../services/fileService');

exports.createDischargeSummary = async(req, res) => {
  try{

    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });

    const data = await DischargeSummary.create({
      ...req.body,
      submittedBy: req.user.user,
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
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });
    
    const data = await TransferOut.create({
      ...req.body,
      submittedBy: req.user.user,
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


exports.createLamaConsent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'LAMA consent document is required.' });
    }
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });
    const lamaConsent = await LamaConsent.create({
      ...req.body,
      lamaConsentDocument: req.file.filename,
      submittedBy: req.user.user,
      designation:req.user.designation
    });
    const response = fileService.attachFileUrl(lamaConsent, req, 'lamaConsentDocument');
    return res.status(201).json({
      message: 'LAMA Consent created successfully',
      data: response
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
    if (!patientId) {
      return res.status(400).json({ message: 'Patient ID is required' });
    }
    const records = await LamaConsent.findAll({
      where: { patient_id: patientId }
    });
    if (!records.length) {
      return res.status(404).json({ message: 'No LAMA consent found for this patient' });
    }
    const response = records.map(record =>
      fileService.attachFileUrl(record, req, 'lamaConsentDocument')
    );
    return res.status(200).json({ data: response });
  } catch (err) {
    console.error('Error fetching LAMA consent:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};





exports.createAdmission = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Admission consent document is required.' });
    }
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });
    const AdmissionConsent = await Admission.create({
      ...req.body,
      wardConsentDocument: req.file.filename,
      submittedBy: req.user.user,
      designation:req.user.designation
    });
    const response = fileService.attachFileUrl(AdmissionConsent, req, 'wardConsentDocument');
    return res.status(201).json({
      message: 'ward Consent created successfully',
      data: response
    });
  } catch (error) {
    console.error('Error creating ward consent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET all records or by patient_id
exports.getAdmissionConsent = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (!patientId) {
      return res.status(400).json({ message: 'Patient ID is required' });
    }
    const records = await Admission.findAll({
      where: { patient_id: patientId }
    });
    if (!records.length) {
      return res.status(404).json({ message: 'No ward consent found for this patient' });
    }
    const response = records.map(record =>
      fileService.attachFileUrl(record, req, 'wardConsentDocument')
    );
    return res.status(200).json({ data: response });
  } catch (err) {
    console.error('Error fetching ward consent:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};