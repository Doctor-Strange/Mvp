import * as React from "react";
import { useState, useEffect, useRef } from "react";
import NextSeo from "next-seo";
import { Item } from "semantic-ui-react";
import { Section } from "../src/components/row/Sections";
import { RequestCard, RequestCardPlaceholder } from "../src/components/Cards";
import Layout from "../src/components/Layout";
import { REQUEST_getOrderRequest } from "../src/API";
import { Box, Flex } from "@rebass/grid";
import jsCookie from "js-cookie";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });
import { Router } from "../routes";
import { toast } from "react-toastify";
import LoginModal from "../src/components/Modals/LoginModal";

const Request = () => {
  const [request, setRequest] = useState(null);

  let loginmodal = useRef(null);
  const doRef = ref => {
    loginmodal = ref;
  };

  async function fetchAPI() {
    const res = await REQUEST_getOrderRequest({
      token: jsCookie.get("token"),
      id: Router.router.query.id
    });
    setRequest(res);
  }
  const myRef = React.createRef();

  useEffect(() => {
    if (!jsCookie.get("token")) {
      loginmodal.handleOpenModal();
    } else if (!jsCookie.get("first_name")) {
      toast.error("ثابت نام خود را کامل کنید", {
        position: "bottom-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      Router.push({ pathname: "/complete-register" });
    }
    fetchAPI();
  }, []);

  const updateInfo = () => {
    fetchAPI();
  };

  return (
    <Layout haveSubHeader={true} pageTitle={"Hello World"}>
      <NextSeo
        config={{
          title: `درخواست اجاره | اتولی`,
          description: `درخواست اجاره | اتولی`,
          openGraph: {
            title: `درخواست اجاره | اتولی`,
            description: `درخواست اجاره | اتولی`
          },
          twitter: {
            handle: "@otoli_net",
            site: "@otoli_net",
            cardType: "summary_large_image"
          }
        }}
      />
      <LoginModal onRef={doRef} updateInfo={updateInfo} />
      <Section justifyCenter={true}>
        <Flex className="wrapper">
          <Box width={2 / 2} px={2}>
            <Item.Group divided style={{ maxWidth: "530px" }}>
              {!request ? (
                <>
                  <RequestCardPlaceholder />
                </>
              ) : (
                [request].map((a, index) => {
                  const value = a.data;
                  const {
                    has_owner_reviewed_rent_order,
                    has_owner_reviewed_renter,
                    has_renter_reviewed_owner,
                    has_renter_reviewed_rent_order,
                    has_insurance
                  } = value;
                  const rentDump = value.rent_search_dump;
                  return (
                    <RequestCard
                      no_of_days={rentDump.no_of_days}
                      id={value.id}
                      key={index}
                      status={value.status.id}
                      statusOwner={value.role}
                      renterInfo={value.renter}
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
                      ownerInfo={rentDump.owner}
                      company_name={rentDump.owner.company_name}
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

export default Request;

// start 175
// end 158
