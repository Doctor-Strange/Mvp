import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Section } from "../row/Sections";
import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Form,
  Grid,
  Icon,
  Label,
  Segment,
  TextArea,
  Transition
} from "semantic-ui-react";
import { CarCard, CarCardPlaceholder } from "../Cards";
import { BulletList } from "react-content-loader";
import { i18n, withTranslation } from "../../i18n";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });
import { Box, Flex } from "@rebass/grid";
import {
  numberWithCommas,
  convertNumbers2Persian,
  convertNumbers2English
} from "../../utils/numbers";

const NotFound = styled.p`
  display: block;
  text-align: center;
  width: 100%;
  direction: rtl;
  min-height: 500px;
  padding-top: 79px;
`;

// interface ISearchResultFormValues {
//   carCity: number;
//   startDate: any;
//   endDate: any;
// }

export class ResultsCards extends React.Component<{
  t?: any;
  results?: any;
  loadingResults: boolean;
  remained_count: Number;
  lodingMore: boolean;
  noResult: boolean;
  nextPage?: any;
  dateURL?: string;
  colClass?: string;
  marginClass?: string; 
  userOwnPage?: boolean; 
}> {
  state = {
    error: ""
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      t,
      results,
      loadingResults,
      noResult,
      remained_count,
      nextPage,
      dateURL,
      lodingMore,
      colClass = "col-lg-9",
      marginClass = "margin_16",  
    } = this.props;
    return (
      <>
        <Section
          justifyCenter={false}
          justifyContent={"flex-end"}
          className={`${colClass} ${marginClass} carcards_section`}
        >
          {loadingResults === true ? (
            <>
              <CarCardPlaceholder />
              <CarCardPlaceholder />
              <CarCardPlaceholder />
              <br />
              <CarCardPlaceholder />
              <CarCardPlaceholder />
              <CarCardPlaceholder />
            </>
          ) : (
            results.map((value, index) => {
              return (
                <CarCard  
                  key={index}
                  id={value.id}
                  title= {value.car.brand.name.fa + " " + value.car.name.fa }
                  year={value.year.name.fa}
                  img={
                    value.media_set[0] ? value.media_set[0].thumbnail_url : null
                  }
                  price={value.avg_price_per_day}
                  discount_percent={value.discount_percent}
                  avg_discounted_price_per_day={value.avg_discounted_price_per_day} 
                  deliver_at_renters_place={value.deliver_at_renters_place} 
                  dateURL={dateURL}
                  search_id={value.search_id} 
                  system_discount_per_day_name={value.system_discount_per_day_name} 
  system_discount_name ={value.system_discount_name}
  system_discount_percent={value.system_discount_percent}
  avg_discounted_price_per_day_name={value.avg_discounted_price_per_day_name}
  discounted_total_price_name={value.discounted_total_price_name}
  avg_price_per_day_name={value.avg_price_per_day_name}
  has_system_discount={value.has_system_discount}
  system_discount_per_day={value.system_discount_per_day}
  total_price = {value.total_price}
  total_discount = {value.total_discount}
  total_discount_percent = {value.total_discount_percent}
                />
              );
            })
          )}
          {noResult ? (
            <NotFound>
              {/* <Icon
                                name="dont"
                                size='large'
                                /> */}
              متاسفانه برای جستجوی شما نتیجه‌ای پیدا نشد.
              <br />
              <br />
              اگر از فیلترها استفاده کرده‌اید می‌توانید آنها را غیرفعال کنید یا
              تاریخ‌های دیگر را امتحان کنید.
              <br />
              همیشه می‌توانید با پشتیبانی اتولی (۰۲۱۸۸۵۶۷۷۵۹) تماس بگیرید.
              {/* <Icon
                                name="dont"
                                size='large'
                                /> */}
            </NotFound>
          ) : (
            <></>
          )}
          {remained_count > 0 && !noResult ? (
            <p
              className="text-center"
              style={{ width: "100%", margin: "20px auto 50px" }}
            >
              <Button
              className="LOAD_MORE_CAR"
                basic
                loading={lodingMore}
                onClick={() => {
                  nextPage();
                }}
              >
                نمایش ماشین‌های بیشتر
              </Button>
            </p>
          ) : (
            <> </>
          )}
        </Section>
      </>
    );
  }
}
