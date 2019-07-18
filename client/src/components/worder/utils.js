import axios from 'axios';

export function wait(ms) {
  return x => {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

export function getLingvoWord(word) {
  const url = `https://api.lingvolive.com/Translation/tutor-cards?text=${word}&srcLang=1033&dstLang=1049`;
  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => err);
}
