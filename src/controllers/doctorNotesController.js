const GeneralEmergencyCare = require('../models/generalEmergencyCaseModel');
const TraumaTemplate =require('../models/traumaTemplateModel')
const ProgressNotes = require('../models/progressNotesModel');
const DischargeSummary = require('../models/dischargeSummayModel');
const TransferOut = require('../models/transferOutModel');
const LamaConsent = require('../models/lamaConsentModel');
const Pocus = require('../models/pocusModel');
const Xray = require('../models/xrayModel');
const CtScan = require('../models/ctScanModel');
const Troponin = require('../models/troponinModel');
const Ecg = require('../models/ecgModel');
const BloodGas = require('../models/bloodGasModel');
const OtherTest = require('../models/otherTestModel');


exports.createGeneralEmergencyCare = async (req, res) => {
  try {
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });

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

    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });

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


exports.createProgressNotes = async (req, res) => {
  try {
    // 🔍 Sanitize: Convert all "" to null
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });

    const data = await ProgressNotes.create({
      ...req.body,
      submitted_by: req.user.user,
      designation: req.user.designation
    });

    res.status(201).json({
      message: 'Trauma record created successfully',
      data
    });

  } catch (err) {
    console.error('Error creating trauma record:', err);
    res.status(500).json({ error: 'Internal server error' });
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

    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });

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
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });
    
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
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: 'LAMA consent document is required.' });
    }
    const lamaConsent = await LamaConsent.create({
      ...req.body,
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



exports.createPocus = async (req, res) => {
  try{
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    }); 
    const data = await Pocus.create({
      ...req.body,
      submitted_by: req.user.user,
      designation:req.user.designation
    });
    res.status(201).json({
      message:'Pocus record created successfully',
      data
    });
  }catch(err){
    console.error('Error fetching pocus details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getPocusDetails = async (req, res) => {
  try {
    const { patientId } = req.params;
    const records = await Pocus.findAll({
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

exports.createEcgRecord = async(req,res) => {
  try{
     if (!req.file) {
      return res.status(400).json({ error: 'ecg image is required.' });
    }
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });
    const ecg = await Ecg.create({
      ...req.body,
      submitted_by: req.user.user,
      designation:req.user.designation,
      ecgImage: req.file.filename // ✅ Store filename
    });
    return res.status(201).json({
      message: 'ecg record created successfully',
      data: ecg
    });
  }catch(err){
    console.error('Error fetching ecg details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getEcgRecords = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (patientId) {
      const record = await Ecg.findOne({ where: { patient_id: patientId } });
      if (!record) {
        return res.status(404).json({ message: 'ecg records not found for this patient' });
      }
      return res.status(200).json({ data: record });
    }
    // Optional: fetch all records
    const allRecords = await Ecg.findAll();
    return res.status(200).json({ data: allRecords });
  } catch (err) {
    console.error('Error fetching ecg records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createBloodGasRecord = async(req,res) => {
  try{
     if (!req.file) {
      return res.status(400).json({ error: 'Blood gas image is required.' });
    }
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });
    const bloodGas = await BloodGas.create({
      ...req.body,
      submitted_by: req.user.user,
      designation:req.user.designation,
      bloodGasImage: req.file.filename // ✅ Store filename
    });
    return res.status(201).json({
      message: 'bloodgas record created successfully',
      data: bloodGas
    });
  }catch(err){
    console.error('Error fetching blood gas details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getBloodGasRecords = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (patientId) {
      const record = await BloodGas.findOne({ where: { patient_id: patientId } });
      if (!record) {
        return res.status(404).json({ message: 'blood gas records not found for this patient' });
      }
      return res.status(200).json({ data: record });
    }
    // Optional: fetch all records
    const allRecords = await BloodGas.findAll();
    return res.status(200).json({ data: allRecords });
  } catch (err) {
    console.error('Error fetching Blood gas records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createTroponinRecord = async(req,res) => {
  try{
     if (!req.file) {
      return res.status(400).json({ error: 'Troponin image is required.' });
    }
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });
    const troponin = await Troponin.create({
      ...req.body,
      submitted_by: req.user.user,
      designation:req.user.designation, // ✅ Store filename
    });
    return res.status(201).json({
      message: 'troponin record created successfully',
      data: troponin
    });
  }catch(err){
    console.error('Error fetching troponin details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getTroponinRecords = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (patientId) {
      const record = await Troponin.findOne({ where: { patient_id: patientId } });
      if (!record) {
        return res.status(404).json({ message: 'troponin records not found for this patient' });
      }
      return res.status(200).json({ data: record });
    }
    // Optional: fetch all records
    const allRecords = await Troponin.findAll();
    return res.status(200).json({ data: allRecords });

  } catch (err) {
    console.error('Error fetching troponin records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.createXrayRecord = async(req,res) => {
  try{
     if (!req.file) {
      return res.status(400).json({ error: 'Xray image is required.' });
    }
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });
    const xray = await Xray.create({
      ...req.body,
      submitted_by: req.user.user,
      designation:req.user.designation,
      xrayImage: req.file.filename // ✅ Store filename
    });
    return res.status(201).json({
      message: 'xray record created successfully',
      data: xray
    });
  }catch(err){
    console.error('Error fetching xray details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getXrayRecords = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (patientId) {
      const record = await Xray.findOne({ where: { patient_id: patientId } });
      if (!record) {
        return res.status(404).json({ message: 'xray records not found for this patient' });
      }
      return res.status(200).json({ data: record });
    }
    // Optional: fetch all records
    const allRecords = await Xray.findAll();
    return res.status(200).json({ data: allRecords });
  } catch (err) {
    console.error('Error fetching xray records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createCtScanRecord = async(req,res) => {
  try{
     if (!req.file) {
      return res.status(400).json({ error: 'CT Scan image is required.' });
    }
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });
    const ctScan = await CtScan.create({
      ...req.body,
      submitted_by: req.user.user,
      designation:req.user.designation,
      ctScanImage: req.file.filename // ✅ Store filename
    });
    return res.status(201).json({
      message: 'CT Scan record created successfully',
      data: ctScan
    });
  }catch(err){
    console.error('Error fetching CT Scan details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getCtScanRecords = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (patientId) {
      const record = await CtScan.findOne({ where: { patient_id: patientId } });
      if (!record) {
        return res.status(404).json({ message: 'CT Scan records not found for this patient' });
      }
      return res.status(200).json({ data: record });
    }
    // Optional: fetch all records
    const allRecords = await CtScan.findAll();
    return res.status(200).json({ data: allRecords });
  } catch (err) {
    console.error('Error fetching CT Scan records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.createOtherTestRecord = async(req,res) => {
  try{
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });
    const otherTest = await OtherTest.create({
      ...req.body,
      submitted_by: req.user.user,
      designation:req.user.designation // ✅ Store filename
    });
    return res.status(201).json({
      message: 'Other Test record created successfully',
      data: otherTest
    });
  }catch(err){
    console.error('Error fetching Other Test details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getOtherTestRecords = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (patientId) {
      const record = await OtherTest.findOne({ where: { patient_id: patientId } });
      if (!record) {
        return res.status(404).json({ message: 'Other Test records not found for this patient' });
      }
      return res.status(200).json({ data: record });
    }
    // Optional: fetch all records
    const allRecords = await OtherTest.findAll();
    return res.status(200).json({ data: allRecords });

  } catch (err) {
    console.error('Error fetching Other Test records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

