const express = require('express');
const LingvoAPI = require('../../modules/LingvoAPI');
const { parseWordList, parseMinicard } = require('../../modules/lingvoparser');

const router = express.Router();

const lingvo = new LingvoAPI();

router.get('/translate/:word', (req, res) => {
  lingvo.translate(req.params.word, (err, response, body) => {
    if (!body) res.status(404).send('Not Found');
    const result = JSON.parse(body);
    res.send({ body: result });
  });
});

router.get('/minicard/:word', (req, res) => {
  lingvo.minicard(req.params.word, (err, response, body) => {
    if (!body) res.status(404).send('Not Found');
    const result = JSON.parse(body);
    res.send({ body: parseMinicard(result) });
  });
});

router.get('/wordlist/:prefix', (req, res) => {
  lingvo.wordList(req.params.prefix, (err, response, body) => {
    if (!body) res.status(404).send('Not Found');
    const result = JSON.parse(body);
    res.send({ body: parseWordList(result) });
  });
});

router.get('/translatetest/:word', (req, res) => {
  lingvo.minicard(req.params.word, (err, response, body) => {
    if (!body) res.status(404).send('Not Found');
    const result = JSON.parse(body);
    res.send({ body: parseMinicard(result) });
  });
});

module.exports = router;
