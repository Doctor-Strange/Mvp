import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const SET_CAR_COUPAN = 'https://core.otoli.net/admin/core/coupon/add';

export const REQUEST_setCarCoupan = (inputData: IsetCarDiscount) => {
  return new Promise((resolve, reject) => {
    const { 
        token,
        coupan,
    } = inputData;
    axios
      .post(
        DOMAIN + SET_CAR_COUPAN,
        {
            coupan
        },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      .then(response => {
          console.log("response",response);
          
        if (response.data.success) {
          resolve(response.data.success);
        }
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

interface IsetCarDiscount {
  token: string;
  coupan: string | number;
  data: string;
}
