import axios from 'axios';
import { toast } from 'react-toastify';

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
        toast.error(error.response.data.message, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        reject(error.response);
      });
  });
};

interface IsetUsername{
  token: string;
  username: string;
}
