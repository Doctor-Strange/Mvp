import * as React from "react";
import NextSeo from "next-seo";
import { useState, useEffect } from "react";
import { Item } from "semantic-ui-react";
import { Section } from "../src/components/row/Sections";
import { RequestCard, RequestCardPlaceholder } from "../src/components/Cards";
import Layout from "../src/components/Layout";
import { REQUEST_getOrderRequests } from "../src/API";
import { Box, Flex } from "@rebass/grid";
import jsCookie from "js-cookie";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

const Requests = () => {
  const [requests, setRequests] = useState([{}]);
  const [requestsCount, setRequestsCount] = useState(-1);

  async function fetchAPI() {
    const res = await REQUEST_getOrderRequests({
      token: jsCookie.get("token")
    });
    setRequests(res.items);
    setRequestsCount(res.count || 0);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <Layout>
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
                    has_renter_reviewed_rent_order,
                    has_insurance
                  } = value;

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
                        has_insurance
                          ? rentDump.coupon
                            ? rentDump.coupon.discounted_price +
                              rentDump.insurance_total_price
                            : rentDump.insurance_total_price +
                              rentDump.discounted_total_price
                          : rentDump.coupon
                          ? rentDump.coupon.discounted_price
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
            </Item.Group>
          </Box>
        </Flex>
      </Section>
    </Layout>
  );
};

export default Requests;

// start 175
// end 138
