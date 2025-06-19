const Patient = require('../models/patientModel');
const PatientTriage = require('../models/patientTriageModel');

exports.registerPatient = async(req , res) => {
    try{
        const {name , crNumber , gender, age, category, department, room, visitDate, visitTime} = req.body;
        const patient = Patient.create({name , cr_number:crNumber, gender, age , category, department, room, visit_date: visitDate, visit_time: visitTime});
        res.status(201).json({ message: 'Patient registered successfully', patient });
    }catch(error){
        res.status(400).json({error: error.message})
    }
};

exports.submitTriage = async(req, res) => {
    try{
        const {patientId} = req.params;
        const {status, HR, spo2, bp,rr,rbs,emergencyType, date, time, triage, triageNotes} = req.body;
        const triageDetails = await PatientTriage.create({status, HR, spo2, bp,rr,rbs,emergency_type:emergencyType, date, time, triage, triage_notes:triageNotes, patient_id:patientId});
        res.status(201).json({ message: 'triageDetails registered successfully', triageDetails });
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

exports.getPatientList = async(req, res) =>{
    try{
        const patients = await Patient.findAll();
        res.status(201).json({ message: 'Patients fetched successfully', patients });
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

exports.getPatientTriage = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.patientId, {
      include: { model: PatientTriage, as: 'patientTriage' }
    });

    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};