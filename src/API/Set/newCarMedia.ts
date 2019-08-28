import axios from 'axios';

const DOMAIN = process.env.PRODUCTION_ENDPOINT;
const NEW_CAR_MEDIA = '/core/rental-car/media/new';

export const REQUEST_newCarMedia = (data: InewCarMedia) => {
  return new Promise((resolve, reject) => {
    const { 
        token,
        file
    } = data;
    // console.log(token)


    let form = new FormData();
            let imagedata = file;
            form.append("media", imagedata);
    // let form = new FormData();
    // form.append('media', file);
    axios
      .post(
        DOMAIN + NEW_CAR_MEDIA,form,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type':
              'application/x-www-form-urlencoded'
          },
          // data :{
          //   "media" :file 
          // }
        }
      )
      .then(response => {
        // console.log(response)
        if (response.data.success) {
          resolve(response.data);
        }
      })
      .catch(error => {
        console.log(error)
        reject(error.response);
      });
  });
};

interface InewCarMedia {
  token: string;
  file: any;
}
