const Patient = require('../models/patientModel');
const PatientTriage = require('../models/patientTriageModel');

exports.registerPatient = async(req , res) => {
    try{
        const {name , crNumber , gender, age, category, department, room, visitDate, visitTime} = req.body;
        const patient =  await Patient.create({name , cr_number:crNumber, gender, age , category, department, room, visitDate, visitTime});
        res.status(201).json({ message: 'Patient registered successfully', patient });
    }catch(error){
        res.status(400).json({error: error.message})
    }
};

exports.submitTriage = async(req, res) => {
    try{
        const patientId = req.params.id;
        const {status, hr, spo2, bp,rr,rbs,emergencyType, date, time, triage, triageNotes} = req.body;
        const triageDetails = await PatientTriage.create({status, hr, spo2, bp,rr,rbs,emergencyType, date, time, triage, triageNotes, patient_id:patientId});
        res.status(201).json({ message: 'triageDetails registered successfully', triageDetails });
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

exports.getPatientList = async(req, res) =>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { count, rows } = await Patient.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']] // optional: latest patients first
        });
        
        res.status(200).json({
            totalRecords: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            data: rows
        });
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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPatientListWithTriage = async(req , res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { count, rows } = await Patient.findAndCountAll({
            include: {
                model: PatientTriage,
                as: 'patientTriage',
                attributes: ['triage', 'createdAt']
            },
            limit,
            offset,
            order: [['createdAt', 'DESC']] // optional: latest patients first
        });
        
        res.status(200).json({
            totalRecords: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            data: rows
        });
    } catch (err) {
        console.error('Pagination error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }  
}


