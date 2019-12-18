/* tslint:disable */
import * as React from 'react';
import { Message, Button } from 'semantic-ui-react';

const Error404: React.FunctionComponent<{ token: any; openModal?: any;}> = ({
  token,
  openModal
}) => {
  if (!token) {
    //console.log("user not logged in");
    if (openModal) {
      openModal();
    }
    return (
      <>
       <h4>لطفا برای مشاهده این صفحه وارد شوید</h4>
        <Button
          style={{ marginBottom: '20px' }}
          onClick={openModal}
          content='ورود'
          fluid
        />
      </>
    );
  }
  else return null;
};

export default Error404;
