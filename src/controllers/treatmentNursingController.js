const TreatmentNursing = require('../models/treatmentNursingModel');
// CBC Record Controller
exports.createTreatmentNursingRecord = async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "") {
        req.body[key] = null;
      }
    });
const { patientId, ...assessmentData } = req.body;
    const data = await TreatmentNursing.create({
        patientId,
      ...assessmentData,
       submittedBy: req.user.user,
      designation:req.user.designation
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

exports.getTreatmentNursingRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const assessment = await TreatmentNursing.findAll({ where: { patientId } });

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
