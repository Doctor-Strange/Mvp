import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_FACTORY_CARS = '/core/car/list';

export const REQUEST_getFactoryCars = (data: IgetFactoryCars) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN +
          GET_FACTORY_CARS +
          '?limit=' +
          data.limit +
          (data.brand_id ? '&brand_id=' + data.brand_id : '')
      )
      .then(response => {
        if (
          response.data.success &&
          Object.keys(response.data.items).length >= 1
        ) {
          const modelsFarsi = response.data.items.map((value, index) => ({
            key: value.id,
            text: `${value.name.fa} - ${value.name.en}`,
            value: value.id
          }));
          const modelsEnglish = response.data.items.map((value, index) => ({
            key: value.id,
            text: value.name.en,
            value: value.id
          }));
          resolve({
            modelsFarsi,
            modelsEnglish,
            model: null,
            modelLoading: false
          });
        } else {
          reject({
            model: null,
            modelLoading: false,
            modelsEnglish: [{ text: 'All Models', value: 0 }],
            modelsFarsi: [{ text: 'تمام مدل‌ها', value: 0 }]
          });
        }
      });
  });
};

interface IgetFactoryCars {
  limit: number;
  brand_id?: number;
}
