import axios from 'axios';

// this.client = axios.create(options);
// this.client.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse);
// this.unauthorizedCallback = () => {};

export default class LingvoAPI {
  constructor(props) {
    this.BASE_URL = 'https://developers.lingvolive.com';
    this.key = props.key;
    this.token = null;
    this.authorize();
  }

  async authorize() {
    const options = {
      method: 'post',
      url: `${this.BASE_URL}/api/v1.1/authenticate`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${this.key}`,
        'Access-Control-Allow-Origin': '*'
      },
      crossDomain: true
    };
    try {
      const request = axios.post(
        `${this.BASE_URL}/api/v1.1/authenticate`,
        { data: 'data' },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${this.key}`
          }
        }
      );
      // const request = await axios(options);
      console.log(request);
    } catch (e) {
      throw e;
    }
  }
}

fetch('https://developers.lingvolive.com/api/v1.1/authenticate', {
  headers: {
    Authorization:
      'Basic MTU1MzE2ZDgtYjhiYi00MjYzLWJjNTUtMjJjNGJmYWQ5YWY0OjhiOTRiNzg2ODQ3NjQ5ZTU4ZTg3MTI1YmY1NWUwNmQ0',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
  .then(r => r.json())
  .then(r => console.log(r));
