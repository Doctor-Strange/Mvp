import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const NEW_CAR_AVAILABILITY = '/core/rental-car/availability/new';

export const REQUEST_newCarAvailability = (data: InewCarAvailability) => {
  return new Promise((resolve, reject) => {
    const { 
        token,
        rental_car_id,
        is_all_time,
        price_per_day,
        status_id,
    } = data;
    axios
      .post(
        DOMAIN + NEW_CAR_AVAILABILITY,
        {
            is_all_time,
            price_per_day,
            rental_car_id,
            status_id,
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

interface InewCarAvailability {
  token: string;
  rental_car_id: string | number;
  is_all_time: boolean | number;
  price_per_day: number;
  status_id: 'available';
}
