const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Signup
router.post('/signup', (req, res) => {
  const schema = Joi.object({ username: Joi.string().alphanum().min(3).required(), password: Joi.string().min(6).required() });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  User.findByUsername(value.username, (err, existing) => {
    if (err) return res.status(500).json({ error: err.message });
    if (existing) return res.status(400).json({ error: 'Username already exists' });

    const hash = bcrypt.hashSync(value.password, 8);
    User.create(value.username, hash, (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '8h' });
      res.json({ user, token });
    });
  });
});

// Login
router.post('/login', (req, res) => {
  const schema = Joi.object({ username: Joi.string().required(), password: Joi.string().required() });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  User.findByUsername(value.username, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    if (!bcrypt.compareSync(value.password, user.password_hash)) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ user: { id: user.id, username: user.username }, token });
  });
});

module.exports = router;
