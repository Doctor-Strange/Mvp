import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_USER_IMAGE = '/core/user/set-image';

export const REQUEST_setUserImage = (data: IsetUSerImage) => {
  return new Promise((resolve, reject) => {
    const { 
      token,
      file
    } = data;
    let form = new FormData();
    form.append('image', file);
    axios
      .post(
        DOMAIN + SET_USER_IMAGE,
          form,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(response => {
        if (response.data.success) {
          resolve(response.data);
        }
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

interface IsetUSerImage{
  token: string;
  file: any;
}
