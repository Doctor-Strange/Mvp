import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_NAME_LASTNAME = '/core/user/set-name';

export const REQUEST_setUsetNameLastName = (data: InewRentRequest) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + SET_NAME_LASTNAME,
        {
            first_name: data.first_name,
            last_name: data.last_name,
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

interface InewRentRequest {
  token: string;
  first_name: string;
  last_name: string;
}
