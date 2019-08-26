import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_FAQ = '/core/faq/list';

export const REQUEST_getFAQ = (/*data: IgetFAQ*/) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + GET_FAQ
      )
      .then(response => {
        if (response.data.success) {
          resolve(response.data);
        } else {
          reject(new Error('Error in fetching FAQ!'));
        }
      });
  });
};

interface IgetFAQ {

}
