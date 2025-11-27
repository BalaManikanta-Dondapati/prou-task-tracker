const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModel');
const Joi = require('joi');

// GET /api/employees
router.get('/', (req, res) => {
  Employee.all((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /api/employees
router.post('/', (req, res) => {
  const schema = Joi.object({ name: Joi.string().required(), role: Joi.string().allow(''), email: Joi.string().email().allow('') });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  Employee.create(value, (err, row) => {
    if (err) {
      if (err.message && err.message.includes('UNIQUE constraint')) return res.status(400).json({ error: 'Email already exists' });
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(row);
  });
});

module.exports = router;
