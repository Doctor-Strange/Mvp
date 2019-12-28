import * as React from "react";
import styled from "styled-components";
import { Box, Flex } from "@rebass/grid";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });
import { convertNumbers2Persian } from "../../utils/numbers";

const SearchResult = styled.div`
  padding: 8px 0;
  color: #2a2a2a;
  background: #ffffff;
  position: relative;
  z-index: 6;
  text-align: center;
  h4 {
    margin: 8px 0 0 0;
    padding: 0;
    line-height: 1;
    font-size: 16px;
    font-size: 1rem;
    direction: rtl;
    line-height: 24px;
    @media (max-width: 991px) {
      margin: 5px 0 0 0;
    }
    @media (max-width: 767px) {
      margin: 3px 0 0 0;
    }
  }
  @media (max-width: 767px) {
    padding: 12px 0;
  }
  &.is_stuck {
    z-index: 99;
    padding: 10px 0;
  }
  &.map_view {
    padding: 10px 0;
    margin: 0 -15px;
    h4 {
      margin: 3px 0 0 0;
    }
  }
  .hide_on_desktop {
    text-align: center;
  }
`;

export class SearchBar extends React.Component<{
  count: number;
  cities?: any;
  city: any;
  cityName: any;
  setCity: any;
  setDate: any;
  startDate: any;
  endDate: any;
  setfocusedInput: any;
  focusedInput: any;
  DynamicSearch?: boolean;
}> {
  state = {
    error: "",
    name: null,
    success: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      count,
      cities,
      startDate,
      endDate,
      cityName,
      DynamicSearch
    } = this.props;
    const { citiesFarsi } = cities;
    let start = "";
    let end = "";
    let text = "نتیجه برای جستجو در ";
    if (startDate && endDate) {
      if (DynamicSearch) {
        start = startDate;
        end = endDate;
      } else {
        start = moment(startDate).format("jD jMMMM jYY");
        end = moment(endDate).format("jD jMMMM jYY");
      }
    }
    const textDate = ` تاریخ ${convertNumbers2Persian(
      start
    )} تا ${convertNumbers2Persian(end)}`;
    return (
      <SearchResult id="results">
        <div className="container">
          <Flex justifyContent="space-around" className="row hide_on_mobile">
            <Box width={12 / 12} px={2}>
              <h4 style={{ fontSize: "16px", textAlign: "center" }}>
                {count > 0 ? (
                  <>
                    <strong> {convertNumbers2Persian(count)} </strong>
                    {text}
                  </>
                ) : (
                  "در حال جستجو برای"
                )}

                {citiesFarsi[0].value && citiesFarsi[0].text}
                {textDate ? textDate : ""}
              </h4>
            </Box>
          </Flex>
          <div className="hide_on_desktop">
            {count > 0 && (
              <h4>
                <strong>{convertNumbers2Persian(count)}</strong> {text}
                {cityName} <br /> {textDate ? textDate : ""}
              </h4>
            )}
          </div>
        </div>
      </SearchResult>
    );
  }
}

// start 230
// end 129
