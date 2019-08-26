import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_USERNAME = '/core/user/set-username';

export const REQUEST_setUsername = (data: IsetUsername) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + SET_USERNAME,
        {
            username: data.username
        },
        {
          headers: {
            Authorization: 'Bearer ' + data.token
          }
        }
      )
      .then(response => {
        if (response.data.success) {
          resolve(response.data.success);
        }
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

interface IsetUsername{
  token: string;
  username: string;
}
