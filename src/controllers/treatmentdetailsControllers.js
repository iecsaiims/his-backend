const treatmentDetails = require('../models/treatmentModel');
// CBC Record Controller
exports.createTreatmentRecord = async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "") {
        req.body[key] = null;
      }
    });

    const data = await treatmentDetails.create({
      ...req.body,
    });

    res.status(201).json({
      message: "Treatment record created successfully",
      data,
    });
  } catch (err) {
    console.error("error creating treatment record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getTreatmentRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const assessment = await treatmentDetails.findOne({ where: { patientId } });

    if (!assessment) {
      return res
        .status(404)
        .json({ error: "treatment record not found for this patient" });
    }

    res.status(200).json({
      message: "treatment record retrieved successfully",
      data: assessment,
    });
  } catch (err) {
    console.error("Error retrieving treatment record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
