const express = require('express');
const router = express.Router();
const LingvoAPI = require('../../modules/LingvoAPI');

const lingvo = new LingvoAPI();
lingvo.authorize();

router.get('/translate/:word', (req, res) => {
  lingvo.translate(req.params.word, (err, response, body) => {
    res.send({ params: req.params, body: JSON.parse(body) });
  });
});

module.exports = router;
