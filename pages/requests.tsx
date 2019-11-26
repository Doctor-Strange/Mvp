import * as React from "react";
import NextSeo from "next-seo";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Icon, Image, Item, Label } from "semantic-ui-react";
import { Section } from "../src/components/row/Sections";
import { RequestCard, RequestCardPlaceholder } from "../src/components/Cards";
import Layout from "../src/components/Layout";
import { REQUEST_getOrderRequests, REQUEST_getOrderRequest } from "../src/API";
import { Box, Flex } from "@rebass/grid";
import jsCookie from "js-cookie";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

const Requests = props => {
  const [requests, setRequests] = useState([{}]);
  const [requestsCount, setRequestsCount] = useState(-1);
  const [request, setRequest] = useState(null);

  async function fetchAPI() {
    const res = await REQUEST_getOrderRequests({
      token: jsCookie.get("token")
    });
    setRequests(res.items);
    setRequestsCount(res.count || 0);
  }

  // async function fetchAPI2() {
  //     // console.log("ID Num",props.id)
  //     console.log(jsCookie.get('token'))
  //     let id = props.id
  //     const resq = await REQUEST_getOrderRequests({ token: jsCookie.get('token'), id  });
  //     // console.log(resq)
  //     setRequest(resq);
  // }

  useEffect(() => {
    fetchAPI();
    // fetchAPI2();
  }, []);

  return (
    <Layout haveSubHeader={true} pageTitle={"Hello World"}>
      <NextSeo
        config={{
          title: `رزرو‌های من | اتولی`,
          description: `رزرو‌های من | اتولی`,
          openGraph: {
            title: `رزرو‌های من | اتولی`,
            description: `رزرو‌های من | اتولی`
          },
          twitter: {
            handle: "@otoli_net",
            site: "@otoli_net",
            cardType: "summary_large_image"
          }
        }}
      />
      <Section justifyCenter={true}>
        <Flex className="wrapper">
          <Box width={2 / 2} px={2}>
            <Item.Group divided style={{ maxWidth: "530px" }}>
              {requestsCount <= -1 ? (
                <>
                  <RequestCardPlaceholder />
                  <RequestCardPlaceholder />
                  <RequestCardPlaceholder />
                </>
              ) : requests.length === 0 ? (
                <p className="NoRequest">در حال حاضر درخواستی ثبت نشده.</p>
              ) : (
                requests.map((value, index) => {
                  const rentDump = value.rent_search_dump;
                  const {
                    has_owner_reviewed_rent_order,
                    has_owner_reviewed_renter,
                    has_renter_reviewed_owner,
                    has_renter_reviewed_rent_order
                  } = value;
                  // console.log(rentDump.coupon);
                  
                  return (
                    <RequestCard
                      no_of_days={rentDump.no_of_days}
                      id={value.id}
                      key={index}
                      status={value.status.id}
                      statusOwner={value.role}
                      ownerInfo={rentDump.owner}
                      renterInfo={value.renter}
                      company_name={rentDump.owner.company_name}
                      carName={`${rentDump.car.brand.name.fa} ${rentDump.car.name.fa}`}
                      start={moment(rentDump.start_date, "jYYYY/jMM/jDD")}
                      end={moment(rentDump.end_date, "jYYYY/jMM/jDD")}
                      price={
                        rentDump.insurance_total_price
                          ? rentDump.coupon
                            ? rentDump.coupon.total_price +
                              rentDump.insurance_total_price
                            : rentDump.insurance_total_price +
                              rentDump.discounted_total_price
                          : rentDump.coupon
                          ? rentDump.coupon.total_price
                          : rentDump.discounted_total_price
                      }
                      ownerName={
                        value.role === "owner"
                          ? `${value.renter.first_name} ${value.renter.last_name}`
                          : `${rentDump.owner.first_name} ${rentDump.owner.last_name}`
                      }
                      avatarImage={
                        value.role === "owner"
                          ? value.renter.image_url
                          : rentDump.owner.thumbnail_url
                      }
                      ownerPhone={
                        value.role === "renter" ? null : value.renter.cell
                      }
                      userID={
                        value.role === "owner"
                          ? value.renter.id
                          : rentDump.owner.id
                      }
                      pelak={{
                        first: rentDump.registration_plate_first_part,
                        second: rentDump.registration_plate_second_part,
                        third: rentDump.registration_plate_third_part,
                        fourth: rentDump.registration_plate_forth_part
                      }}
                      picture={rentDump.media_set[0].url}
                      refresh={fetchAPI}
                      reviewStatus={{
                        has_owner_reviewed_rent_order,
                        has_owner_reviewed_renter,
                        has_renter_reviewed_owner,
                        has_renter_reviewed_rent_order
                      }}
                    />
                  );
                })
              )}
              {/* commented by sajad 980528  `bug fixed` */}
              {/* {(requestsCount <= -1) &&
                                <p>در حال حاضر درخواستی ثبت نشده.</p>
                            } */}
            </Item.Group>
          </Box>
        </Flex>
      </Section>
    </Layout>
  );
};

Requests.getInitialProps = async props => {
  if (typeof window === "undefined") {
    // console.log('Server Side Router Query', props.query);
  } else {
    // console.log('Client side Router Query', props.query);
  }
  const id = props.query.id;
  return {
    namespacesRequired: ["common"],
    id
  };
};

export default Requests;
