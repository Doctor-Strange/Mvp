import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SETOUTOFSERVICE = '/core/rental-car/set-is-out-of-service';

export const REQUEST_set_out_of_service = (data: Ioutofservice) => {
  return new Promise((resolve, reject) => {
    const { 
        token,
        id, 
        value
    } = data;
    // console.log(token)
    axios
      .post(
        DOMAIN + SETOUTOFSERVICE,
        {
            id, 
            value
        },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      .then(response => {
        // console.log(response)
        if (response.data.success) {
          resolve(response.data.success);
        }
      })
      .catch(error => {
        console.log(error)

        reject(error.response);
      });
  });
};

interface Ioutofservice {
  token: string;
  id: string | number;
  value: boolean
}
