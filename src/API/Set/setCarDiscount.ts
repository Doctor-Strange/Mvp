import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_CAR_DISCOUNT = '/core/rental-car/discount/replace-set';

export const REQUEST_setCarDiscounts = (inputData: IsetCarDiscount) => {
  return new Promise((resolve, reject) => {
    const { 
        token,
        rental_car_id,
        data
    } = inputData;
    axios
      .post(
        DOMAIN + SET_CAR_DISCOUNT,
        {
            data,
            rental_car_id,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token
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

interface IsetCarDiscount {
  token: string;
  rental_car_id: string | number;
  data: string;
}
