import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_USER = '/core/user/info';

export const REQUEST_getUser = (data: IgetUser) => {
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + GET_USER +
        (data.id? '?id=' + data.id
        : '?username=' + data.username)
        )
      .then(response => {
        if (response.data.success) {
          resolve(response.data.data);
        } else {
          reject(false);
        }
      })
      .catch(err => {
        console.warn('profile request filed: ', err.message);
      });
  });
};

interface IgetUser {
  id?: string;
  username?: string;
}
