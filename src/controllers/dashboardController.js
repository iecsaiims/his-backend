const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

// IST "today" so dashboard respects the app's displayed timezone
const todayDateExpr = "timezone('Asia/Kolkata', NOW())::date";

exports.getDoctorDashboard = async (req, res) => {
  try {
    const totalsQuery = `
      WITH latest_disposition AS (
        SELECT patient_id, 'discharge' AS type, created_at FROM discharge_summary
        UNION ALL
        SELECT patient_id, 'transfer_out' AS type, created_at FROM transfer_out
        UNION ALL
        SELECT patient_id, 'lama' AS type, created_at FROM lama_consent
        UNION ALL
        SELECT patient_id, 'admission' AS type, created_at FROM "Admission"
      ),
      dedup_disposition AS (
        SELECT ld.*, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY created_at DESC) AS rn
        FROM latest_disposition ld
      ),
      latest_disposition_per_patient AS (
        SELECT patient_id, type, created_at
        FROM dedup_disposition
        WHERE rn = 1
      )
      SELECT
        (SELECT COUNT(*) FROM patients) AS total_patients_all_time,
        (SELECT COUNT(*) FROM patients WHERE timezone('Asia/Kolkata', created_at)::date = ${todayDateExpr}) AS total_patients_today,
        (SELECT COUNT(*) FROM patients p WHERE NOT EXISTS (SELECT 1 FROM latest_disposition_per_patient ld WHERE ld.patient_id = p.id)) AS active_patients_all_time,
        (SELECT COUNT(*) FROM patients p WHERE timezone('Asia/Kolkata', p.created_at)::date = ${todayDateExpr} AND NOT EXISTS (SELECT 1 FROM latest_disposition_per_patient ld WHERE ld.patient_id = p.id)) AS active_patients_today;
    `;

    const triageAllTimeQuery = `
      WITH latest_triage AS (
        SELECT pt.*, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY created_at DESC) AS rn
        FROM patient_triages pt
      )
      SELECT triage, COUNT(*) AS count
      FROM latest_triage
      WHERE rn = 1
      GROUP BY triage;
    `;

    const triageTodayQuery = `
      WITH latest_triage AS (
        SELECT pt.*, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY created_at DESC) AS rn
        FROM patient_triages pt
      )
      SELECT triage, COUNT(*) AS count
      FROM latest_triage
      WHERE rn = 1
        AND timezone('Asia/Kolkata', created_at)::date = ${todayDateExpr}
      GROUP BY triage;
    `;

    const dispositionAllTimeQuery = `
      WITH latest_disposition AS (
        SELECT patient_id, 'discharge' AS type, created_at FROM discharge_summary
        UNION ALL
        SELECT patient_id, 'transfer_out' AS type, created_at FROM transfer_out
        UNION ALL
        SELECT patient_id, 'lama' AS type, created_at FROM lama_consent
        UNION ALL
        SELECT patient_id, 'admission' AS type, created_at FROM "Admission"
      ),
      dedup_disposition AS (
        SELECT ld.*, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY created_at DESC) AS rn
        FROM latest_disposition ld
      ),
      latest_disposition_per_patient AS (
        SELECT patient_id, type, created_at
        FROM dedup_disposition
        WHERE rn = 1
      )
      SELECT type, COUNT(*) AS count
      FROM latest_disposition_per_patient
      GROUP BY type;
    `;

    const dispositionTodayQuery = `
      WITH latest_disposition AS (
        SELECT patient_id, 'discharge' AS type, created_at FROM discharge_summary
        UNION ALL
        SELECT patient_id, 'transfer_out' AS type, created_at FROM transfer_out
        UNION ALL
        SELECT patient_id, 'lama' AS type, created_at FROM lama_consent
        UNION ALL
        SELECT patient_id, 'admission' AS type, created_at FROM "Admission"
      ),
      dedup_disposition AS (
        SELECT ld.*, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY created_at DESC) AS rn
        FROM latest_disposition ld
      ),
      latest_disposition_per_patient AS (
        SELECT patient_id, type, created_at
        FROM dedup_disposition
        WHERE rn = 1
      )
      SELECT type, COUNT(*) AS count
      FROM latest_disposition_per_patient
      WHERE timezone('Asia/Kolkata', created_at)::date = ${todayDateExpr}
      GROUP BY type;
    `;

    const activeListQuery = `
      WITH latest_triage AS (
        SELECT pt.*, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY created_at DESC) AS rn
        FROM patient_triages pt
      ),
      latest_disposition AS (
        SELECT patient_id, 'discharge' AS type, created_at FROM discharge_summary
        UNION ALL
        SELECT patient_id, 'transfer_out' AS type, created_at FROM transfer_out
        UNION ALL
        SELECT patient_id, 'lama' AS type, created_at FROM lama_consent
        UNION ALL
        SELECT patient_id, 'admission' AS type, created_at FROM "Admission"
      ),
      dedup_disposition AS (
        SELECT ld.*, ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY created_at DESC) AS rn
        FROM latest_disposition ld
      ),
      latest_disposition_per_patient AS (
        SELECT patient_id, type, created_at
        FROM dedup_disposition
        WHERE rn = 1
      )
      SELECT
        p.id,
        p.name,
        p.cr_number AS "crNumber",
        lt.triage,
        lt.emergency_type AS "emergencyType",
        lt.created_at AS "triageTime"
      FROM patients p
      JOIN latest_triage lt ON lt.patient_id = p.id AND lt.rn = 1
      LEFT JOIN latest_disposition_per_patient ld ON ld.patient_id = p.id
      WHERE ld.patient_id IS NULL
      ORDER BY lt.created_at DESC
      LIMIT 50;
    `;

    const [
      totalsRow,
      triageAllTimeRows,
      triageTodayRows,
      dispositionAllTimeRows,
      dispositionTodayRows,
      activeList,
    ] = await Promise.all([
      sequelize.query(totalsQuery, { type: QueryTypes.SELECT }).then(rows => rows[0] || {}),
      sequelize.query(triageAllTimeQuery, { type: QueryTypes.SELECT }),
      sequelize.query(triageTodayQuery, { type: QueryTypes.SELECT }),
      sequelize.query(dispositionAllTimeQuery, { type: QueryTypes.SELECT }),
      sequelize.query(dispositionTodayQuery, { type: QueryTypes.SELECT }),
      sequelize.query(activeListQuery, { type: QueryTypes.SELECT }),
    ]);

    const reduceCounts = rows =>
      rows.reduce((acc, row) => {
        acc[row.triage || row.type] = Number(row.count) || 0;
        return acc;
      }, {});

    const response = {
      totals: {
        patients: {
          allTime: Number(totalsRow?.total_patients_all_time) || 0,
          today: Number(totalsRow?.total_patients_today) || 0,
        },
        activePatients: {
          allTime: Number(totalsRow?.active_patients_all_time) || 0,
          today: Number(totalsRow?.active_patients_today) || 0,
        },
      },
      triage: {
        allTime: reduceCounts(triageAllTimeRows),
        today: reduceCounts(triageTodayRows),
      },
      disposition: {
        allTime: reduceCounts(dispositionAllTimeRows),
        today: reduceCounts(dispositionTodayRows),
      },
      activePatients: {
        count: Number(totalsRow?.active_patients_all_time) || 0,
        list: activeList,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error building doctor dashboard:', error);
    return res.status(500).json({ error: 'Failed to build dashboard' });
  }
};

