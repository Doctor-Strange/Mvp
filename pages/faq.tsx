import * as React from 'react';
import NextSeo from 'next-seo';
import { Section } from '../src/components/row/Sections';
import Layout from '../src/components/Layout';
import SetCarTimingForm from '../src/components/Forms/SetCarTimingForm';
import { Box, Flex } from '@rebass/grid';
import { Icon, Segment, Button, Accordion } from 'semantic-ui-react';
import Router from 'next/router';
import Carousel from 'nuka-carousel';
import { PriceCard, UserCard, ContentCard, ContentSideCard} from '../src/components/Cards';
import { CommentSection } from '../src/components/Comments'
import { Details, CarNav, CarSideCard } from '../src/components/Car';
import { i18n, withTranslation } from '../src/i18n';
import { REQUEST_getFAQ } from '../src/API';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });

const ContentCardTitle = styled.div`
    margin-bottom: 25px;
    h1 {
    font-size: 32px;
    font-size: 2rem;
    margin: 0;
    }
    ul {
        float: right;
        margin: 10px 0 0 0;
        li {
            display: inline-block;
            margin-right: 20px;
            font-weight: 500;
        }
    }
`;

export default withTranslation('common')(
    class extends React.Component<{ t: any }> {

        static async getInitialProps(props) {
            if (typeof window === 'undefined') {
                //console.log('Server Side Router Query', props.query);
            } else {
                //console.log('Client side Router Query', props.query);
            }
            let res = await REQUEST_getFAQ();
            const qaArr1 = [];
            res.items[0].question_set.map((value, index) => { 
                qaArr1.push( {
                    key: `panel1-${index}`,
                    title: value.q,
                    content: value.a,
                });
            });
            const qaArr2 = [];
            res.items[1].question_set.map((value, index) => { 
                qaArr2.push( {
                    key: `panel2-${index}`,
                    title: value.q,
                    content: value.a,
                });
            });
            return {
                namespacesRequired: ['common'],
                qaArr1,
                qaArr2,
                ...res
            };
        }

        render() {
            const { t } = this.props;
            let start, end = null;
            let startDate, endDate = null;
            const { qaArr1,  qaArr2, } = this.props;
            //console.log(qaArr1);
            return (
                <Layout haveSubHeader={true} pageTitle={'list Your Car'}>
                    <NextSeo
                        config={{
                            title: `سوالات پرتکرار اتولی`,
                            description: "سوالات پرتکرار در اتولی را اکنون بخوانید",
                            openGraph: {
                                title: `سوالات پرتکرار اتولی`,
                                description: "سوالات پرتکرار در اتولی را اکنون بخوانید",
                            },
                            twitter: {
                                handle: '@otoli_net',
                                site: '@otoli_net',
                                cardType: 'summary_large_image',
                            },
                        }}
                    />
                    <Section justifyCenter={true} style={{ marginTop: '24px' }}>
                        
                       <ContentCard style={{ zIndex: 1}}>
                            ‍<ContentCardTitle>
                                 <h1 style={{ fontSize: '22px' }}>{`سوالات پرتکرار`}</h1>
                                <span> پاسخگوی تمام نیازهای شما </span>
                                <br />
                            </ContentCardTitle>
                            <Accordion styled fluid defaultActiveIndex={0} panels={qaArr1} />
                            <hr/>
                            <Accordion styled fluid defaultActiveIndex={0} panels={qaArr2} />
                        </ContentCard>
                    </Section>
                </Layout >
            );
        }
    }
);
