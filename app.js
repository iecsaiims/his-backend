const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();


app.use(cors());

app.use('/uploads', express.static('uploads'));

const { sequelize } = require('./src/models');

const authRoutes = require('./src/routes/authRoutes')
const patientRoutes = require('./src/routes/patientRoutes')
const primaryAssessmentRoutes = require('./src/routes/primaryAssessmentRoutes')
const doctorNotesRoutes = require('./src/routes/doctorNotesRoutes')

app.use((req, res, next) => {
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

app.use('/api/auth',express.json(), authRoutes);
app.use('/api/patient',express.json(), patientRoutes)
app.use('/api/primary-assessment',express.json(), primaryAssessmentRoutes)
app.use('/api/templates',express.json(), doctorNotesRoutes)


const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('DB sync error:', err));