import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Icon, Image, Item, Label, Message} from 'semantic-ui-react'
import { Section } from '../src/components/row/Sections';
import IndexForm from '../src/components/Forms/IndexForm';
import { BoxCard } from '../src/components/Cards';
import { List } from '../src/components/List';
import Layout from '../src/components/Layout';
import { REQUEST_getOrderRequest } from '../src/API';
import jsCookie from 'js-cookie';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../src/utils/numbers';
import { Box, Flex } from '@rebass/grid';
import { i18n, Link, withTranslation } from '../src/i18n';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });
import { ITheme } from "../src/theme/Interfaces";

const ThePage = styled.div`
margin-top: ${({theme}:{theme:ITheme}) => theme.spacing.largePadding};
width: 100%;
svg {
  width: 100px;
  display: block;
  margin: 0px auto 24px;
}

.path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  &.circle {
    -webkit-animation: dash .9s ease-in-out;
    animation: dash .9s ease-in-out;
  }
  &.line {
    stroke-dashoffset: 1000;
    -webkit-animation: dash .9s .35s ease-in-out forwards;
    animation: dash .9s .35s ease-in-out forwards;
  }
  &.check {
    stroke-dashoffset: -100;
    -webkit-animation: dash-check .9s .35s ease-in-out forwards;
    animation: dash-check .9s .35s ease-in-out forwards;
  }
}

p {
  text-align: center;
  margin: 20px 0 60px;
  font-size: 1.25em;
  &.success {
    color: #73AF55;
  }
  &.error {
    color: #D06079;
  }
}


@-webkit-keyframes dash {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@-webkit-keyframes dash-check {
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
}

@keyframes dash-check {
  0% {
    stroke-dashoffset: -100;
  }
  100% {
    stroke-dashoffset: 900;
  }
}

.booking {
    margin-top: 32px;
    max-width: 100%;
    width: 375px;
}

h1 {
    font-size: 24px;
    margin-bottom: 32px;
}

h3 {
    margin-top: 8px;
}

.center {
    text-align: center;
}

img{
    max-width:100%;
    width: 260px;
    border-radius: 4px;
    margin-bottom: 8px;
}
`;

const Page = ({id}) => {

    const [request, setRequest] = useState(null);

    //   async function fetchAPI() {
    //     //  commented by sajad 980610 ====>
    //     // const res = await REQUEST_getOrderRequest({ token: jsCookie.get('token'), id  });
    //     // setRequest(res);
    //     // ===>
    //     REQUEST_getOrderRequest({ token: jsCookie.get('token'), id  })
    //     .then(res=>{
    //       setRequest(res);
    //     })
    //     .catch(e=>{
    //       // console.log(e)
    //       setRequest({success: false})
    //     })
    // }

    useEffect(() => {
        // fetchAPI();
    }, []);

    const rentDump = request? request.success? request.data.rent_search_dump : {} :null;
    return (
        <Layout haveSubHeader={true} pageTitle={'Hello World'}>
            <Section justifyCenter={true} style={{minHeight: "400px"}}>
                <ThePage>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                          <circle className="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                          <line className="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
                          <line className="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
                      </svg>
                      <p>انصراف از پرداخت</p>
                </ThePage>
            </Section>
        </Layout>
    );
}


Page.getInitialProps = async (props) => {
  return {
    namespacesRequired: ['common'],
    id: props.query.id,
  };
}

export default withTranslation('common')(Page);

