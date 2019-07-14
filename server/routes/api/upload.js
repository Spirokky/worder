const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send('GET request');
});

router.post('/', async (req, res) => {
  res.send('POST request');
});

module.exports = router;
