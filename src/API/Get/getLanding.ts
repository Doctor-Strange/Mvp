import axios from "axios";

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const GET_LANDING_PAGE = "/core/landing/get";

export const REQUEST_getLanding = (data: Iunique_id) => {
// console.log("data طططط", DOMAIN + GET_LANDING_PAGE + "?unique_id=" + encodeURI(data.name));

  return new Promise((resolve, reject) => {      
    axios
      .post(DOMAIN + GET_LANDING_PAGE + "?unique_id=" + encodeURI(data.name))
      .then(response => {
        // console.log(response.data);
        
        if (response.data.success) {
          resolve(response.data);
        } else {
          reject(false);
        }
      }).catch(e=>{
          console.log(e.response); 
      });
  });
};

interface Iunique_id {
  name?: any;
}

