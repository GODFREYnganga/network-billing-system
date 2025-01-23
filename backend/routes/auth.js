const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    const { name, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO users (name, phone, password) VALUES ($1, $2, $3)', [name, phone, hashedPassword]);
    res.json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE name = $1', [name]);

    if (user.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    
    const isValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
