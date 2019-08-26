import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_LOCATIONS = '/core/location/list';

export const REQUEST_getLocations = (data: IgetLocation) => {
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + GET_LOCATIONS + '?brief=' + data.brief)
      .then(response => {
        if (response.data.success) {
          const citiesFarsi = response.data.items.map((value, index) => ({
            key: value.id,
            text: value.name.fa,
            value: value.id
          }));
          const citiesEnglish = response.data.items.map((value, index) => ({
            key: value.id,
            text: value.name.en,
            value: value.id
          }));
          resolve({ citiesFarsi, citiesEnglish });
        }
      });
  });
};

interface IgetLocation {
  brief: boolean;
}
