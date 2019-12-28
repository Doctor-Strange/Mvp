import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_USER = "/core/user/info";

export const REQUEST_getUser = (data: IgetUser) => {
  console.log(
    DOMAIN +
      GET_USER +
      (data.id ? "?id=" + data.id : "?username=" + data.username)
  );
  
  return new Promise((resolve, reject) => {
    axios
      .post(
        DOMAIN +
          GET_USER +
          (data.id ? "?id=" + data.id : "?username=" + data.username)
      )
      .then(response => {
        console.log(response)
        if (response.data.success) {
          resolve(response.data.data);
        } else {
          reject(false);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

interface IgetUser {
  id?: string;
  username?: string;
}
