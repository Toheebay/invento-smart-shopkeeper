
const express = require('express');
const router = express.Router();

/* Example API route */
router.get('/status', (req, res) => {
  res.json({ status: 'Backend is working!' });
});

module.exports = router;
