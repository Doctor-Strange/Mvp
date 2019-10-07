import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_RENTAL_CAR = '/core/rental-car/search-for-rent/get';

export const REQUEST_getCar = (data: IgetCar) => {
  return new Promise((resolve, reject) => {
    let queryString = '';
    if (data.search_id) {
      queryString = queryString + `search_id=${data.search_id}`;
    } else if (data.id) {
      queryString = queryString + `rental_car_id=${data.id}`;
    }
    axios.post(DOMAIN + GET_RENTAL_CAR + '?' + queryString).then(response => {
      if (response.data.id) {
        const data = response.data;
        const facilities = [];
        data.facility_set.map((value, index) => {
          facilities.push({
            id: value.id,
            name: value.name.fa
          });
        });
        const media_set = [];
        data.media_set.map((value, index) => media_set.push(value.url));
        resolve({
          year: data.year.name,
          mileage_range: data.mileage_range,
          avg_price_per_day: data.avg_price_per_day,
          owner: data.owner,
          body_style: data.body_style.name,
          color: data.color.name,
          color_code: data.color.code,
          deliver_at_renters_place: data.deliver_at_renters_place,
          cancellation_policy: data.cancellation_policy,
          transmission_type: data.transmission_type.name,
          location: data.location,
          max_km_per_day: data.max_km_per_day,
          description: data.description,
          capacity: data.capacity,
          extra_km_price: data.extra_km_price,
          car: data.car,
          facility_set: facilities,
          loaded: true,
          media_set,
          end_date: data.end_date,
          start_date: data.start_date,
          no_of_days: data.no_of_days,
          total_price: data.total_price,
          discounted_total_price: data.discounted_total_price,
          avg_discounted_price_per_day: data.avg_discounted_price_per_day,
          value:data.value,
          cylinder: data.cylinder
        });
      } else {
        reject(false);
      }
    });
  });
};

interface IgetCar {
  search_id?: string;
  id?: any;
}
