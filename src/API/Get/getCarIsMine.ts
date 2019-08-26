import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_RENTAL_CAR_Is_Mine = '/core/rental-car/get';

export const REQUEST_getCarIsMine = (data: IgetCarIsMine) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN + GET_RENTAL_CAR_Is_Mine,
        {
          is_mine: 1,
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
          resolve(response.data.data);
        } else {
          reject(new Error('Error in loading rental car data!'));
        }
      });
  });
};

interface IgetCarIsMine {
  token: string;
  id: any;
}
