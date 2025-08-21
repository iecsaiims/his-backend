const HandoverNotes = require('../models/handoverNotes');


exports.createHandoverNotes = async (req, res) => {
    try {
    Object.keys(req.body).forEach(key => {
      if (req.body[key] === '') {
        req.body[key] = null;
      }
    });

    const data = await HandoverNotes.create({
      ...req.body,
      submittedBy: req.user.user,
      designation:req.user.designation // Injected from token
    });

    res.status(201).json({
      message: 'handover notes created successfully',
      data
    });
  } catch (err) {
    console.error('Error creating handover notes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

exports.getHandoverNotesByPatientId = async (req, res) => {
    try {
    const { patientId } = req.params;

    const records = await HandoverNotes.findAll({
      where: { patientId }
    });

    if (!records.length) {
      return res.status(404).json({ message: 'No records found for this patient' });
    }

    res.status(200).json({
      message: 'Records fetched successfully',
      data: records
    });
  } catch (err) {
    console.error('Error fetching records:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}