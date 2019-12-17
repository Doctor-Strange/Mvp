import * as React from "react";
import NextSeo from "next-seo";

import { Section } from "../src/components/row/Sections";
import Layout from "../src/components/Layout";
import SetCarTimingForm from "../src/components/Forms/SetCarTimingForm";
import { Box, Flex } from "@rebass/grid";
import { Icon, Segment, Button, Popup, Grid } from "semantic-ui-react";
import Router from "next/router";
import Carousel from "nuka-carousel";
import { ContentCard, ContentSideCard } from "../src/components/Cards";
import { Details, CarNav } from "../src/components/Car";
import { List } from "../src/components/List";
import { i18n, withTranslation } from "../src/i18n";
import { connect } from "../src/store";
import { REQUEST_getCar, REQUEST_newRentRequest,REQUEST_setCarCoupan } from "../src/API";
import {
  numberWithCommas,
  convertNumbers2Persian,
  convertNumbers2English
} from "../src/utils/numbers";
import { LongDate, ShortDate } from "../src/utils/date";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import jsCookie from "js-cookie";
import styled from "styled-components";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
import swal from "@sweetalert/with-react";
import Insurance from '../src/components/insurance/Insurance'
import { toast } from "react-toastify";
import axios from "axios";

export default withTranslation("common")(
  class extends React.Component<{
    t: any;
    rentalCarID: number;
    start?: any;
    end?: any;
    search_id: string;
    user: any;
  }> {
    static async getInitialProps(props) {
      if (typeof window === "undefined") {
        //console.log('Server Side Router Query', props.query);
      } else {
        //console.log('Client side Router Query', props.query);
      }
      try {
        const res = await REQUEST_getCar({
          search_id: props.query.search_id
        });
        return {
          namespacesRequired: ["common"],
          search_id: props.query.search_id,
          ...res
        };
      } catch (error) {
        console.error(error);
      }
    }

    state = {
      error: "",
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
      insurance: true,
      openModal: () => null,
      heightController:0,
      loading:false,
      coupon_code:false,
      coupan:"",
      CoupanErr:null,
      coupanPrice:0,
    };

    doRef = ref => {
      if (ref) {
        this.header = ref;
        this.setState({ openModal: this.header.onClick });
      }
    };

    mileage_ranges = [
      "۰ - ۵۰٫۰۰۰ کیلومتر",
      "۵۰٫۰۰۰ - ۱۰۰٫۰۰۰ کیلومتر",
      "۱۰۰٫۰۰۰ - ۲۰۰٫۰۰۰ کیلومتر",
      "+۲۰۰٫۰۰۰  کیلومتر"
    ];

    componentDidMount() {
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
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
            closeModal: true
          }
        }
      );
    }

    async reserve(search_id) {
      // check if user is logged in, if its not, open login modal
      if (!jsCookie.get("token")) {
        localStorage["URL"] =Router.router.asPath
        this.state.openModal();
        return;
      }
      try {
        this.setState({
          loading:true
          })
        const res = await REQUEST_newRentRequest({
          search_id,
          has_insurance:this.state.insurance,
          token: jsCookie.get("token"),
          coupon_code : this.state.coupan
        });
        if (res) {
        toast.success("درخواست شما ثبت شد. اجاره‌ دهنده پس از بررسی، درخواست را قبول یا رد خواهد کرد. نتیجه را از طریق پیامک به اطلاعتان می‌رسانیم.", {
          position: "bottom-center",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true
        });
          Router.push({
            pathname: "/requests",
            query: {
              id: search_id
            }
          });
        }
      } catch (error) {
        this.setState({
          loading:false
          })
        //console.log(error.data);
        this.showError(error.data.message);
      }
    }
    insuranceCalculator = (e) => {
      if (e)
        this.setState({
          insurance: true
        })
      else {
        this.setState({
          insurance: false
        })
      }
      // data ? this.setState({
      //   insurance
      // })
      // :
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

    CoupanController = (e,search_i) =>{
      e.preventDefault();
      const DOMAIN = process.env.PRODUCTION_ENDPOINT;
      const SET_CAR_COUPAN = '/core/rental-car/search-for-rent/get';
      let coupan= this.state.coupan;
      let token=jsCookie.get("token")
      // console.log("token",DOMAIN + SET_CAR_COUPAN + '?' + `search_id=${search_i}` + `&coupon_code=` + coupan);
      // return
      axios
      .get(
        DOMAIN + SET_CAR_COUPAN + '?' + `search_id=${search_i}` + `&coupon_code=` + coupan,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      .then(response => { 
        // console.log(response);
             
          this.setState({
            coupanPrice : response.data.coupon.discounted_price,
            coupon_code:false
          })
      })
      .catch(error => {
        // reject(error.response);
        if (!error.response.data.success) {
          this.setState({
            CoupanErr:error.response.data.message
          })
        }
        console.log(error.response);
      });
      // toast.warn("کد تخفیف نادرست است.",{
      //   position: "bottom-center",
      //     autoClose: 7000,
      //     hideProgressBar: true,
      //     closeOnClick: false,
      //     pauseOnHover: true,
      //     draggable: true
      // })
    }

    render() {
      console.log("token",jsCookie.get("token"));
      const { t, start_date, end_date, search_id } = this.props;
      let start,
        end = null;
      let startDate,
        endDate = null;
      if (start_date && end_date) {
        startDate = moment(start_date, "jYYYY/jMM/jDD");
        endDate = moment(end_date, "jYYYY/jMM/jDD");
        //console.log(startDate);
      }
      if (startDate && endDate) {
        start = moment(startDate).format("jD jMMMM jYY");
        end = moment(endDate).format("jD jMMMM jYY");
        //console.log(start);
      }
      const {
        media_set,
        year,
        mileage_range,
        owner,
        body_style,
        color,
        color_code,
        deliver_at_renters_place,
        cancellation_policy,
        transmission_type,
        location,
        facility_set,
        max_km_per_day,
        description,
        capacity,
        extra_km_price,
        car,
        loaded,
        discount_percent,
        discounted_total_price,
        total_price,
        avg_price_per_day,
        no_of_days,
        avg_discounted_price_per_day,
        insurance_total_price
      } = this.props;
      if (loaded) {
        console.log(this.props);
        return (
          <Layout
            haveSubHeader={true}
            pageTitle={"list Your Car"}
            onRef={this.doRef}
          >
            <NextSeo
        config={{
          title: `ثبت درخواست اجاره ${car.brand.name.fa} ${car.name.fa} | اتولی`,
          description: `اتولی سامانه‌ای است برای اجاره خودرو به‌صورت آنلاین. با اتولی هم می‌توانید ماشین اجاره کنید و هم از اجاره ماشین خود کسب درآمد کنید.    `,
          openGraph: {
            title: `ثبت درخواست اجاره ${car.brand.name.fa} ${car.name.fa} | اتولی`,
            description: `اتولی سامانه‌ای است برای اجاره خودرو به‌صورت آنلاین. با اتولی هم می‌توانید ماشین اجاره کنید و هم از اجاره ماشین خود کسب درآمد کنید.    `,
            site_name: "اتولی"
          },
          twitter: {
            handle: "@otoli_net",
            site: "@otoli_net",
            cardType: "summary_large_image"
          }
        }}
      />
            <Section
              id="checkout"
              justifyCenter={true}
              style={{ marginTop: "24px", marginBottom: "50px" }}
            >
              <ContentSideCard>
                <List boldLastItem={true} className="marginni">
                  <div className="dateFatherCheckout">
                    <span className="DatesinCheckOutpage">
                      {LongDate(endDate).split(" ")[0]}
                      <br/>
                      {LongDate(endDate).split(" ")[1]
                    +" "+LongDate(startDate).split(" ")[2]}
                    </span>
                    <span className="TaInCheckout"><Icon name="arrow left" size="large"></Icon></span>
                    <span className="DatesinCheckOutpage">
                      {LongDate(startDate).split(" ")[0]}
                      <br/>
                      {LongDate(startDate).split(" ")[1]
                    +" "+LongDate(startDate).split(" ")[2]}
                    </span>
                  </div>
                  <div className="DayCounter_Checkout" style={{ textAlign: "center", marginBottom: "25px" }}>
                    مدت اجاره:{" "} 
                    <span className="">
                      {convertNumbers2Persian(no_of_days)}
                      <span> روز </span>
                    </span>
                  </div>
                  <li>
                    قیمت روزانه
                    <span className="float-left">
                      <span>
                        {convertNumbers2Persian(
                          numberWithCommas(avg_discounted_price_per_day)
                        )}
                      </span>
                      <span style={{ fontWeight: 100 }}> تومان </span>
                    </span>
                  </li>
                  {total_price !== discounted_total_price && <li>
                    تخفیف برای {convertNumbers2Persian(no_of_days)} روز
                    <span className="float-left">
                      <span>
                        {convertNumbers2Persian(
                          numberWithCommas(total_price - discounted_total_price)
                        )}
                      </span>
                      <span style={{ fontWeight: 100 }}> تومان </span>
                    </span>
                  </li>
                  }
                  <li>
                    جمع اجاره
                    <span className="float-left">
                      <span>
                        {convertNumbers2Persian(
                          numberWithCommas(discounted_total_price || 0)
                        )}
                      </span>
                      <span style={{ fontWeight: 100 }}> تومان </span>
                    </span>
                  </li>
                   <li>
                    بیمه
                    <span className="float-left">
                    {this.state.insurance ?
                    <span>{convertNumbers2Persian(numberWithCommas(insurance_total_price))}</span>
                    : <span> ندارد
                    </span>
                    }
                      <span style={{ fontWeight: 100 }}> 
                      {this.state.insurance ?" تومان " 
                      : "" 
                      }
                      </span>
                    </span>
                  </li>
                  <li className ="DiscountCopon">
                    
                  {!this.state.coupon_code && !this.state.coupanPrice ?
                  <span onClick={()=>{
                      this.setState({
                        coupon_code:true
                      })
                    }}>کد تخفیف دارید؟</span>
                    : this.state.coupanPrice ? <><p
                    style={{cursor:'pointer',
                    color: '#4ba3ce',
                    display:"inline-block"
                    }}
                     onClick={()=>{
                      this.setState({
                        coupon_code:false,
                        coupanPrice : 0
                      })
                    }}
                    >کد تخفیف</p>
                    <span 
                    style={{float:'left',direction:"rtl"}}>
                      <span dir="ltr">{convertNumbers2Persian(
                            numberWithCommas(this.state.coupanPrice - discounted_total_price )
                          )}</span> تومان
                          </span>
                    </>
                    : null
                  }
                    {this.state.coupon_code && <><form onSubmit={(e)=>this.CoupanController(e,search_id)}>
                      <input autoFocus type="text" name="COUPAN" onChange={(e)=>{
                      this.setState({
                        coupan: e.target.value
                      })
                      }}/>
                      <button type="submit">اعمال</button>
                    </form>
                      {this.state.CoupanErr && <p style ={{
                        color: '#de0000',
                        fontWeight: '400',
                        marginTop: '8px',
                        fontSize: '12px',
                        direction: 'rtl',
                      }}>{this.state.CoupanErr}</p>}
                      </>
                    }
                  </li>
                  <li style={{ borderTop: "1px solid #ddd", fontSize: '20px' }} >
                    جمع کل
                    <span className="float-left">
                      <span >
                        {this.state.insurance ?
                        this.state.coupanPrice ? convertNumbers2Persian(
                          numberWithCommas(this.state.coupanPrice + insurance_total_price
                          ))
                        :
                          convertNumbers2Persian(
                            numberWithCommas(discounted_total_price + insurance_total_price )
                          )
                          :this.state.coupanPrice ?convertNumbers2Persian(
                            numberWithCommas(this.state.coupanPrice
                            )) :
                          convertNumbers2Persian(
                            numberWithCommas( discounted_total_price)
                          )}
                      </span>
                      <span style={{ fontWeight: 100 }}> تومان </span>
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
                {isBrowser && (
                  <>
                    <br />
                    <Button
                    className="REQUEST_TO_BOOK_A_CAR"
                    loading={this.state.loading}
                      style={{ height: "48px" }}
                      size="large"
                      fluid
                      onClick={() => {
                        this.reserve(search_id);
                      }}
                      color="teal"
                    >
                      ثبت درخواست
                    </Button>
                    <div style={{ marginTop: "8px" }} className="text-center">
                      <small>
                        هزینه را بعد از پذیرش درخواست توسط مالک خودرو پرداخت
                        خواهید کرد
                      </small>
                    </div>
                  </>
                )}
              </ContentSideCard>
              <div className="mobileView">
                <Insurance hasInsurance={this.insuranceCalculator}  insuranvePrice={insurance_total_price}/>
              </div>
              <ContentCard className="DesignReally">
                <Grid>
                  <Grid.Row columns={2} centered className="property">
                    <div
                    //   width={12}
                    //   className="right"
                    //   style={{ paddingRight: "0" }}
                    >
                      <div className="checkOutPartoneFather">
                        <div
                          style={{
                            display: "inline-block",
                            verticalAlign: "top",
                            width: "69%"
                          }}
                        >
                          <h1
                            style={{
                              fontSize: "20px",
                              textAlign: "right",
                              paddingBottom: "0px"
                            }}
                          >
                            {`${car.brand.name.fa} ${car.name.fa}`}
                          </h1>
                          <small
                            style={{
                              textAlign: "right",
                              display: "block",
                              fontSize: "13px"
                            }}
                          >
                            {year.fa}
                          </small>
                        </div>
                        <div className="ownerInCheckOut">
                          <div>
                            <img src={owner.thumbnail_url} alt ={
                              owner.company_name 
                              ? owner.company_name 
                              : owner.first_name  
                                ? `${owner.first_name} ${owner.last_name}`  
                                :null}/>
                              
                          </div>
                          <div>
                            <span style={{ fontWeight: "bold" }}>
                              {owner.company_name ? owner.company_name :owner.first_name} {owner.company_name ? null:owner.last_name}
                            </span>
                          </div>
                        </div>
                        {/* <DateGrid start={startDate} end={endDate} /> */}
                        {/* <span>{year.fa}</span> <br /> */}
                        {media_set.length >= 1 ? (
                          <div className="COMEOOON" style={{display:"inline-block",width: "170px",height:"120px", position:'relative',overflow:"hidden"}}>
                            <img
                            key="1"
                            alt={`${car.brand.name.fa} ${car.name.fa}`}
                            src={media_set[0]}
                            onLoad = {(a)=>{this.setheightController(a)}}
                            style={{
    left: '0',
    right: '0',
    margin: 'auto',
    width: '100%',
                              position:"absolute",top:"-"+this.state.heightController+"px"}}
                            />
                            </div>
                        ) : (
                            <img src="" />
                          )}
                      </div>
                      <Details
                        title="شرایط اجاره و کنسلی"
                        showHr={false}
                        style={{ marginTop: "20px" }}
                      >
                        <pre>
                        {cancellation_policy ? cancellation_policy : "ندارد"}
                        </pre>
                      </Details>
                      <Details
                        title="محل تحویل"
                        showHr={false}
                        style={{ marginTop: "20px" }}
                      >
                        <p style={{ margin: "auto" }}>
                          {convertNumbers2Persian(location.name.breadcrumb_fa)}
                        </p>
                        <p>
                          {deliver_at_renters_place ? "در محدوده تهران، خودرو در محل شما تحویل می‌شود." : ""}
                        </p>
                      </Details>
                      <Details
                        style={{ marginTop: "20px" }}
                        title="مسافت روزانه"
                        showHr={false}
                      >
                        <ul className="">
                          <li>
                        روزی{" "}
                        {max_km_per_day
                              ? convertNumbers2Persian(max_km_per_day) +
                              " کیلومتر "
                              : "ندارد"}
                          </li>
                          <li>
                            {extra_km_price
                              ? `هر کیلومتر اضافه ${convertNumbers2Persian(
                                extra_km_price
                              ).toLocaleString()} تومان`
                              : ""}
                          </li>
                        </ul>
                      </Details>
                      {/* <Details
                        style={{ marginTop: "20px" }}
                        title="توضیحات"
                        showHr={false}
                      >
                        {description ? description : "ندارد"}
                      </Details> */}
                    </div>
                    {/* <Grid.Column
                      width={6}
                      className="left"
                      style={{ padding: "0" }}
                    >
                      
                    </Grid.Column> */}
                  </Grid.Row>
                </Grid>
              </ContentCard>
              <div className="DeskView">
                <Insurance hasInsurance={this.insuranceCalculator} insuranvePrice={insurance_total_price} />
              </div>
              <ContentCard className="Nadarim">
                <List boldLastItem={false}>
                  <div className="dateFatherCheckout" style={{ fontWeight: 100 }}>
                    <span className="DatesinCheckOutpage">
                      {LongDate(endDate).split(" ")[0]}
                      <br/>
                      {LongDate(endDate).split(" ")[1]
                    +" "+LongDate(startDate).split(" ")[2]}
                    </span>
                    <span className="TaInCheckout">
                      <Icon name="arrow left" size="small"></Icon>
                    </span>
                    <span className="DatesinCheckOutpage">
                      {LongDate(startDate).split(" ")[0]}
                      <br/>
                      {LongDate(startDate).split(" ")[1]
                    +" "+LongDate(startDate).split(" ")[2]}
                    </span>
                  </div>
                  <div className="di_couner_checkout" style={{ textAlign: "center", marginBottom: "25px", fontWeight: 100 }}>
                    مدت اجاره:{" "}
                    <span >
                      {convertNumbers2Persian(no_of_days)}
                      <span> روز </span>
                    </span>
                  </div>
                </List>
              </ContentCard>
            </Section>
            {isMobile && (
              <div 
              style={{
                  zIndex: "55",
                  position: "fixed",
                  borderRadius: "0px",
                  margin: "0px",
                  boxShadow: "0px -1px 3px #ccc",
                  width: "100%",
                  bottom: "0",
                  padding: "10px 15px",
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  background: "#fff"
              }}
              >
              <span
              style={{
                  fontSize: '12px',
                  paddingRight: '10px',
              }}>.هزینه را بعد از پذیرش درخواست توسط مالک خودرو پرداخت
              خواهید کرد</span>
              <Button
              loading={this.state.loading}
                style={{
                  // zIndex: "55",
                  // bottom: "0",
                  // position: "fixed",
                  // borderRadius: "0",
                  // margin: "0",
                  // height: "56px"
                  width: "50%",
                            textAlign: "center",
                            height: "40px",
                            fontSize: "12px",
                            padding: "4px 10px",
                }}
                primary
                type="submit"
                onClick={() => this.reserve(search_id)}
                className="btn_1 full-width REQUEST_TO_BOOK_A_CAR"
              >
                ثبت درخواست
              </Button>
              </div>
            )}
          </Layout>
        );
      } else {
        return <></>;
      }
    }
  }
);
