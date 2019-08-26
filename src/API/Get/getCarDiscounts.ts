import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_RENTAL_CAR_DISCOUNTS = '/core/rental-car/discount/list';

export const REQUEST_getCarDiscounts = (data: IgetCarDiscounts) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + GET_RENTAL_CAR_DISCOUNTS,
        {
          id: data.id
        },
        {
          headers: {
            Authorization: 'Bearer ' + data.token
          }
        }
      )
      .then(response => {
        const output = {};
        if (response.data.success) {
          resolve(response.data.items);
        } else {
          reject(new Error('Error in loading rental car data!'));
        }
      });
  });
};

interface IgetCarDiscounts {
  token: string;
  id: any;
}
