import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { PriceCard } from "./index";
import { convertNumbers2Persian } from "../../utils/numbers";

const Card = styled.div`
  max-height: 300px;
  min-width: 300px;
  width: 340px;
  max-width: 100%;
  margin: 10px 10px;
  background-color: #ffffff;
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
        background-color: #f7f7f7;
        border-radius: 20px;
        display: inline-block;
        color: #2a2a2a;
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
    .Edit_car {
      top: 20px;
      left: 16px;
      text-align: left;
    }
  }
  a.wish_bt {
    position: absolute;
    left: 0;
    bottom: 35px;
    z-index: 1;
    line-height: 2;
    background-color: #4BA3CE;
    padding: 0px 10px;
    display: inline-block;
    color: #ffffff;
    border-radius: 3px;
    box-shadow: 0px 2px 2px rgba(0,0,0,.2);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
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
    color: #32a067;
    border: 1px solid #32a067;
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
  year: string;
  price: number;
  deliver_at_renters_place: boolean;
  dateURL?: string;
  search_id?: string;
  discount_percent?: string;
  discounted_price?: number;
}> = ({
  title,
  img,
  year,
  price,
  deliver_at_renters_place,
  id,
  dateURL,
  search_id,
  discount_percent,
  discounted_price
}) => {
  const [heightController, setheightController] = useState(0);

  let carName = title.replace(/ /g, "-");
  let link = `/car/${id}/${carName}${dateURL}?search_id=${search_id}`;

  return (
    <Card className={`strip grid carcard CAR_CART_${title}`}>
      <Link href={link}>
        <a className={`strip grid carcard CAR_CART_${title}`}>
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
              alt={title}
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
              <span>مشاهده مشخصات</span>
            </div>
          </figure>

          <div className="wrapper row">
            <div className="col-8">
              <h3>
                {title}
                <br />
                <small>{year}</small>
                <br />
              </h3>
            </div>

            <div className="col-4 leftbox" style={{ cursor: "default" }}>
              <PriceCard number={discounted_price ? discounted_price : price}>
                در روز
              </PriceCard>
            </div>

            <ul style={{ cursor: "default" }}>
              {deliver_at_renters_place && (
                <li>
                  <span className="delivery">تحویل در محل</span>
                </li>
              )}
            </ul>
          </div>
        </a>
      </Link>
    </Card>
  );
};

// before 587
// after 305
