const express = require('express');
const router = express.Router();
const LingvoAPI = require('../../modules/LingvoAPI');

const lingvo = new LingvoAPI();
lingvo.authorize();

router.get('/translate/:word', (req, res) => {
  lingvo.translate(req.params.word, (err, response, body) => {
    res.send({ body: JSON.parse(body) });
  });
});

router.get('/minicard/:word', (req, res) => {
  lingvo.minicard(req.params.word, (err, response, body) => {
    res.send({ body: JSON.parse(body) });
  });
});

module.exports = router;
