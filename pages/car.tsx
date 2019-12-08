import * as React from 'react';
import NextSeo from 'next-seo';
import { Section } from '../src/components/row/Sections';
import Layout from '../src/components/Layout';
import SetCarTimingForm from '../src/components/Forms/SetCarTimingForm';
import { Box, Flex } from '@rebass/grid';
import { Icon, Segment, Button, Popup } from 'semantic-ui-react';
import Router from 'next/router';
import Carousel from 'nuka-carousel';
import { PriceCard, UserCard, ContentCard, ContentSideCard } from '../src/components/Cards';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../src/utils/numbers';

import { CommentSection } from '../src/components/Comments'
import { Details, CarNav, CarSideCard } from '../src/components/Car';
import { i18n, withTranslation } from '../src/i18n';
import { REQUEST_getCar } from '../src/API';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import styled from 'styled-components';
import axios from 'axios';
import jsCookie from 'js-cookie';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });
import { toast } from 'react-toastify';
import LoginModal from '../src/components/Modals/LoginModal'
import Slider  from '../src/components/Slider/Slider';


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


const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 61px;
  height: 42px;
  color: #666;
div {
  position: absolute;
  top: 7px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #666;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
}`

export default class extends React.Component<{ t: any,isAllowed?:any, rentalCarID: number, start_date: any, end_date: any, search_id: string }> {

    static async getInitialProps(props) {
        if (typeof window === 'undefined') {
            //console.log('Server Side Router Query', props.query);
        } else {
            //console.log('Client side Router Query', props.query);
        }
        let res;
        if (props.query.search_id)
            res = await REQUEST_getCar({
                search_id: props.query.search_id,
            });
        else if (props.query.id)
        // console.log("props.query.notAllowed", props.query.notAllowed)
            res = await REQUEST_getCar({
                id: props.query.id,
            });
            // console.log(props.query.id)
        return {
            // namespacesRequired: ['common'],
            rentalCarID: props.query.id,
            isAllowed:props.query.notAllowed,
            // start: props.query.start,
            // end: props.query.end,
            search_id: props.query.search_id,
            ...res
        };
    }

    state = {
        load:false,
        carousel: false,
        token: '',
        error: '',
        media_set: [],
        avg_price_per_day: null,
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
        car: {},
        loaded: false,
        hideTheseGuys: false,
        onRef: () => { },
      heightController:0,
    };

    mileage_ranges = ['۰ - ۵۰٫۰۰۰ کیلومتر',
        '۵۰٫۰۰۰ - ۱۰۰٫۰۰۰ کیلومتر',
        '۱۰۰٫۰۰۰ - ۲۰۰٫۰۰۰ کیلومتر',
        '+۲۰۰٫۰۰۰  کیلومتر']


    doRef = ref => {
        this.loginmodal = ref;
    };

    updateInfo = () => { }

    componentWillUnmount() {
        this.state.onRef(undefined);
    }

    componentDidMount() {
        this.state.onRef(this);
        if (window.location.search === "") {
            this.setState({ hideTheseGuys: true, })
        }
        this.setState({
            carousel: true
        })
        setTimeout(() => {
            // trying to solve slider issues
            window.dispatchEvent(new Event('resize'));
        }, 0);
    }

    // componentWillReceiveProps = () =>{
    //     // console.log('componentWillReceiveProps');
    // }

    // doRef = ref => {
    //     this.loginmodal = ref;
    //   };

    //   updateInfo = () => { }

    reserve(search_id) {
        // if (!jsCookie.get('token')) {
        //     localStorage["URL"] = Router.router.asPath
        //     this.loginmodal.handleOpenModal(); // do stuff

        // } else if (!jsCookie.get('first_name')) {
        //     toast.error('ثابت نام خود را کامل کنید', {
        //         position: "bottom-center",
        //         autoClose: 3000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true
        //     });
        //     Router.push({ pathname: '/complete-register' })
        // } else {
            // const { search_id, rentalCarID } = this.props;
            this.setState({
                load:true
            })
            let href = "";
            if (search_id) {
                href = `/checkout?search_id=${search_id}`;
            } else href = `/checkout`
            // const as = `/checkout/${rentalCarID}/${search_id}`;
            Router.push(href);
        // }
    }

    setheightController= (a) =>{
        a.persist()
        let w = a.target.naturalWidth; 
        let h = a.target.naturalHeight;
        if(w/h < 1.2){
          this.setState({
            heightController  :w/h*80
          })
        }
        if(w/h < 0.9){
          this.setState({
            heightController :w/h*110
          })
        }      
      }

    render() {
        console.log("this. props ====> ", this.props)
        const { t, start_date, end_date, search_id, isAllowed } = this.props;
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
        // console.log("this.props",
        // this.props)
        const { media_set, year, mileage_range, owner, body_style, color, color_code, cylinder, value,
            deliver_at_renters_place, cancellation_policy, transmission_type, location, facility_set,
            max_km_per_day, description, capacity, extra_km_price, car, loaded, avg_price_per_day, avg_discounted_price_per_day } = this.props;
        let metaImagesArr = [];
        media_set.length >= 1 ? media_set.map((value, index) =>
            metaImagesArr.push({
                url: value,
                alt: 'Og Image Alt',
            })
        ) : null
        // console.log(this.props)
        return (
            <Layout haveSubHeader={true} pageTitle={'list Your Car'}>
                <LoginModal onRef={this.doRef} updateInfo={this.updateInfo} />

                <NextSeo
                    config={{
                        title: `اجاره ${car.brand.name.fa} ${car.name.fa} در اتولی`,
                        description: description ? description : "همین حالا اجاره کنید",
                        openGraph: {
                            title: `اجاره ${car.brand.name.fa} ${car.name.fa} در اتولی`,
                            description: description ? description : "همین حالا اجاره کنید",
                            images: metaImagesArr,
                            site_name: 'اتولی',
                        },
                        twitter: {
                            handle: '@otoli_net',
                            site: '@otoli_net',
                            cardType: 'summary_large_image',
                        },
                    }}
                />
                {isMobile &&  start &&
                    <CarNav startDate={start} endDate={end} />
                }
                 {this.state.carousel
                ?<Slider Feed={media_set} alt = {`${car.brand.name.fa} ${car.name.fa}`}/>
                :
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "16%",
                                paddingBottom: "12%",
                                marginBottom: "24px",
                                color: "#bdbdbd",
                                outline: "none",
                                transition: "border 0.24s ease-in-out",
                                borderRadius: "0.28571429rem",
                            }}>
                                <Spinner ><div></div><div></div><div></div><div></div></Spinner>
                            </div>
                 }
                {/* <div className="hero_mother">
                    <div className="hero_in hotels_detail" style={{ maxWidth: '1111px', 
                    background: media_set.length > 1 ? "#E6E6E6" : '##fafafa' }}>
                        {media_set.length > 1 ? 
                            this.state.carousel
                            ? <Carousel
                                heightMode="current"
                                initialSlideWidth={isBrowser ? 970 : undefined}
                                renderCenterLeftControls={({ previousSlide }) => (
                                    media_set.length > 1 ? <button
                                        onClick={previousSlide}
                                        aria-label="next"
                                        style={{
                                            border: '0px',
                                            background: 'rgba(0, 0, 0, 0.4)',
                                            color: 'white',
                                            padding: '10px',
                                            opacity: '1',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Icon name="angle left" />
                                    </button>
                                        : null
                                )}
                                renderCenterRightControls={({ nextSlide }) => (
                                    media_set.length > 1 ? <button
                                        onClick={nextSlide}
                                        aria-label="next"
                                        style={{
                                            border: '0px',
                                            background: 'rgba(0, 0, 0, 0.4)',
                                            color: 'white',
                                            padding: '10px',
                                            opacity: '1',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Icon name="angle right" />
                                    </button>
                                        : null
                                )}
                            >
                                {(media_set.length >= 1) ? media_set.map((value, index) =>
                                    <img key={index} src={value} />
                                ) : null}
                            </Carousel>
                            :
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "20%",
                                marginBottom: "24px",
                                color: "#bdbdbd",
                                outline: "none",
                                transition: "border 0.24s ease-in-out",
                                borderRadius: "0.28571429rem",
                            }}>
                                <Spinner >در حال بارگذاری<div></div><div></div><div></div><div></div></Spinner>
                            </div>
                        :this.state.carousel ? <img 
                        onLoad = {(a)=>{this.setheightController(a)}}
                        style={{
                            position: 'absolute',
                            top:"-"+this.state.heightController+"px"
                            ,right: '0',width: '100%',}}
                             src={media_set[0]} alt="تصویر اسلایدر"/>:
                             <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "20%",
                                marginBottom: "24px",
                                color: "#bdbdbd",
                                outline: "none",
                                transition: "border 0.24s ease-in-out",
                                borderRadius: "0.28571429rem",
                            }}>
                                <Spinner >در حال بارگذاری<div></div><div></div><div></div><div></div></Spinner>
                            </div>}
                    </div>
                </div> */}

                <Section justifyCenter={true} style={{ marginTop: '24px', zIndex: '2', position: 'relative' }}>
                    {isBrowser &&
                        <ContentSideCard shareBar={true} pushTopMargin={true}>
                            <CarSideCard
                            allow = {isAllowed}
                        loading = {this.state.load}

                                // date={{
                                //     start: startDate,
                                //     end: endDate
                                // }}
                                start= {start}
                                    end= {end}
                                price={avg_discounted_price_per_day}
                                user={{
                                    id: owner.id,
                                    name: owner.name,
                                    image_url: owner.image_url,
                                    username: owner.username,
                                    first_name: owner.first_name,
                                    last_name: owner.last_name,
                                    company_name: owner.company_name
                                }}
                                reserveFunction={() => { this.reserve(search_id) }}
                            />
                        </ContentSideCard>
                    }
                    <ContentCard style={{ top: '-30px' }}>
                        ‍<ContentCardTitle>
                            {/* commented by sajad 980609======> */}
                            {isMobile && avg_discounted_price_per_day > 0 && !this.state.hideTheseGuys ?
                                <PriceCard style={{
                                    display: 'inline-grid',
                                    left: '10px',
                                    top: '-15px',
                                    position: 'absolute'
                                }} number={avg_discounted_price_per_day}>در روز</PriceCard>
                                : null
                            }
                            {/* =====> */}
                            {/* <div className="cat_star">
                                <i className="icon_star" /><i className="icon_star" /><i className="icon_star"></i
                                ><i className="icon_star" />
                            </div> */}
                            <h1 style={{ fontSize: '22px' }}>{`${car.brand.name.fa} ${car.name.fa}`}</h1>
                            <span>{year.fa}</span> <br />
                            {/* <a
                                className="address"
                                href="https://www.goog504327!2d48.8568361"
                            >۱۰ سفر  با امتیاز پنج ستاره</a
                            > */}
                        </ContentCardTitle>
                        <hr />
                        <Details title="محل خودرو و تحویل">
                            <p>{convertNumbers2Persian(location.name.breadcrumb_fa)}</p>
                            <p>{deliver_at_renters_place ? "در محدوده تهران، خودرو در محل شما تحویل می‌شود." : ""}</p>
                        </Details>
                        <Details title="محدودیت مسافت">
                            <ul className="">
                                <li>{max_km_per_day ? convertNumbers2Persian(max_km_per_day) + "کیلومتر" : "ندارد"}</li>
                                <li>{extra_km_price ? `هزینه هر کیلومتر اضافه ${convertNumbers2Persian(numberWithCommas(extra_km_price))} تومان` : ""}</li>
                            </ul>
                        </Details>
                        <Details title="توضیحات">
                            <pre>
                            {description ? description : "ندارد"}
                            </pre>
                        </Details>
                        <Details title="مشخصات فنی">
                            <ul className="bullets">
                                <li>نوع بدنه: {body_style.fa}</li>
                                <li>گیربکس: {transmission_type.fa}</li>
                                {/* changed in 980528 by sajad bug fix */}
                                {cylinder && <li>سیلندر: {cylinder.name.fa} </li>}
                                <li>کارکرد: {mileage_range ? this.mileage_ranges[mileage_range.id - 1] : "صفر کیلومتر"}</li>
                                {/* {value  && <li>ارزش خودرو: {
                                    convertNumbers2Persian(numberWithCommas(value))
                                } تومان</li>} */}
                                <li>ظرفیت: {convertNumbers2Persian(capacity)}</li>
                            </ul>
                        </Details>
                        <Details title="امکانات">
                            <div className="row">
                                <div className="col-6">
                                    <ul className="bullets">
                                        {/* {console.log("facility_set",facility_set)} */}
                                        {facility_set.map((value, index) => (<li>{value.name}</li>))}
                                    </ul>
                                </div>
                                {/* <div className="col-6">
                                    <ul className="bullets">
                                        <li>ماساژور صندلی</li>
                                        <li>دنده ۲۳تایی</li>
                                        <li>آب‌سرد کن</li>
                                        <li>نون گرم </li>
                                    </ul>
                                </div> */}
                            </div>
                        </Details>
                        {/* <Details title="کارکرد">
                            {mileage_range ? this.mileage_ranges[mileage_range.id + 1] : "صفر کیلومتر"}
                            </Details> */}
                        <Details title="شرایط اجاره و کنسلی">
                            <pre>
                            {cancellation_policy ? cancellation_policy : "ندارد"}
                            </pre>
                        </Details>
                        {isMobile &&
                            <div style={{ margin: '10px auto', direction: 'ltr' }}>
                                <UserCard
                                    id={owner.id}
                                    company_name={owner.company_name}
                                    firstname={owner.first_name}
                                    lastname={owner.last_name}
                                    username={owner.username}
                                    responceTime="میانگین زمان پاسخگویی: نامشخص"
                                    image={owner.image_url}
                                />
                            </div>
                        }
                    </ContentCard>
                </Section>
                <CommentSection />
                {isMobile && !this.state.hideTheseGuys && isAllowed !== "true" ?
                    this.props.owner.id.toString() !== jsCookie.get('user_id') ? <Button
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
                        loading = {this.state.load}
                        onClick={
                            () => this.reserve(search_id)
                        }
                        className="btn_1 full-width CONTINUE_TO_RENT_CAR"
                    >
                        تکمیل درخواست اجاره
                        
                        {/* <br/><small style={{
                            marginTop: '8px',
                            display: 'block',
                        }}>.دراین مرحله هزینه‌ای اخذ نمی‌شود</small> */}

                    </Button> : null
                    : null
                }
            </Layout >
        );
    }
}
