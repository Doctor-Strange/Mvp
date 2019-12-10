import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_LANDING_PAGE = "/core/landing/get";

export const REQUEST_getLanding = (data: Iunique_id) => {

  return new Promise((resolve, reject) => {      
    axios
      .post(DOMAIN + GET_LANDING_PAGE + "?unique_id=" + encodeURI(data.name))
      .then(response => {

        if (response.data.success) {
          resolve(response.data);
        } else {
          reject(false);
        }
      }).catch(e=>{
          console.log(e); 
      });
  });
};

interface Iunique_id {
  name?: any;
}

