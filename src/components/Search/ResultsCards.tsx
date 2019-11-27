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
  showInProfile?: boolean;
  userOwnPage?: boolean;
  fetchAPI?:any;
  // own?:boolean
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
      showInProfile = false,
      userOwnPage = false,
      fetchAPI
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
                // own = {own}
                fetchAPI={fetchAPI}
                  key={index}
                  id={value.id}
                  title={value.car.brand.name.fa + " " + value.car.name.fa}
                  year={value.year.name.fa}
                  img={
                    value.media_set[0] ? value.media_set[0].thumbnail_url : null
                  }
                  price={value.avg_price_per_day}
                  discount_percent={value.discount_percent}
                  discounted_price={value.avg_discounted_price_per_day}
                  description={value.description}
                  deliver_at_renters_place={value.deliver_at_renters_place}
                  // text2={value.text2}
                  score={"8.4"}
                  dateURL={dateURL}
                  search_id={value.search_id}
                  simpleMode={showInProfile}
                  showEditButtons={userOwnPage}
                  is_out_of_service={value.is_out_of_service}
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
