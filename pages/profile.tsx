import React, { useState, useEffect } from "react";
import NextSeo from "next-seo";

import { Section } from "../src/components/row/Sections";
import Layout from "../src/components/Layout";
import { UserCard, BoxCard } from "../src/components/Cards";
import { ShareBar } from "../src/components/ShareBar";
import { REQUEST_getUserCars, REQUEST_getUser } from "../src/API";
import { ResultsCards } from "../src/components/Search";
import jsCookie from "js-cookie";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });
import { Router } from "../routes";

interface IProfile {
  id: number;
  first_name?: string;
  last_name?: string;
  image_url?: string;
  username?: string;
  company_name?: string;
}

const Profile: React.SFC<IProfile> = () => {
  const [user, userSet] = useState({
    id: null,
    first_name: null,
    last_name: null,
    image_url: null,
    username: null,
    company_name: null
  });
  const [results, setRresults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [own, setOwnership] = useState(false);

  async function fetchAPI() {
    const query = Router.router.query.id
      ? {
          id: Router.router.query.id
        }
      : {
          username: Router.router.query.username
        };

    const resUser = await REQUEST_getUser(query);
    if (resUser) {
      userSet({
        id: resUser.id,
        first_name: resUser.first_name,
        last_name: resUser.last_name,
        image_url: resUser.image_url,
        username: resUser.username,
        company_name: resUser.company_name
      });
      if (jsCookie.get("user_id") == resUser.id) {
        setOwnership(true);
      }
      setRresults([]);
      setLoading(true);
      const res = await REQUEST_getUserCars({ id: resUser.id });
      setRresults(res);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <Layout>
      <NextSeo
        config={{
          title: `اجاره خودرو از ${
            user.company_name ? user.company_name : user.first_name
          } ${user.company_name ? "" : user.last_name} | اتولی`,
          description: " حساب کاربری",
          openGraph: {
            title: `اجاره خودرو از ${user.first_name} ${user.last_name} | اتولی`,
            description: " حساب کاربری"
          },
          twitter: {
            handle: "@otoli_net",
            site: "@otoli_net",
            cardType: "summary_large_image"
          }
        }}
      />
      <Section
        justifyCenter={true}
        style={{ marginTop: "24px" }}
        rowClassName="profile_page"
      >
        {user.id && (
          <>
            <ResultsCards
              fetchAPI={fetchAPI}
              results={results}
              loadingResults={loading}
              lodingMore={false}
              noResult={false}
              showMore={false}
              dateURL={null}
              colClass="col-lg-8"
              marginClass=""
              showInProfile={true}
              own={own}
              userOwnPage={own ? true : false}
            />
            <aside className="col-lg-4" id="sidebar">
              <BoxCard style={{ padding: "0px 15px 15px 15px" }}>
                <div className="score">
                  <UserCard
                    id={22}
                    style={{ padding: "16px 25px 0px 25px" }}
                    firstname={user.first_name}
                    lastname={user.last_name}
                    username={user.username}
                    company_name={user.company_name}
                    showexit={true}
                    responceTime="میانگین زمان پاسخگویی: نامشخص"
                    image={user.image_url}
                    own={own}
                  />
                </div>
              </BoxCard>
              <ShareBar />
            </aside>
          </>
        )}
      </Section>
    </Layout>
  );
};

export default Profile;

// start 188
// end 137
