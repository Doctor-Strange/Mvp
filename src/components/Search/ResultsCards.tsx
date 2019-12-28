import * as React from "react";
import styled from "styled-components";
import { Section } from "../row/Sections";
import { Button } from "semantic-ui-react";
import { CarCard, CarCardPlaceholder } from "../Cards";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

const NotFound = styled.p`
  display: block;
  text-align: center;
  width: 100%;
  direction: rtl;
  min-height: 500px;
  padding-top: 79px;
`;

export class ResultsCards extends React.Component<{
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
  fetchAPI?: any;
  own?: boolean;
}> {
  state = {
    error: ""
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
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
      fetchAPI,
      own
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
                  own={own}
                  fetchAPI={fetchAPI}
                  key={index}
                  id={value.id}
                  title={
                    showInProfile
                      ? value.car.name.fa
                      : value.car.brand.name.fa + " " + value.car.name.fa
                  }
                  year={value.year.name.fa}
                  img={
                    value.media_set[0] ? value.media_set[0].thumbnail_url : null
                  }
                  price={value.avg_price_per_day}
                  discount_percent={value.discount_percent}
                  discounted_price={value.avg_discounted_price_per_day}
                  description={value.description}
                  deliver_at_renters_place={value.deliver_at_renters_place}
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
              متاسفانه برای جستجوی شما نتیجه‌ای پیدا نشد.
              <br />
              <br />
              اگر از فیلترها استفاده کرده‌اید می‌توانید آنها را غیرفعال کنید یا
              تاریخ‌های دیگر را امتحان کنید.
              <br />
              همیشه می‌توانید با پشتیبانی اتولی (۰۲۱۸۸۵۶۷۷۵۹) تماس بگیرید.
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

// start 158
// end 142
