import * as React from "react";
import { useState, useEffect } from "react";
import jsCookie from "js-cookie";
import styled from "styled-components";
import { Box, Flex } from "@rebass/grid";
import Link from "next/link";
import Router from "next/router";
import StarRatingComponent from "react-star-rating-component";
import { Icon, Button, Grid } from "semantic-ui-react";
import { PriceCard } from "./index";
import {
  numberWithCommas,
  convertNumbers2Persian,
  convertNumbers2English
} from "../../utils/numbers";
import { ITheme } from "../../theme/Interfaces";
import { REQUEST_set_out_of_service, REQUEST_deleteCar } from "../../API";
import axios from "axios";
import { toast } from "react-toastify";
import swal from "@sweetalert/with-react";

const Card = styled.div`
  max-height: 300px;
  min-width: 300px;
  width: 340px;
  max-width: 100%;
  margin: 10px 10px;
  background-color: ${({ theme }: { theme: ITheme }) =>
    theme.color.whiteBackground};
  display: block;
  position: relative;
  border-radius: 4px;
  box-shadow: 0px 1px 5px 1px #0000000f;
  @media (max-width: 768px) {
    width: 97vw;
    max-width: 400px;
  }
  .img-fluid {
    max-width: 100%;
    min-width: 100%;
    height: auto;
  }
  figure {
    cursor: pointer;
    margin-bottom: 0;
    overflow: hidden;
    position: relative;
    height: 200px;
    border-radius: 3px 3px 0 0;
    margin: 0;
    a {
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(1);
        backface-visibility: hidden;
        width: 100%;
        transition: all 0.3s ease-in-out;
      }
      &:hover img {
        transform: translate(-50%, -50%) scale(1.1);
      }
    }
    &:hover {
      .read_more,
      .delete_car {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
    }
    .read_more {
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -12px;
      transform: translateY(10px);
      text-align: center;
      opacity: 0;
      visibility: hidden;
      width: 100%;
      transition: all 0.6s;
      z-index: 2;
      span {
        background-color: ${({ theme }: { theme: ITheme }) =>
          theme.color.cardLabels};
        border-radius: 20px;
        display: inline-block;
        color: ${({ theme }: { theme: ITheme }) => theme.color.textMain};
        font-size: 12px;
        font-size: 0.75rem;
        padding: 5px 10px;
      }
    }
    .delete_car {
      top: 20px;
      right: 16px;
      text-align: right;
    }
    .Edit_car{
      top: 20px;
      left: 16px;
      text-align: left;
    }
  }
  a.wish_bt {
    position: absolute;
    left: 12px;
    bottom: 28px;
    z-index: 1;
    background-color: ${({ theme }: { theme: ITheme }) =>
      theme.color.fadedGray};
    padding: 5px 10px;
    display: inline-block;
    color: ${({ theme }: { theme: ITheme }) => theme.color.whiteBackground};
    border-radius: 3px;
  }
  .wrapper {
    padding: 0px 0px 60px 0px;
    .col-8 {
      top: 15px;
      right: 15px;
    }
    h3 {
      font-size: 20px;
      font-size: 1.25rem;
      margin: 0;
    }
    small {
      font-weight: 600;
      margin-bottom: 10px;
      display: inline-block;
      font-size: 13px;
      font-size: 0.8125rem;
    }
    .number span,
    .unit span {
      color: #2a2a2a;
    }
    p {
      margin-bottom: 15px;
    }
  }
  ul {
    padding: 0px 0px 0px 0px;
    padding-bottom: 0px;
    margin-bottom: 15px;
    position: absolute;
    bottom: -5px;
    right: 4px;
    li {
      display: inline-block;
      margin-right: 10px;
      .score {
        margin-top: -10px;
        span {
          display: inline-block;
          position: relative;
          top: 7px;
          margin-right: 8px;
          font-size: 12px;
          font-size: 0.75rem;
          text-align: right;
          line-height: 1.1;
          font-weight: 500;
        }
        em {
          display: block;
          font-weight: normal;
          font-size: 11px;
          font-size: 0.6875rem;
        }
        strong {
          background-color: #32a067;
          color: #fff;
          line-height: 1;
          border-radius: 5px 5px 5px 0;
          padding: 10px;
          display: inline-block;
        }
      }
    }
  }

  .delivery {
    color: ${({ theme }: { theme: ITheme }) => theme.color.successColor};
    border: 1px solid
      ${({ theme }: { theme: ITheme }) => theme.color.successColor};
  }
  .delivery,
  .loc_closed {
    position: relative;
    font-size: 11px;
    font-size: 0.6875rem;
    font-weight: 600;
    padding: 2px 8px;
    line-height: 1;
    border-radius: 3px;
  }
  .col-8 {
    top: -8px;
  }
  .leftbox {
    position: absolute;
    left: -8px;
    bottom: 48px;
  }
  .edit {
    width: 100%;
    margin: 0 !important;
    .property {
      display: flex !important;
      width: 100% !important;
      justify-content: center !important;
      align-items: center !important;
      .item {
        padding: 0 !important;
        text-align: center !important;
        button {
          padding: 5px 5px;
          font-size: 12px;
        }
      }
    }
  }

  @media (min-width: 768px) {
    margin-right: auto;
    margin-left: auto;
  }
`;

