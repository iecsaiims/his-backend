const Cbc = require("../models/cbcModel");
const Lft = require("../models/lftModel");
const Rft = require("../models/rftModel");
const UrineTest = require("../models/urineTestModel");
const Coagulation = require("../models/coagulationModel");
// CBC Record Controller
exports.createCbcRecord = async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "") {
        req.body[key] = null;
      }
    });

    const data = await Cbc.create({
      ...req.body,
    });

    res.status(201).json({
      message: "CBC record created successfully",
      data,
    });
  } catch (err) {
    console.error("Error creating CBC record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getcbcRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const assessment = await Cbc.findOne({ where: { patientId } });

    if (!assessment) {
      return res
        .status(404)
        .json({ error: "CBC record not found for this patient" });
    }

    res.status(200).json({
      message: "CBC record retrieved successfully",
      data: assessment,
    });
  } catch (err) {
    console.error("Error retrieving CBC record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// LFT Record Controller
exports.createLftRecord = async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "") {
        req.body[key] = null;
      }
    });

    const data = await Lft.create({
      ...req.body,
    });

    res.status(201).json({
      message: "LFT record created successfully",
      data,
    });
  } catch (err) {
    console.error("Error creating LFT record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// LFT Record Controller GET

exports.getLftRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const assessment = await Lft.findOne({ where: { patientId } });

    if (!assessment) {
      return res
        .status(404)
        .json({ error: "LFT record not found for this patient" });
    }

    res.status(200).json({
      message: "LFT record retrieved successfully",
      data: assessment,
    });
  } catch (err) {
    console.error("Error retrieving LFT record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// RFT Record Controller
exports.createRftRecord = async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "") {
        req.body[key] = null;
      }
    });

    const data = await Rft.create({
      ...req.body,
    });

    res.status(201).json({
      message: "RFT record created successfully",
      data,
    });
  } catch (err) {
    console.error("Error creating RFT record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// RFT Record Controller GET
exports.getRftRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const assessment = await Rft.findOne({ where: { patientId } });

    if (!assessment) {
      return res
        .status(404)
        .json({ error: "rft record not found for this patient" });
    }

    res.status(200).json({
      message: "RFT record retrieved successfully",
      data: assessment,
    });
  } catch (err) {
    console.error("Error retrieving RFT record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Urine Test Record Controller
exports.createUrineTestRecord = async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "") {
        req.body[key] = null;
      }
    });

    const data = await UrineTest.create({
      ...req.body,
    });

    res.status(201).json({
      message: "Urine Test record created successfully",
      data,
    });
  } catch (err) {
    console.error("Error creating Urine Test record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUrineTestRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const assessment = await UrineTest.findOne({ where: { patientId } });

    if (!assessment) {
      return res
        .status(404)
        .json({ error: "Urine Test record not found for this patient" });
    }

    res.status(200).json({
      message: "Urine Test record retrieved successfully",
      data: assessment,
    });
  } catch (err) {
    console.error("Error retrieving Urine Test record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export all controllers
exports.createCoagulationTestRecord = async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "") {
        req.body[key] = null;
      }
    });

    const data = await Coagulation.create({
      ...req.body,
    });

    res.status(201).json({
      message: "Coagulation Test record created successfully",
      data,
    });
  } catch (err) {
    console.error("Error creating Coagulation Test record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getCoagulationTestRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    const assessment = await Coagulation.findOne({ where: { patientId } });

    if (!assessment) {
      return res
        .status(404)
        .json({ error: "Coagulation Test record not found for this patient" });
    }

    res.status(200).json({
      message: "Coagulation Test record retrieved successfully",
      data: assessment,
    });
  } catch (err) {
    console.error("Error retrieving Coagulation Test record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};