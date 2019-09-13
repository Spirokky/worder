/* eslint-disable no-unused-vars, no-console */
import axios from 'axios';

const BASE_URL = '/api/upload';

function upload(formData) {
  console.log(`Form Data: ${formData}`);
  return axios
    .post(BASE_URL, formData)
    .then(res => res.data)
    .catch(err => err);
}

const state = {
  words: []
};

const getters = {
  allWords: state => state.words
};

const actions = {
  async fetchWords({ commit }, formData) {
    const response = await upload(formData);
    console.log(response);
    commit('setWords', response);
  }
};

const mutations = {
  setWords: (state, words) => (state.words = words)
};

export default {
  state,
  getters,
  actions,
  mutations
};
