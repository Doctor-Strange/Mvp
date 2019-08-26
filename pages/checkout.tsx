import * as React from 'react';

import { Section } from '../src/components/row/Sections';
import Layout from '../src/components/Layout';
import SetCarTimingForm from '../src/components/Forms/SetCarTimingForm';
import { Box, Flex } from '@rebass/grid';
import { Icon, Segment, Button, Popup, Grid } from 'semantic-ui-react';
import Router from 'next/router';
import Carousel from 'nuka-carousel';
import { ContentCard, ContentSideCard } from '../src/components/Cards';
import { Details, CarNav } from '../src/components/Car';
import { List } from '../src/components/List';
import { i18n, withTranslation } from '../src/i18n';
import { connect } from '../src/store';
import { REQUEST_getCar, REQUEST_newRentRequest } from '../src/API';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../src/utils/numbers';
import { LongDate, ShortDate } from '../src/utils/date';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import jsCookie from 'js-cookie';
import styled from 'styled-components';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
import swal from '@sweetalert/with-react'


export default withTranslation('common')(
    class extends React.Component<{
        t: any, rentalCarID: number, start: any, end: any, search_id: string, user: any
    }> {

        static async getInitialProps(props) {
            if (typeof window === 'undefined') {
                //console.log('Server Side Router Query', props.query);
            } else {
                //console.log('Client side Router Query', props.query);
            }
            try {
                const res = await REQUEST_getCar({
                    search_id: props.query.search_id
                })
                return {
                    namespacesRequired: ['common'],
                    search_id: props.query.search_id,
                    ...res
                };
            }
            catch (error) {
                console.error(error);
            }
        }

        state = {
            error: '',
            media_set: [],
            year: {},
            mileage_range: {},
            owner: {},
            body_style: {},
            color: {},
            color_code: null,
            deliver_at_renters_place: null,
            cancellation_policy: null,
            transmission_type: {},
            location: {},
            max_km_per_day: null,
            description: null,
            capacity: null,
            extra_km_price: null,
            facility_set: [],
            discount_percent: null,
            discounted_total_price: null,
            total_price: null,
            avg_price_per_day: null,
            car: {},
            no_of_days: null,
            loaded: false,
            openModal: () => (null)
        };


        doRef = ref => {
            if (ref) {
                this.header = ref;
                this.setState({ openModal: this.header.onClick })
            }
        };

        mileage_ranges = ['۰ - ۵۰٫۰۰۰ کیلومتر',
            '۵۰٫۰۰۰ - ۱۰۰٫۰۰۰ کیلومتر',
            '۱۰۰٫۰۰۰ - ۲۰۰٫۰۰۰ کیلومتر',
            '+۲۰۰٫۰۰۰  کیلومتر']

        componentDidMount() {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 0);
            //get car info
            this.setState({ ...this.props });
        }

        showError(text) {
            swal(
                <div>
                    <h1>خطایی غیرمنتظره رخ داد</h1>
                    <span>{text}</span>
                </div>,
                {
                    button: {
                        text: "بستن",
                        closeModal: true,
                    },
                }
            );
        }

        async reserve(search_id) {
            // check if user is logged in, if its not, open login modal
            if (!jsCookie.get('token')) {
                this.state.openModal();
                return;
            }
            try {
                const res = await REQUEST_newRentRequest({
                    search_id,
                    token: jsCookie.get('token')
                })
                if (res) {
                    Router.push({
                        pathname: '/requests',
                        query: {
                            id: search_id
                        }
                    });
                }
            }
            catch (error) {
                //console.log(error.data);
                this.showError(error.data.message);
            }
        }

        render() {
            const { t, start_date, end_date, search_id } = this.props;
            let start, end = null;
            let startDate, endDate = null;
            //console.log(start_date);
            if (start_date && end_date) {
                startDate = moment(start_date, 'jYYYY/jMM/jDD');
                endDate = moment(end_date, 'jYYYY/jMM/jDD');
                //console.log(startDate);
            }
            if (startDate && endDate) {
                start = moment(startDate).format('jD jMMMM jYY');
                end = moment(endDate).format('jD jMMMM jYY');
                //console.log(start);
            }
            const { media_set, year, mileage_range, owner, body_style, color, color_code,
                deliver_at_renters_place, cancellation_policy, transmission_type, location, facility_set,
                max_km_per_day, description, capacity, extra_km_price, car, loaded, discount_percent,
                discounted_total_price, total_price, avg_price_per_day, no_of_days, avg_discounted_price_per_day} = this.props;
            if (loaded) {
                return (
                    <Layout haveSubHeader={true} pageTitle={'list Your Car'} onRef={this.doRef}>
                        <Section id="checkout" justifyCenter={true} style={{ marginTop: '24px', marginBottom: '50px' }}>
                            <ContentSideCard>
                                <List boldLastItem={true}>
                                    <li>قیمت روزانه
                                            <span className="float-left">
                                            <span>{convertNumbers2Persian(numberWithCommas(avg_discounted_price_per_day))}</span>
                                            {' '}
                                            <span> تومان </span>
                                        </span>
                                    </li>
                                    <li>از <span className="float-left">{LongDate(startDate)}</span></li>
                                    <li>تا <span className="float-left">{LongDate(endDate)}</span></li>
                                    <li>مدت زمان
                                            <span className="float-left">
                                            {convertNumbers2Persian(no_of_days)}
                                            <span> روز </span>
                                        </span>
                                    </li>
                                    <li>هزینه کل
                                            <span className="float-left">
                                            <span>{convertNumbers2Persian(numberWithCommas(discounted_total_price || 0))}</span>
                                            <span> تومان </span>
                                        </span>
                                    </li>
                                    {/* {discount_percent &&
                                        <li> هزینه پس از کاستن تخفیف
                                                <span className="float-left">
                                                <span>{convertNumbers2Persian(numberWithCommas(discounted_total_price || 0))}</span>
                                                <span> تومان </span>
                                            </span>
                                        </li>
                                    } */}
                                </List>
                                {isBrowser && <>
                                    <br />
                                    <Button
                                        style={{ height: '48px' }}
                                        size='large'
                                        fluid
                                        onClick={() => {
                                            this.reserve(search_id);
                                        }}
                                        color='teal'>ثبت درخواست</Button>
                                    <div
                                        style={{ marginTop: '8px' }}
                                        className="text-center"
                                    >
                                        <small>دراین مرحله هزینه‌ای اخذ نمی‌شود.</small>
                                    </div>
                                </>
                                }
                            </ContentSideCard>
                            <ContentCard>
                                <Grid>
                                    <Grid.Row columns={2} centered className="property">
                                        <Grid.Column width={9} className="right" style={{ paddingRight: '0' }}><div>
                                            <h1 style={{ fontSize: '20px', textAlign: 'right', paddingBottom: '8px' }}>
                                                {`${car.brand.name.fa} ${car.name.fa}`}
                                            </h1>
                                            <br />
                                            {/* <DateGrid start={startDate} end={endDate} /> */}
                                            {/* <span>{year.fa}</span> <br /> */}
                                        </div>
                                            <Details title="محل خودرو" showHr={false}>
                                                <p>{location.name.breadcrumb_fa}</p>
                                                <p>{deliver_at_renters_place ? "تحویل در محل شما" : ""}</p>
                                            </Details>
                                            <Details title="قوانین کنسلی" showHr={false}>
                                                {cancellation_policy ? cancellation_policy : "ندارد"}
                                            </Details>
                                            <Details title="محدودیت مسافت" showHr={false}>
                                                <ul className="">
                                                    <li>{max_km_per_day ? max_km_per_day + "کیلومتر" : "ندارد"}</li>
                                                    <li>{extra_km_price ? `هزینه هر کیلومتر اضافه ${extra_km_price} هزار تومان` : ""}</li>
                                                </ul>
                                            </Details>
                                            <Details title="توضیحات" showHr={false}>
                                                {description ? description : "ندارد"}
                                            </Details>
                                        </Grid.Column>
                                        <Grid.Column width={6} className="left" style={{ padding: '0' }}>
                                            {(media_set.length >= 1)
                                                ? <img key="1" src={media_set[0]} style={{ width: '100%' }} />
                                                : <img src="https://i.kinja-img.com/gawker-media/image/upload/s--8Dk6Uk5v--/c_scale,f_auto,fl_progressive,q_80,w_800/qssqrb3mvffcipwl9jn0.jpg" />
                                            }
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </ContentCard>>

                        </Section>
                        {isMobile &&
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
                                onClick={
                                    () => this.reserve(search_id)
                                }
                                className="btn_1 full-width"
                            >
                                ثبت درخواست
                            </Button>
                        }
                    </Layout >
                );
            }
            else {
                return (
                    <></>
                )
            }

        }
    }
);