export const CarCard: React.FunctionComponent<{
  id: any;
  title: string;
  img: string;
  description: string;
  year: string;
  score: any;
  price: number;
  deliver_at_renters_place: boolean;
  dateURL?: string;
  search_id?: string;
  simpleMode?: boolean;
  showEditButtons?: boolean;
  discount_percent?: string;
  discounted_price?: number;
  is_out_of_service: boolean;
  fetchAPI?:any;
  showInProfile?: boolean; 
  own?:boolean
}> = ({
  children,
  title,
  img,
  description,
  year,
  score,
  price,
  deliver_at_renters_place,
  id,
  dateURL,
  search_id,
  simpleMode = true,
  showEditButtons = false,
  discount_percent,
  discounted_price,
  is_out_of_service = false,
  fetchAPI,
  showInProfile,
  own
}) => {
  const [outofservice, setoutofservice] = useState(false);
  const [heightController, setheightController] = useState(0);
  let link = "";
  // let start_date ;
  // let end_date;
  // if(localStorage['start']){
  //   start_date = JSON.parse(localStorage['start'])
  //   end_date = JSON.parse(localStorage['end'])
  // }
  let carName = title.replace(/ /g, "-");
  if (simpleMode) {
    link = `/car/${id}/${carName}?notAllowed=true`;
  } else {
    link = `/car/${id}/${carName}${dateURL}?search_id=${search_id}`;
  }

  // console.log(children,
  //   title,
  //   img,
  //   description,
  //   year,
  //   score,
  //   price,
  //   deliver_at_renters_place,
  //   id,
  //   dateURL,
  //   search_id,
  //   simpleMode = true,
  //   showEditButtons = false,
  //   discount_percent,
  //   discounted_price,
  //   is_out_of_service = false,)
  useEffect(() => {
    setoutofservice(is_out_of_service);
  }, []);
  const setCarTiming = () => {
    const href = `/set-car-timing?id=${id}`;
    Router.push(href, href);
    // console.log("/set-car-timing")
    // return
    // Router.push({
    //   pathname: '/set-car-timing',
    //   query: {
    //     id: id
    //   }
    // });
  };

  const deleteCarHandller = () => {
    console.log("test");
    swal(
      <div>
        <h3>حذف خودرو</h3>
        <span dir="rtl">اطلاعات خودرو به طور کامل پاک شود؟</span>
      </div>,
      {
        buttons: {
          cancel: "لغو",
          catch: {
            text: "تایید",
            value: "done"
          }
        }
      }
    ).then(value => {
      if(value === "done"){
      const DOMAIN = process.env.PRODUCTION_ENDPOINT;
      const token = jsCookie.get("token");
      const DELETE_CAR = "/core/rental-car/delete";
      axios
        .post(
          DOMAIN + DELETE_CAR,
          {
            id
          },
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        )
        .then(response => {
          console.log("res", response.data.success, fetchAPI);
          fetchAPI()
        })
        .catch(error => {
          console.log(error.response.data.message);
        });
      }
      // if (data.action == 'pay') {
      //     Router.push(res.redirect_to, res.redirect_to, { shallow: false });
      // }
      // else {
      //     refresh();
      // }
    });
  };
  const pauseCar = (id, value) => {
    // console.log("pass" , value)
    const token = jsCookie.get("token");
    const DOMAIN = process.env.PRODUCTION_ENDPOINT;
    const SETOUTOFSERVICE = "/core/rental-car/set-is-out-of-service";
    axios
      .post(
        DOMAIN + SETOUTOFSERVICE,
        {
          id,
          value: !value
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(response => {
        // console.log("response" ,response.data.data.is_out_of_service)
        if (response.data.success) {
          setoutofservice(response.data.data.is_out_of_service);
          is_out_of_service = response.data.data.is_out_of_service;
          let message = "";
          if (is_out_of_service) {
            message = `خودروی ${carName} شما در نتایج جستجو نمایش داده نخواهد شد.`;
          } else {
            message = `خودروی ${carName} شما در نتایج جستجو نمایش داده خواهد شد.`;
          }
          toast.success(message, {
            position: "bottom-center",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true
          });
          // console.log("outofservice" , outofservice);
          // console.log("new value" , is_out_of_service)
        }
      })
      .catch(error => {
        console.log(error.response);

        // reject(error.response);
      });
    // fetchAPI();
    // console.log("pauseCar", id, value)
    // const href = `/set-car-timing?id=${id}`;
    // Router.push(href, href, { shallow: true });
    return;
    alert("خودروی شما از دیده‌ها پنهان شد.");
  };

  // async function fetchAPI() {
  //   const res = await REQUEST_set_out_of_service({  token: jsCookie.get('token'),id:11 , value : true });
  //   // console.log(res);
  // }
  return (
    <Card className="strip grid carcard">
      {/* {console.log("body",outofservice)} */}
      <Link href={link}>
        <a>
          <figure>
            {discount_percent && (
              <a className="wish_bt">
                ٪{convertNumbers2Persian(discount_percent)} تخفیف
              </a>
            )}
            <img
              style={{ position: "absolute", top: -heightController + "px" }}
              src={img}
              className="img-fluid"
              alt=""
              onLoad={a => {
                a.persist();
                let w = a.target.naturalWidth;
                let h = a.target.naturalHeight;
                // console.log(title,"==>",w/h)
                if (w / h < 1.2) {
                  setheightController((w / h) * 100);
                }
                if (w / h < 0.9) {
                  setheightController((w / h) * 220);
                }
              }}
            />
            <div className="read_more">
              <span>{simpleMode ? "مشاهده" : "مشاهده مشخصات"}</span>
            </div>
            <div
              className=" read_more delete_car"
              onClick={e => {
                e.preventDefault();
                deleteCarHandller();
              }}
            >
              {own && <span>{simpleMode ? "حذف خودرو" : "حذف خودرو"}</span>}
            </div>
            <div className=" read_more Edit_car"
            onClick={e => {
              e.preventDefault();
              Router.push(`/add-car?edit=true&car_id=${id}`)
            }}
            >
              {own && <span>{simpleMode ? "ویرایش اطلاعات" : "ویرایش اطلاعات"}</span>}
            </div>
            {/* <small>Restaurant</small> */}
          </figure>
        </a>
      </Link>

      <div className="wrapper row">
        <div className="col-8">
          <Link href={link}>
            <a>
              <h3>
                {title}
                <br />
                <small>{year}</small>
                <br />
                {/* <StarRatingComponent
                          name="rate1"
                          starCount={5}
                          value={3}
                        /> */}
              </h3>
            </a>
          </Link>
        </div>
        {!simpleMode && (
          <div className="col-4 leftbox" style={{ cursor: "default" }}>
            <PriceCard number={discounted_price ? discounted_price : price}>
              در روز
            </PriceCard>
          </div>
        )}

        {/* <small>{text2}</small> */}
        {/* <p>{description}</p> */}
        {/* <a className="address" href={`/car?id=${id}`}>Get directions</a> */}
        {!simpleMode && (
          <ul style={{ cursor: "default" }}>
            {deliver_at_renters_place ? (
              <li>
                <span className="delivery">تحویل در محل</span>
              </li>
            ) : (
              <li></li>
            )}
          </ul>
        )}
        {showEditButtons && (
          <Grid className="edit">
            <Grid.Row columns={2} centered className="property">
              <Grid.Column width={8} className="item">
                <Button basic onClick={setCarTiming}>
                  <Icon name="calendar alternate outline" /> تغیر تاریخ و قیمت
                </Button>
              </Grid.Column>
              <Grid.Column width={8} className="item">
                <Button basic onClick={() => pauseCar(id, outofservice)}>
                  {outofservice ? (
                    "نمایش مجدد خودرو"
                  ) : (
                    <>
                      <Icon name="pause circle outline" /> توقف نمایش
                    </>
                  )}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
    </Card>
  );
};
