const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();


app.use(cors());
app.use(express.json());

const { sequelize } = require('./src/models');

const authRoutes = require('./src/routes/authRoutes')
const patientRoutes = require('./src/routes/patientRoutes')

app.use('/api/auth', authRoutes);
app.use('/api/patient', patientRoutes)


const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('DB sync error:', err));