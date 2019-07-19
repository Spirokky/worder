const request = require('request');
const config = require('../config/config');

class LingvoAPI {
  constructor() {
    this.BASE_URL = config.lingvo.BASE_URL;
    this.API_KEY = config.lingvo.API_KEY;
    this.API_TOKEN = null;
    this.authorize();
  }

  authorize() {
    const options = {
      method: 'POST',
      url: `${this.BASE_URL}/api/v1.1/authenticate`,
      headers: {
        Authorization: `Basic ${this.API_KEY}`
      }
    };
    request(options, (err, res, body) => {
      if (err) throw err;
      this.API_TOKEN = body;
    });
  }

  translate(text, cb, ...args) {
    const { srcLang = 1033, dstLang = 1049, isCaseSensitive = false } = args;
    // const srcLang = args.srcLang || 1033;
    // const dstLang = args.dstLang || 1049;
    // const isCaseSensitive = args.isCaseSensitive || false;
    const options = {
      method: 'GET',
      url: `${this.BASE_URL}/api/v1/Translation?text=${text}&srcLang=${srcLang}&dstLang=${dstLang}&isCaseSensitive=${isCaseSensitive}`,
      headers: {
        Authorization: `Bearer ${this.API_TOKEN}`
      }
    };
    request(options, cb);
  }

  wordList(text) {
    return this.BASE_URL;
  }

  minicard(text) {
    return this.BASE_URL;
  }

  search(text) {
    return this.BASE_URL;
  }

  article(text) {
    return this.BASE_URL;
  }

  wordForms(text) {
    return this.BASE_URL;
  }

  sound(text) {
    return this.BASE_URL;
  }
}

module.exports = LingvoAPI;
