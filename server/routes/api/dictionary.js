const express = require('express');
const { SkyengAPI, partsOfSpeech } = require('../../modules/SkyengAPI');

const router = express.Router();

const skyeng = new SkyengAPI();

router.get('/get/:word', async (req, res) => {
  const { word } = req.params;
  const search = await skyeng.search(word);

  const result = await Promise.all(
    search.map(async item => {
      const ids = item.meanings.map(i => i.id);
      return {
        text: item.text,
        meanings: await Promise.all(ids.map(id => skyeng.meaning(id).then(r => r[0])))
      };
    })
  );

  res.send(result);
});

module.exports = router;
