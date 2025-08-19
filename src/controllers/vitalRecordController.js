const VitalRecording = require('../models/vitalsRecordingModel');
// CBC Record Controller
exports.createVitalRecord = async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "") {
        req.body[key] = null;
      }
    });

    const { patientId, ...assessmentData } = req.body;

    const data = await VitalRecording.create({
      patientId,
      ...assessmentData,
      submittedBy: req.user.user,
      designation:req.user.designation
    });

    res.status(201).json({
      message: "Vital record created successfully",
      data,
    });
  } catch (err) {
    console.error("error creating vital record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getvitalRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const assessment = await VitalRecording.findAll({ where: { patientId } });

    if (!assessment) {
      return res
        .status(404)
        .json({ error: "vital record not found for this patient" });
    }

    res.status(200).json({
      message: "vital record retrieved successfully",
      data: assessment,
    });
  } catch (err) {
    console.error("Error retrieving vital record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
