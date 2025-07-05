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
    const data = await traumaTemplate.create({
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
    const values = {
    ...req.body,
    lama_consent_document: req.files['lama_consent_document'][0].path
  }
  const data = await LamaConsent.create(values);

  res.status(201).json({
      message:'Lama Consent record created successfully',
      data
    });
  }catch(err){
    console.error('Error fetching records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}