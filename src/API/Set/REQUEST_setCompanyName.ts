import axios from 'axios';
import jsCookie from "js-cookie";
const cook_option = {
  expires: 100
};
const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_NAME_LASTNAME = '/core/user/set-company-name';

export const REQUEST_setCompanyName = (data: InewCompanyName) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + SET_NAME_LASTNAME,
        {
            company_name: data.company_name,
        },
        {
          headers: {
            Authorization: 'Bearer ' + data.token
          }
        }
      )
      .then(response => {
        if (response.data.success) {
          jsCookie.set('company_name', response.data.data.company_name, cook_option);

          resolve(response.data.success);
        }
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

interface InewCompanyName {
  token: string;
  company_name: string;
}
