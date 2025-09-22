const DiagnosisRecord = require('../models/diagnosisRecordModel');
// CBC Record Controller
exports.createDiagnosisRecord = async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "") {
        req.body[key] = null;
      }
    });

    const { patientId, ...assessmentData } = req.body;

    const data = await DiagnosisRecord.create({
      patientId,
      ...assessmentData,
      submittedBy: req.user.user,
      designation:req.user.designation
    });

    res.status(201).json({
      message: "diagnosis record created successfully",
      data,
    });
  } catch (err) {
    console.error("error creating diagnosis record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getDiagnosisRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const assessment = await DiagnosisRecord.findAll({ where: { patientId } });

    if (!assessment) {
      return res
        .status(404)
        .json({ error: "diagnosis record not found for this patient" });
    }

    res.status(200).json({
      message: "diagnosis record retrieved successfully",
      data: assessment,
    });
  } catch (err) {
    console.error("Error retrieving vital record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
