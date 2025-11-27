const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');
const Joi = require('joi');
const auth = require('../middleware/auth'); // <--- new

// GET /api/tasks?status=&employeeId=
router.get('/', (req, res) => {
  const filters = { status: req.query.status, employeeId: req.query.employeeId };
  Task.all(filters, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /api/tasks/:id
router.get('/:id', (req, res) => {
  Task.findById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Task not found' });
    res.json(row);
  });
});

// POST /api/tasks (protected)
router.post('/', auth, (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(''),
    status: Joi.string().valid('Pending','In Progress','Completed').default('Pending'),
    employee_id: Joi.number().integer().allow(null),
    due_date: Joi.date().iso().allow(null)
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  Task.create(value, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(row);
  });
});

// PUT /api/tasks/:id (protected)
router.put('/:id', auth, (req, res) => {
  const schema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid('Pending','In Progress','Completed').optional(),
    employee_id: Joi.number().integer().allow(null).optional(),
    due_date: Joi.date().iso().allow(null).optional()
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  Task.update(req.params.id, value, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// DELETE /api/tasks/:id (protected)
router.delete('/:id', auth, (req, res) => {
  Task.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task deleted' });
  });
});

module.exports = router;
