import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_FACTORY_BRANDS = '/core/brand/list';

export const REQUEST_getFactoryBrands = (data: IgetFactoryBrands) => {
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + GET_FACTORY_BRANDS + '?limit=' + data.limit)
      .then(response => {
        if (response.data.success) {
          const brandsFarsi = response.data.items.map((value, index) => ({
            key: value.id,
            text: `${value.name.fa} - ${value.name.en}`,
            value: value.id
          }));
          const brandsEnglish = response.data.items.map((value, index) => ({
            key: value.id,
            text: value.name.en,
            value: value.id
          }));
          resolve({ brandsEnglish, brandsFarsi, brandLoading: false });
        }
      });
  });
};

interface IgetFactoryBrands {
  limit: number;
}
