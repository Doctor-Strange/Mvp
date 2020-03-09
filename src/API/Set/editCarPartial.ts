import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const EDIT_CAR_PARTIAL = '/core/rental-car/edit/partial';

export const REQUEST_editCarPartial = (data: IeditCarPartial) => {
  return new Promise((resolve, reject) => {
    const { 
        token,
        id,
        deliver_at_renters_place,
        with_driver,
        max_km_per_day,
        extra_km_price,
        cancellation_policy,
        days_to_get_reminded,
        min_days_to_rent
    } = data;
    axios
      .post(
        DOMAIN + EDIT_CAR_PARTIAL,
        {
            cancellation_policy,
            days_to_get_reminded,
            deliver_at_renters_place,
            with_driver,
            extra_km_price,
            id,
            max_km_per_day,
            min_days_to_rent
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

interface IeditCarPartial {
  token: string;
  id: string | number;
  deliver_at_renters_place: number | boolean;
  with_driver: number | boolean;
  max_km_per_day: number;
  extra_km_price: number;
  cancellation_policy: string;
  days_to_get_reminded: number;
  min_days_to_rent: number;
}
