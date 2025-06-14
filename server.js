
// A simple Express.js backend starter
require('dotenv').config();
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', indexRouter);

app.get('/', (_req, res) => {
  res.send('Backend server is running!');
});

// Serve static files (optional, e.g. for frontend build)
// app.use(express.static(path.join(__dirname, 'dist')));

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
