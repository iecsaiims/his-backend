const fs = require('fs');
const path = require('path');
const Pocus = require('../models/pocusModel');
const Xray = require('../models/xrayModel');
const CtScan = require('../models/ctScanModel');
const Troponin = require('../models/troponinModel');
const Ecg = require('../models/ecgModel');
const BloodGas = require('../models/bloodGasModel');
const OtherTest = require('../models/otherTestModel');
const fileService = require('../services/fileService');

exports.createPocusRecord = async (req, res) => {
  try{
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    }); 
    const data = await Pocus.create({
      ...req.body,
      submittedBy: req.user.user,
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

exports.getPocusRecords = async (req, res) => {
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
      submittedBy: req.user.user,
      designation:req.user.designation,
      ecgImage: req.file.filename // ✅ Store filename
    });
    const response = fileService.attachFileUrl(ecg, req, 'ecgImage');
    return res.status(201).json({
      message: 'ecg record created successfully',
      data: response
    });
  }catch(err){
    console.error('Error fetching ecg details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getEcgRecords = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (!patientId) {
      return res.status(400).json({ message: 'Patient ID is required' });
    }
    const records = await Ecg.findAll({ where: { patient_id: patientId } });
    if (!records.length) {
      return res.status(404).json({ message: 'No ECG records found for this patient' });
    }
    const response = records.map(record =>
      fileService.attachFileUrl(record, req, 'ecgImage')
    );
    return res.status(200).json({ data: response });
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
      submittedBy: req.user.user,
      designation:req.user.designation,
      bloodGasImage: req.file.filename // ✅ Store filename
    });
    const response = fileService.attachFileUrl(bloodGas,req, 'bloodGasImage');
    return res.status(201).json({
      message: 'blood gas record created successfully',
      data: response
    });
  }catch(err){
    console.error('Error fetching blood gas details:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getBloodGasRecords = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (!patientId) {
      return res.status(400).json({ message: 'Patient ID is required' });
    }
    const records = await BloodGas.findAll({ where: { patient_id: patientId } });
    if (!records.length) {
      return res.status(404).json({ message: 'No blood gas records found for this patient' });
    }
    const response = records.map(record =>
      fileService.attachFileUrl(record, req, 'bloodGasImage')
    );
    return res.status(200).json({ data: response });
  } catch (err) {
    console.error('Error fetching Blood gas records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createTroponinRecord = async(req,res) => {
  try{
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });
    const troponin = await Troponin.create({
      ...req.body,
      submittedBy: req.user.user,
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
      const records = await Troponin.findAll({ where: { patient_id: patientId } });
      if (!records.length) {
        return res.status(404).json({ message: 'troponin records not found for this patient' });
      }
      return res.status(200).json({ data: records });
    }
  } catch (err) {
    console.error('Error fetching troponin records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.createXrayRecord = async(req,res) => {
  try {
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
      xrayImage: req.file.filename,
      submittedBy: req.user.user,
      designation:req.user.designation
    });
    const response = fileService.attachFileUrl(xray, req, 'xrayImage');
    return res.status(201).json({
      message: 'Xray record created successfully',
      data: response
    });
  } catch (error) {
    console.error('Error creating Xray record:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getXrayRecords = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (!patientId) {
      return res.status(400).json({ message: 'Patient ID is required' });
    }
    const records = await Xray.findAll({
      where: { patient_id: patientId }
    });
    if (!records.length) {
      return res.status(404).json({ message: 'No Xray records found for this patient' });
    }
    const response = records.map(record =>
      fileService.attachFileUrl(record, req, 'xrayImage')
    );
    return res.status(200).json({ data: response });
  } catch (err) {
    console.error('Error fetching Xray records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.createCtScanRecord = async(req,res) => {
  try {
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
      ctScanImage: req.file.filename,
      submittedBy: req.user.user,
      designation:req.user.designation
    });
    const response = fileService.attachFileUrl(ctScan, req, 'ctScanImage');
    return res.status(201).json({
      message: 'CT Scan created successfully',
      data: response
    });
  } catch (error) {
    console.error('Error creating CT Scan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCtScanRecords = async (req, res) => {
  try {
    const { patientId } = req.params;
    if (!patientId) {
      return res.status(400).json({ message: 'Patient ID is required' });
    }
    const records = await CtScan.findAll({
      where: { patient_id: patientId }
    });
    if (!records.length) {
      return res.status(404).json({ message: 'No CT Scan found for this patient' });
    }
    const response = records.map(record =>
      fileService.attachFileUrl(record, req, 'ctScanImage')
    );
    return res.status(200).json({ data: response });
  } catch (err) {
    console.error('Error fetching CT Scan records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createOtherTestRecord = async(req,res) => {
  try{
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });
    const otherTest = await OtherTest.create({
      ...req.body,
      submittedBy: req.user.user,
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
      const records = await OtherTest.findAll({ where: { patient_id: patientId } });
      if (!records.length) {
        return res.status(404).json({ message: 'Other Test records not found for this patient' });
      }
      return res.status(200).json({ data: records });
    }
  } catch (err) {
    console.error('Error fetching Other Test records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}