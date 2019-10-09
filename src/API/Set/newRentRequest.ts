import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_FACTORY_BRANDS = '/core/rental-car/rent-request/new';

export const REQUEST_newRentRequest = (data: InewRentRequest) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + GET_FACTORY_BRANDS,
        {
          search_id: data.search_id,
          has_insurance: data.has_insurance
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
  has_insurance: boolean,
  search_id: string;
}
