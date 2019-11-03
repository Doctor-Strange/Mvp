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

      async function fetchAPI() {
        //  commented by sajad 980610 ====>
        // const res = await REQUEST_getOrderRequest({ token: jsCookie.get('token'), id  });
        // setRequest(res);
        // ===>
        REQUEST_getOrderRequest({ token: jsCookie.get('token'), id  })
        .then(res=>{
          setRequest(res);
        })
        .catch(e=>{
          // console.log(e)
          setRequest({success: false})
        })
    }

    useEffect(() => {
        fetchAPI();
    }, []);

    const rentDump = request? request.success? request.data.rent_search_dump : {} :null;
    return (
        <Layout haveSubHeader={true} pageTitle={'Hello World'}>
            <Section justifyCenter={true}>
                <ThePage>
                    {request ?
                    request.success?
                      <BoxCard>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                            <circle className="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                            <polyline className="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                        </svg>
                        <div style={{textAlign:'center'}}>
                            <h1 className="center">پرداخت با موفقیت انجام شد</h1>
                            {console.log(request.data.rent_search_dump.media_set[0].url)}
                            <img src={request.data.rent_search_dump.media_set[0].url}/>
                            <h2 className="center">{rentDump.car.name.fa}</h2>
                            <h3 className="center">{rentDump.owner.name}</h3>
                            <br/>
                        </div>
                         <List>
                            <li>هزینه پرداختی
                                <span className="float-left">
                                  {convertNumbers2Persian(numberWithCommas(rentDump.discounted_total_price))} تومان
                                </span>
                             </li>
                             <li>محل تحویل
                                     <span className="float-left">
                                     {rentDump.deliver_at_renters_place ? "در محدوده تهران، خودرو در محل شما تحویل می‌شود." 
                                     : convertNumbers2Persian(rentDump.location.name.fa)}
                                 </span>
                             </li>
                             <li>از <span className="float-left">
                              {convertNumbers2Persian(
                                moment(rentDump.start_date, 'jYYYY/jMM/jDD')
                                .format('jD jMMMM jYYYY')
                              )}
                              </span></li>
                             <li>تا <span className="float-left">
                             {convertNumbers2Persian(
                                moment(rentDump.end_date, 'jYYYY/jMM/jDD')
                                .format('jD jMMMM jYYYY')
                              )}
                             </span></li>
                             <li>مدت زمان
                                     <span className="float-left">
                                     {convertNumbers2Persian(rentDump.no_of_days)}
                                     <span> روز </span>
                                 </span>
                             </li>
                             <li>محدودیت مسافت در روز 
                                <span className="float-left">
                                    {convertNumbers2Persian(rentDump.max_km_per_day)} کیلومتر
                                 </span>
                             </li>
                         </List>
                     </BoxCard>
                    :
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                          <circle className="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                          <line className="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
                          <line className="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
                      </svg>
                    :<p>در حال دریافت اطلاعات پرداخت...</p>}
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

