const request = require('request');
const config = require('../config/config');

class LingvoAPI {
  constructor() {
    this.BASE_URL = config.lingvo.BASE_URL;
    this.API_KEY = config.lingvo.API_KEY;
    this.API_TOKEN = null;
    this.lastUpdate = null;
    this.tokenExpire = 23 * 60 * 60 * 1000;
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
      this.lastUpdate = Date.now();
    });
  }

  updateToken() {
    if (Date.now() - this.lastUpdate >= this.tokenExpire) {
      this.authorize();
    }
  }

  translate(text, cb, ...args) {
    this.updateToken();
    const { srcLang = 1033, dstLang = 1049, isCaseSensitive = '' } = args;
    const options = {
      method: 'GET',
      url: `${this.BASE_URL}/api/v1/Translation?text=${text}&srcLang=${srcLang}&dstLang=${dstLang}&isCaseSensitive=${isCaseSensitive}`,
      headers: {
        Authorization: `Bearer ${this.API_TOKEN}`
      }
    };
    request(options, cb);
  }

  wordList(prefix, cb, ...args) {
    this.updateToken();
    const { srcLang = 1033, dstLang = 1049, pageSize = 5, startPos = '' } = args;
    const options = {
      method: 'GET',
      url: `${this.BASE_URL}/api/v1/WordList?prefix=${prefix}&srcLang=${srcLang}&dstLang=${dstLang}&pageSize=${pageSize}&startPos=${startPos}`,
      headers: {
        Authorization: `Bearer ${this.API_TOKEN}`
      }
    };
    request(options, cb);
  }

  minicard(text, cb, ...args) {
    this.updateToken();
    const { srcLang = 1033, dstLang = 1049 } = args;
    const options = {
      method: 'GET',
      url: `${this.BASE_URL}/api/v1/Minicard?text=${text}&srcLang=${srcLang}&dstLang=${dstLang}`,
      headers: {
        Authorization: `Bearer ${this.API_TOKEN}`
      }
    };
    request(options, cb);
  }

  search(text, cb, ...args) {
    this.updateToken();
    const { srcLang = 1033, dstLang = 1049, searchZone = 15, startIndex = 0, pageSize = 10 } = args;
    const options = {
      method: 'GET',
      url: `${this.BASE_URL}/api/v1/Search?text=${text}&srcLang=${srcLang}&dstLang=${dstLang}&searchZone=${searchZone}&startIndex=${startIndex}&pageSize=${pageSize}`,
      headers: {
        Authorization: `Bearer ${this.API_TOKEN}`
      }
    };
    request(options, cb);
  }

  article(heading, cb, ...args) {
    this.updateToken();
    const { srcLang = 1033, dstLang = 1049, dict = 'Electronics%20(En-Ru)' } = args;
    const options = {
      method: 'GET',
      url: `${this.BASE_URL}/api/v1/Article?heading=${heading}&dict=${dict}&srcLang=${srcLang}&dstLang=${dstLang}`,
      headers: {
        Authorization: `Bearer ${this.API_TOKEN}`
      }
    };
    request(options, cb);
  }

  wordForms(text, cb, ...args) {
    this.updateToken();
    const { srcLang = 1033, dstLang = 1049 } = args;
    const options = {
      method: 'GET',
      url: `${this.BASE_URL}/api/v1/Suggests?text=${text}&srcLang=${srcLang}&dstLang=${dstLang}`,
      headers: {
        Authorization: `Bearer ${this.API_TOKEN}`
      }
    };
    request(options, cb);
  }

  suggest(text, cb, ...args) {
    this.updateToken();
    const { dictionaryName = 'LingvoUniversal%20(En-Ru)', fileName = 'bang.wav' } = args;
    const options = {
      method: 'GET',
      url: `${this.BASE_URL}/api/v1/Sound?dictionaryName=${dictionaryName}&fileName=${fileName}`,
      headers: {
        Authorization: `Bearer ${this.API_TOKEN}`
      }
    };
    request(options, cb);
  }

  sound(text, cb, ...args) {
    this.updateToken();
    const { dictionaryName = 'LingvoUniversal%20(En-Ru)', fileName = 'bang.wav' } = args;
    const options = {
      method: 'GET',
      url: `${this.BASE_URL}/api/v1/Sound?dictionaryName=${dictionaryName}&fileName=${fileName}`,
      headers: {
        Authorization: `Bearer ${this.API_TOKEN}`
      }
    };
    request(options, cb);
  }
}

module.exports = LingvoAPI;
