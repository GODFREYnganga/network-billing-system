const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/mac', require('./routes/mac'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/routers', require('./routes/routers'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('dotenv').config();
const { Pool } = require('pg');
const africastalking = require('africastalking')({
    apiKey: process.env.AFRICAS_TALKING_API_KEY,
    });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for some cloud databases
});