import * as React from "react";
import NextSeo from "next-seo";

import { Section } from "../src/components/row/Sections";
import Layout from "../src/components/Layout";
import SetCarTimingForm from "../src/components/Forms/SetCarTimingForm";
import { Box, Flex } from "@rebass/grid";
import { i18n, withTranslation } from "../src/i18n";
import { FORMS_WIDTH } from "../src/constants/env";

export default withTranslation("common")(
  class extends React.Component {
    static async getInitialProps(props) {
      return {
        namespacesRequired: ["common"],
        id: props.query.id
      };
    }

    render() {
      return (
        <Layout>
          <NextSeo
            config={{
              title: `تعیین شرایط اجاره | اتولی`,
              description: `تعیین شرایط اجاره | اتولی`,
              openGraph: {
                title: `تعیین شرایط اجاره | اتولی`,
                description: `تعیین شرایط اجاره | اتولی`
              },
              twitter: {
                handle: "@otoli_net",
                site: "@otoli_net",
                cardType: "summary_large_image"
              }
            }}
          />
          <Section justifyCenter={true}>
            <Flex justifyContent="space-around" style={{ width: FORMS_WIDTH }}>
              <Box width={1 / 1} px={2}>
                <SetCarTimingForm id={this.props.id} />
              </Box>
            </Flex>
          </Section>
        </Layout>
      );
    }
  }
);

// start 55
// end 49
