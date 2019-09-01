import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_ORDER_REQUEST = '/core/rental-car/order/get';

export const REQUEST_getOrderRequest = (data: IgetOrderRequest) => {
  return new Promise((resolve, reject) => {
    const { 
        token,
        id
      } = data;
    axios
      .post(DOMAIN + GET_ORDER_REQUEST,
        {id}, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        if (response.data.success) {
          resolve(response.data);
        }
      })
      .catch(e => {
        reject(e)
      });
  });
};

interface IgetOrderRequest {
  token: string;
  id: string | number;
}
