import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Icon, Image, Item, Label, Segment, Card} from 'semantic-ui-react';
import { i18n, withTranslation } from '../../i18n';
import { REQUEST_newCarMedia } from '../../API';
import jsCookie from 'js-cookie';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone';

const DropZoneDiv = styled.section`
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  .dropzone {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-bottom: 24px;
    border-width: 2px;
    border-radius: 2px;
    border-color: #eeeeee;
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
    border-radius: 0.28571429rem;
    &:focus {
      border-color: #33acc1;
    }
  }
  .flexParentCards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    /* justify-content: space-between; */
    align-items: flex-start;
    .flexItem {
      margin: auto 8px;
      margin-top: -29px;
      margin-bottom: 16px;
    }
    i.delete.icon {
      margin: 0;
      display: table-cell;
    }
    .label {
      position: relative;
      bottom: -30px;
      right: -2px;
      z-index: 1;
      padding: 5px;
      font-size: 15px;
    }
  }
  .card {
    margin-top: 0;
    height: 100px !important;
    width: 150px !important;
    .image {
      height: 100px !important;
      width: 150px !important;
    }
  }
`;
const AddCarImageUpload: React.FC<{
  t: any;
  picturesID: any;
  setPicturesID: any;
  removePictureID: any;
}> = ({
  t,
  picturesID,
  setPicturesID,
  removePictureID,
}) => {
  const [picturesPreview, setPicturesPreview] = useState([]);
 const removePicture = (i) => {
    removePictureID(i);
    var picturesPreviewIndex = picturesPreview.indexOf(i);
    picturesPreview.splice(i, 1);
    // console.log(picturesID);
    setPicturesPreview(picturesPreview);
  }
  return (
    <Dropzone
    // onChange ={acceptedFiles => {
    //   acceptedFiles.forEach(file => {
    //     REQUEST_newCarMedia({ file, token: jsCookie.get('token') })
    //     .then(response => {
    //       picturesPreview.push(reader.result);

    //       console.log("picture Uploded successfully")
    //       setPicturesPreview(picturesPreview);
    //         picturesID.push(response.data.id);
    //         console.log("picturesID =>> ",picturesID)
    //         setPicturesID(picturesID);
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onabort = () =>
    //       // console.log('file reading was aborted');
    //     reader.onerror = () =>
    //       // console.log('file reading has failed');
    //     reader.onload = () => {
    //       // console.log('file reading was susceed',picturesPreview);
          
    //     };
    //   });
    // }}
      accept="image/jpeg, image/png, image/jpg"
      onDrop={acceptedFiles => {
        acceptedFiles.forEach(file => {
          REQUEST_newCarMedia({ file, token: jsCookie.get('token') })
          .then(response => {
            picturesPreview.push(reader.result);
            // console.log(picturesPreview)
            setPicturesPreview(picturesPreview);
              picturesID.push(response.data.id);
              // console.log("picturesID =>> ",picturesID)
              setPicturesID(picturesID);
          })
          .catch(error => {
            console.error(error);
          });
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onabort = () =>
            // console.log('file reading was aborted');
          reader.onerror = () =>
            // console.log('file reading has failed');
          reader.onload = () => {
            // console.log('file reading was susceed',picturesPreview);
            picturesPreview.push(reader.result);
            // console.log(picturesPreview)
            setPicturesPreview(picturesPreview);
          };
        });
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <DropZoneDiv
          className="container"
          style={{ padding: 0 }}
        >
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <span>{"جهت باگذاری عکس اینجا کلیک کنید و یا عکس خود را داخل این کادر بیاندازید"}</span>
          </div>
          <aside>
            <div className="flexParentCards">
              {picturesPreview.map(
                (image, index) => (
                  <div className="flexItem">
                    <Label
                      onClick={() =>
                        removePicture(index)
                      }
                      index={index}
                    >
                      <Icon name="delete" />
                    </Label>
                    <Card raised image={image} />
                  </div>
                )
              )}
            </div>
          </aside>
        </DropZoneDiv>
      )}
    </Dropzone>
  );
}

export default withTranslation('common')(AddCarImageUpload);
