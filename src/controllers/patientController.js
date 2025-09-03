const Patient = require("../models/patientModel");
const PatientTriage = require("../models/patientTriageModel");
const PrimaryAssessment = require("../models/primaryAssessmetModel");
const GeneralEmergencyCare = require("../models/generalEmergencyCaseModel.js");
const TraumaTemplate = require("../models/traumaTemplateModel.js");
const ProgressNotes = require("../models/progressNotesModel.js");
const TransferOut = require("../models/transferOutModel.js");
const DischargeSummary = require("../models/dischargeSummayModel.js");
const LamaConsent = require("../models/lamaConsentModel.js");
const Xray = require("../models/xrayModel.js");
const Pocus = require("../models/pocusModel.js");
const Ecg = require("../models/ecgModel.js");
const BloodGas = require("../models/bloodGasModel.js");
const Troponin = require("../models/troponinModel.js");
const OtherTest = require("../models/otherTestModel.js");
const CtScan = require("../models/ctScanModel.js");
const Cbc = require("../models/cbcModel.js");
const Coagulation = require("../models/coagulationModel.js");
const Lft = require("../models/lftModel.js");
const Rft = require("../models/rftModel.js");
const Treatment = require("../models/treatmentModel.js");
const UrineTest = require("../models/urineTestModel.js");
const VitalRecording = require("../models/vitalsRecordingModel.js");
const InOut = require("../models/inOutModel.js");
const HandoverNotes = require("../models/handoverNotes.js");
const TreatmentNursing = require("../models/treatmentNursingModel.js");
exports.registerPatient = async (req, res) => {
  try {
    const patient = await Patient.create({
      ...req.body,
      submittedBy: req.user.user,
      designation: req.user.designation, // ✅ Store filename
    });
    res
      .status(201)
      .json({ message: "Patient registered successfully", patient });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.submitTriage = async (req, res) => {
  try {
    const triageDetails = await PatientTriage.create({
      ...req.body,
      submittedBy: req.user.user,
      designation: req.user.designation,
    });
    res
      .status(201)
      .json({
        message: "triageDetails registered successfully",
        triageDetails,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPatientList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const { count, rows } = await Patient.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      totalRecords: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPatientTriage = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.patientId, {
      include: { model: PatientTriage, as: "patientTriage" },
    });

    if (!patient) return res.status(404).json({ error: "Patient not found" });

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPatientListWithTriage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    // const { count, rows } = await Patient.findAndCountAll({
    //     include: {
    //         model: PatientTriage,
    //         as: 'patientTriage',
    //         attributes: ['triage', 'emergencyType' , 'createdAt']
    //     },
    //     limit,
    //     offset,
    //     order: [['createdAt', 'DESC']] // optional: latest patients first
    // });

    const { count, rows } = await Patient.findAndCountAll({
      include: [
        {
          model: PatientTriage,
          as: "patientTriage",
          attributes: ["triage", "emergencyType", "createdAt"],
        },
        {
          model: PrimaryAssessment,
          as: "primaryAssessment",
          attributes: ['rash',"createdAt"],
        },
        {
          model: DischargeSummary,
          as: "DischargeSummary",
          attributes: ['gcs',"createdAt"],
        },
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      totalRecords: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (err) {
    console.error("Pagination error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllTriageRecords = async (req, res) => {
  try {
    const triages = await PatientTriage.findAll({
      where: {
        patient_id: req.params.id,
      },
      attributes: ["triage", "triageNotes", "date", "time", "patient_id"],
      order: [["createdAt", "DESC"]], // latest first
    });

    res.status(200).json({
      message: "Triage records fetched successfully",
      data: triages,
    });
  } catch (err) {
    console.error("Error fetching triage records:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getPatientSummary = async (req, res) => {
  try {
    const { patientId } = req.params;

    const [
      patientDetails,
      triageDetails,
      primaryAssesment,
      generalEmergencyCare,
      traumaTemplates,
      progressNotes,
      otherTests,
      ctScan,
      cbc,
      xray,
      pocus,
      ecg,
      bloodGas,
      troponin,
      dischargeSummary,
      transferOut,
      lamaConsent,
      lft,
      rft,
      treatment,
      urineTest,
      vitalRecording,
      inOut,
      handoverNotes,
      coagulation,
      treatmentNursing
    ] = await Promise.all([
      Patient.findByPk(patientId),
      PatientTriage.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      PrimaryAssessment.findOne({
        where: { patient_id: patientId },
      }),
      GeneralEmergencyCare.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      TraumaTemplate.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      ProgressNotes.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      OtherTest.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      CtScan.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      Cbc.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      Xray.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      Pocus.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      Ecg.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      BloodGas.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      Troponin.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      DischargeSummary.findOne({
        where: { patient_id: patientId },
      }),
      TransferOut.findOne({
        where: { patient_id: patientId },
      }),
      LamaConsent.findOne({
        where: { patient_id: patientId },
      }),
      Lft.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      Rft.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      Treatment.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      UrineTest.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      VitalRecording.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      InOut.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      HandoverNotes.findAll({
        where: { patientId: patientId },
        order: [["createdAt", "DESC"]],
      }),
      Coagulation.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      TreatmentNursing.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      })
    ]);

    res.status(200).json({
      patientDetails,
      triageDetails,
      primaryAssesment,
      generalEmergencyCare,
      traumaTemplates,
      progressNotes,
      otherTests,
      ctScan,
      cbc,
      xray,
      pocus,
      ecg,
      bloodGas,
      troponin,
      dischargeSummary,
      transferOut,
      lamaConsent,
      lft,
      rft,
      treatment,
      urineTest,
      vitalRecording,
      inOut,
      handoverNotes,
      coagulation,
      treatmentNursing
    });
  } catch (error) {
    console.error("Error fetching patient summary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getPatientNursingSummary = async (req, res) => {
  const { patientId } = req.params;

  try {
    const [patientDetails, treatmentNursing, vitalRecording, inOut, handoverNotes] = await Promise.all([
      Patient.findByPk(patientId),
      TreatmentNursing.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      VitalRecording.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      InOut.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      }),
      HandoverNotes.findAll({
        where: { patient_id: patientId },
        order: [["createdAt", "DESC"]],
      })
    ]);

    res.status(200).json({
      patientDetails,
      treatmentNursing,
      vitalRecording,
      inOut,
      handoverNotes
    });
  } catch (error) {
    console.error("Error fetching patient nursing summary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
