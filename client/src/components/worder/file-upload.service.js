import * as axios from 'axios';

const BASE_URL = '/api/upload';

export function upload(formData) {
  const url = BASE_URL;
  return axios
    .post(url, formData)
    .then(res => res.data)
    .catch(err => err);
}
