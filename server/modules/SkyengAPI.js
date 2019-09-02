const request = require('request-promise-native');

const partsOfSpeech = {
  n: 'noun',
  v: 'verb',
  j: 'adjective',
  r: 'adverb',
  prp: 'preposition',
  prn: 'pronoun',
  crd: 'cardinal number',
  cjc: 'conjunction',
  exc: 'interjection',
  det: 'determiner',
  ph0: 'phrase',
  ph1: 'phrase',
  abb: 'abbreviation',
  ord: 'ordinal number',
  md: 'modal verb',
  ph: 'phrase',
  phi: 'idiom',
  phl: 'linking words',
  phv: 'vague language',
  phf: 'fixed phrases'
};

class SkyengAPI {
  constructor() {
    this.URL = 'https://dictionary.skyeng.ru/api/public/v1';
  }

  async meaning(ids) {
    const options = {
      method: 'GET',
      url: `${this.URL}/meanings?ids=${ids}`
    };
    const req = await request(options);
    return JSON.parse(req);
  }

  async search(word) {
    const options = {
      method: 'GET',
      url: `${this.URL}/words/search?search=${word}`
    };
    const req = await request(options);
    return JSON.parse(req);
  }
}

module.exports = { SkyengAPI, partsOfSpeech };
