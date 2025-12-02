const Consultation = require('../models/encConsultationModel');
const Enc = require('../models/encModel');

exports.submitConsultation = async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "") {
        req.body[key] = null;
      }
    });

    const { patientId, completed, ...consultationData } = req.body;

    // Allow only one FINAL consultation ("completed": "Yes")
    if (completed === "Yes") {
      const finalExists = await Consultation.findOne({
        where: { patientId, completed: "Yes" }
      });

      if (finalExists) {
        return res.status(400).json({
          message: "Final consultation already submitted for this patient."
        });
      }
    }

    // Create new consultation entry
    const newEntry = await Consultation.create({
      patientId,
      completed,
      ...consultationData,
      submittedBy: req.user.user,
      designation: req.user.designation,
    });

    return res.status(201).json({
      message: "Consultation saved successfully.",
      data: newEntry,
    });

  } catch (error) {
    console.error("Error submitting consultation:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// GET all consultations for a patient
// GET all consultations for a patient
exports.getConsultationByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await Consultation.findAll({
      where: { patientId },
      order: [['id', 'ASC']]
    });

    return res.status(200).json({ data: records });

  } catch (error) {
    console.error("Error fetching consultation records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.submitEncRecord = async (req, res) => {
  try {
    // Convert empty strings → null
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "") {
        req.body[key] = null;
      }
    });

    const { patientId } = req.body;

    // Allow only ONE disposition record per patient
    const existingRecord = await Enc.findOne({ where: { patientId } });

    if (existingRecord) {
      return res.status(400).json({
        message: "Disposition record already submitted for this patient."
      });
    }

    // Create new disposition record
    const data = await Enc.create({
      patientId,
      ...req.body,
      submittedBy: req.user.user,
      designation: req.user.designation
    });

    return res.status(201).json({
      message: "Disposition record created successfully",
      data,
    });

  } catch (error) {
    console.error("Error creating disposition record:", error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
};


exports.getEncRecordByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const record = await Enc.findOne({
      where: { patientId }
    });

    if (!record) {
      return res.status(404).json({
        message: "No disposition record found for this patient"
      });
    }

    return res.status(200).json({
      message: "Disposition record fetched successfully",
      data: record
    });

  } catch (error) {
    console.error("Error fetching disposition record:", error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
};
