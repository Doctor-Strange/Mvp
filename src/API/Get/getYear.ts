import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_YEAR = "/core/year/list?limit=500";

export const REQUEST_GET_YEAR = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + GET_YEAR)
      .then(response => {
        if (response.data.success) {
          const yearsFarsi = response.data.items.map((value, index) => ({
            key: value.id,
            text: value.name.fa,
            value: value.id
          }));
          resolve(yearsFarsi);
        } else {
          reject(false);
        }
      })
      .catch(err => {
        console.warn("Get years failed: ", err.message);
      });
  });
};
