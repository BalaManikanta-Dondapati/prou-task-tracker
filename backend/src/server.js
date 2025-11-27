require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const employeeRoutes = require('./routes/employees');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth'); // optional, we'll include scaffold

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ message: 'ProU Task Tracker API' }));

app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
