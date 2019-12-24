import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_ORDER_REQUESTS = "/core/rental-car/order/list";

export const REQUEST_getOrderRequests = (data: IgetOrderRequests) => {
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + GET_ORDER_REQUESTS + "?limit=50", null, {
        headers: {
          Authorization: "Bearer " + data.token
        }
      })
      .then(response => {
        if (response.data.success) {
          resolve(response.data);
        }
      })
      .catch(e => reject(e));
  });
};

interface IgetOrderRequests {
  token: string;
}
