import React, { useState, useEffect } from 'react';
import NextSeo from "next-seo";

import { Section } from '../src/components/row/Sections';
import Layout from '../src/components/Layout';
import SetCarTimingForm from '../src/components/Forms/SetCarTimingForm';
import { Box, Flex } from '@rebass/grid';
import { Icon, Segment, Button, Popup } from 'semantic-ui-react';
// import {Router} from '../routes';
import Router from 'next/router';

import { PriceCard, UserCard, CarCard, CarCardPlaceholder, BoxCard } from '../src/components/Cards'
import { Details, CarNav } from '../src/components/Car'
import { ShareBar } from '../src/components/ShareBar';
import { Formik, FormikActions, withFormik } from 'formik';
import { i18n, withTranslation } from '../src/i18n';
import { REQUEST_getUserCars, REQUEST_getUser } from '../src/API';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../src/utils/numbers';
import { ResultsCards } from '../src/components/Search';
import jsCookie from 'js-cookie';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment-jalaali';
import { log } from 'util';
moment.loadPersian({ dialect: 'persian-modern' });

interface IProfile {
    t: any;
    id: number;
    first_name?: string;
    last_name?: string;
    image_url?: string;
    username?: string;
    company_name?: string;
}

const Profile: React.SFC<IProfile> = ({ t, id, first_name, last_name, image_url, username, company_name }) => {
    const [results, setRresults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [own, setOwnership] = useState(false);

    async function fetchAPI() {
        setRresults([])
        setLoading(true);
        const res = await REQUEST_getUserCars({ id });
        setRresults(res);
        console.log(res)
        setLoading(false);
    }
    
    useEffect(() => {
        fetchAPI();
        if (jsCookie.get('user_id') == id) {
            setOwnership(true);
        }        
    }, []);
    return (
        <Layout haveSubHeader={true} pageTitle={'list Your Car'}>
            <NextSeo
            config={{
              title: `اجاره خودرو از ${company_name? company_name: first_name} ${company_name? "" :last_name} | اتولی`,
              description: " حساب کاربری",
              openGraph: {
                title: `اجاره خودرو از ${first_name} ${last_name} | اتولی`,
              description: " حساب کاربری",
              },
              twitter: {
                handle: "@otoli_net",
                site: "@otoli_net",
                cardType: "summary_large_image"
              }
            }}
          />
            {/* {isMobile &&
                <CarNav startDate={start_date} endDate={end_date} />
            } */}
            {/* {console.log(results)} */}
            <Section justifyCenter={true} style={{ marginTop: '24px' }} rowClassName="profile_page">
            
          <ResultsCards
                    t={t}
                    // own = {own}
                    fetchAPI = {fetchAPI}
                    results={results}
                    loadingResults={loading}
                    lodingMore={false}
                    noResult={false}
                    showMore={false}
                    dateURL={null}
                    colClass="col-lg-8"
                    marginClass=""
                    showInProfile={true}
                    userOwnPage={own ? true : false}
                />
                <aside className="col-lg-4" id="sidebar" >
                    <BoxCard style={{padding: '0px 15px 15px 15px'}}>
                        <div
                            className="score"
                        >
                        <UserCard
                            id={22}
                            style={{padding: '16px 25px 0px 25px'}}
                            firstname={first_name}
                            lastname={last_name}
                            username={username}
                            company_name={company_name}
                            showexit = {true}
                            responceTime="میانگین زمان پاسخگویی: نامشخص"
                            image={image_url}
                            own={own}
                            // onUpdate={({username = null, id = null}) => {
                            //     if(username){
                            //         // Router.pushRoute('profile_username', {username});
                            //         Router.push('/')
                            //     }
                            //     else {
                            //         // Router.pushRoute('profile_id', {id});
                            //         Router.push({
                            //             pathname: '/profile',
                            //             query: { id: id },
                            //           })
                            //     }
                            // }}
                        />
                        </div>
                        {/* <div
                                style={{ marginTop: '8px' }}
                                className="text-center"
                            >
                            </div> */}
                    </BoxCard>
                <ShareBar />
                </aside>
            </Section>
            {/* {(isMobile && own) &&
                <Button
                    style={{
                        zIndex: '55',
                        bottom: '0',
                        position: 'fixed',
                        borderRadius: '0',
                        margin: '0',
                        height: '56px'
                    }}
                    primary
                    type="submit"
                    className="btn_1 full-width"
                >
                    ویرایش پروفایل
            </Button> */}
        </Layout >
    );
}

Profile.getInitialProps = async (props) => {
    if (typeof window === 'undefined') {
        // console.log('Server Side Router Query', props.query);
    } else {
        // console.log('Client side Router Query', props.query);
    }
    const query =  props.query.id? {
        id: props.query.id
    } : {
        username: props.query.username
    }
    const resUser = await REQUEST_getUser(query)
    if(props.query.id && resUser.username && props.res){
        props.res.writeHead(302, {
            Location: '/@' + resUser.username
        })
        props.res.end()
    }
    return {
        namespacesRequired: ['common'],
        profileID: props.query.id,
        profileUsername: props.query.username,
        ...resUser
    };
}

export default withTranslation('common')(Profile);



