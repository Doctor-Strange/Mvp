import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const DELETE_CAR_AVAILABILITY = '/core/rental-car/availability/delete';

export const REQUEST_deleteCarAvailability = (data: IdeleteCarAvailability) => {
  return new Promise((resolve, reject) => {
    const { 
        token,
        id
    } = data;
    axios
      .post(
        DOMAIN + DELETE_CAR_AVAILABILITY,
        {
            id
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

interface IdeleteCarAvailability {
  token: string;
  id: string | number;
}
