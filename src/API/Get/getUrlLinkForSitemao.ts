import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_USER = '/core/landing/list';

export const REQUEST_URLS_FOR_SITE_MAP = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + GET_USER)
      .then(response => {
        // console.log("get user info", response)
        if (response.data.success) {
          
          resolve(response.data);
        } else {
          reject(false);
        }
      })
      .catch(err => {
        console.warn('profile request filed: ', err.message);
      });
  });
};
