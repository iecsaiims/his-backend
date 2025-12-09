const ExcelJS = require("exceljs");
const { sequelize } = require("../models");

exports.exportBasicTriageExcel = async (req, res) => {
  try {
    const [rows] = await sequelize.query(`
      SELECT * FROM v_patient_triage_basic
      ORDER BY triage_date DESC, triage_time DESC;
    `);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Basic Triage Report");

    // Define Excel columns
    const columns = [     
      { header: "Patient Name", key: "patient_name" },
      { header: "CR Number", key: "cr_number" },
      { header: "Age (years)", key: "age_years" },
      { header: "Gender", key: "gender" },
      { header: "Triage Date", key: "triage_date" },
      { header: "Triage Time", key: "triage_time" },

      { header: "Triage Category", key: "triage_category" },
      { header: "Emergency Type", key: "emergency_type" },
      { header: "Arrival Mode", key: "arrival_mode" },
      { header: "Referral Status", key: "referral_status" },

      { header: "SPO2", key: "spo2" },
      { header: "Pulse", key: "pulse" },
      { header: "SBP", key: "sbp" },
      { header: "DBP", key: "dbp" },
      { header: "Respiratory Rate", key: "rr" },
      { header: "Temperature", key: "temp" },

      { header: "Complaints", key: "complaints" },
      { header: "Triage Notes", key: "triage_notes" },
    ];

    sheet.columns = columns;

    rows.forEach(row => sheet.addRow(row));
    sheet.getRow(1).font = { bold: true };

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="patient_triageData_${Date.now()}.xlsx"`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Excel export failed" });
  }
};

