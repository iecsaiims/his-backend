const InOut = require('../models/inOutModel');
// CBC Record Controller
exports.createInOutRecord = async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "") {
        req.body[key] = null;
      }
    });

    const { patientId, ...assessmentData } = req.body;

    const data = await InOut.create({
      patientId,
      ...assessmentData,
      submittedBy: req.user.user,
      designation:req.user.designation
    });

    res.status(201).json({
      message: "Intake/Outtake record created successfully",
      data,
    });
  } catch (err) {
    console.error("error creating intake/outtake record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getInOutRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const assessment = await InOut.findAll({ where: { patientId } });

    if (!assessment) {
      return res
        .status(404)
        .json({ error: "Intake/Outtake record not found for this patient" });
    }

    res.status(200).json({
      message: "Intake/Outtake record retrieved successfully",
      data: assessment,
    });
  } catch (err) {
    console.error("Error retrieving intake/outtake record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
