const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

app.use(cors());

// app.use('/uploads', express.static('uploads'));

const { sequelize } = require("./src/models");

const authRoutes = require("./src/routes/authRoutes");
const patientRoutes = require("./src/routes/patientRoutes");
const primaryAssessmentRoutes = require("./src/routes/primaryAssessmentRoutes");
const doctorNotesRoutes = require("./src/routes/doctorNotesRoutes");
const fileRoutes = require("./src/routes/fileRoutes");
const pointOfCareRoutes = require("./src/routes/pointOfCareRoutes");
const dispositionRoutes = require("./src/routes/dispositionRoutes");
const investigationRoutes = require("./src/routes/investigationRoutes");
const treatmentDetailsRoutes = require("./src/routes/treatmentdetailsRoutes.js");
const vitalsRoutes = require("./src/routes/vitalsRoutes");
const InOutRoutes = require("./src/routes/InOutRoutes.js");
const handoverNotesRoutes = require("./src/routes/handoverNotesRoutes.js");
const consultationRoutes = require("./src/routes/consultationRoutes.js");
const diagnosisRoutes = require("./src/routes/diagnosisRoutes.js");
app.use((req, res, next) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

app.use("/api/auth", express.json(), authRoutes);
app.use("/api/patient", express.json(), patientRoutes);
app.use("/api/primary-assessment", express.json(), primaryAssessmentRoutes);
app.use("/api/templates", express.json(), doctorNotesRoutes);
app.use("/api/poc-tests", pointOfCareRoutes);
app.use("/api/disposition", express.json(), dispositionRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/investigation", express.json(), investigationRoutes);
app.use("/api/treatment", express.json(), treatmentDetailsRoutes);
app.use("/api/vitals", express.json(), vitalsRoutes);
app.use("/api/inout", express.json(), InOutRoutes);
app.use("/api/handover-notes", express.json(), handoverNotesRoutes);
app.use("/api/ed-consultation", consultationRoutes);
app.use("/api/diagnosis", express.json(), diagnosisRoutes);
app.get("/api/test", async (req, res) => {
  res.status(200).json({ message: "API is working" });
});
const PORT = process.env.PORT || 3003;

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB sync error:", err));
