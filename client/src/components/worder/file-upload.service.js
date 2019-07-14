import * as axios from 'axios';

const BASE_URL = '/api/upload';

export function upload(formData) {
  const url = BASE_URL;
  return (
    axios
      .post(url, formData)
      .then(x => x.data)
      // eslint-disable-next-line
      .then(x => console.log(x))
  );
}
