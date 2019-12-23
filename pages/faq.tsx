import * as React from "react";
import NextSeo from "next-seo";
import { Section } from "../src/components/row/Sections";
import Layout from "../src/components/Layout";
import { ContentCard } from "../src/components/Cards";
import { REQUEST_getFAQ } from "../src/API";
import styled from "styled-components";
import Accordion from "../src/components/Accordion/Accordion";
import ContentLoader from "react-content-loader";

const ContentCardTitle = styled.div`
  margin-bottom: 25px;
  h1 {
    font-size: 32px;
    font-size: 2rem;
    margin: 0;
  }
  ul {
    float: right;
    margin: 10px 0 0 0;
    li {
      display: inline-block;
      margin-right: 20px;
      font-weight: 500;
    }
  }
`;

export default class extends React.Component {
  state = {
    items: null
  };
  async GetFaQ() {
    let res = await REQUEST_getFAQ();
    this.setState({
      items: res.items
    });
  }

  componentDidMount = () => {
    this.GetFaQ();
  };

  render() {
    const { items } = this.state;
    return (
      <Layout haveSubHeader={true} pageTitle={"list Your Car"}>
        <NextSeo
          config={{
            title: `سوال‌های پرتکرار | اتولی`,
            description:
              " پاسخگوی تمام سوالات شما در بخش پرسش و پاسخ اتولی هستیم ",
            openGraph: {
              title: `سوال‌های پرتکرار | اتولی`,
              description:
                " پاسخگوی تمام سوالات شما در بخش پرسش و پاسخ اتولی هستیم "
            },
            twitter: {
              handle: "@otoli_net",
              site: "@otoli_net",
              cardType: "summary_large_image"
            }
          }}
        />
        <Section justifyCenter={true} style={{ marginTop: "24px" }}>
          <ContentCard style={{ zIndex: 1 }}>
            ‍
            <ContentCardTitle>
              <h1 style={{ fontSize: "22px" }}>سوالات پرتکرار</h1>
            </ContentCardTitle>
            {items ? (
              items.map((item, i) => {
                return (
                  <div className="FQ_WRAPPER" key={item.id}>
                    {i === 0 ? null : (
                      <h2 style={{ fontSize: "22px" }}>{item.name.fa}</h2>
                    )}
                    <Accordion question_set={item.question_set} />
                  </div>
                );
              })
            ) : (
              <>
                <ContentLoader />
                <ContentLoader />
                <ContentLoader />
              </>
            )}
          </ContentCard>
        </Section>
      </Layout>
    );
  }
}

// start => 155
// end => 94
