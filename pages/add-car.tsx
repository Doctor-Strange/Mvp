import * as React from 'react';
import NextSeo from "next-seo";

import { Section } from '../src/components/row/Sections';
import Layout from '../src/components/Layout';
import AddCarForm from '../src/components/Forms/AddCarForm';
import { Box, Flex } from '@rebass/grid';
import { i18n, withTranslation } from '../src/i18n';
import { FORMS_WIDTH } from '../src/constants/env';

export default withTranslation('common')(
  class extends React.Component<{ t: any; openModal?: any; }> {
    static async getInitialProps() {
      return {
        namespacesRequired: ['common']
      };
    }
    state = {
      openModal: () => (null)
    }

    doRef = ref => {
      if (ref) {
        this.header = ref;
        this.setState({ openModal: this.header.onClick })
      }
    };

    render() {
      //console.log(t)
      const { t } = this.props;
      return (
        <Layout haveSubHeader={true} pageTitle={'list Your Car'} onRef={this.doRef}>
          <NextSeo
            config={{
              title: `افزودن خودرو | اتولی`,
              description: `افزودن خودرو | اتولی`,
              openGraph: {
                title:`افزودن خودرو | اتولی`,
              description: `افزودن خودرو | اتولی`,
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
                <AddCarForm
                  t={t}
                  openModal={this.state.openModal}
                />
              </Box>
            </Flex>
          </Section>
        </Layout>
      );
    }
  }
);
