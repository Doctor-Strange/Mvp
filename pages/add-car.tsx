import * as React from 'react';
import NextSeo from "next-seo";

import { Section } from '../src/components/row/Sections';
import Layout from '../src/components/Layout';
import AddCarForm from '../src/components/Forms/AddCarForm';
import { Box, Flex } from '@rebass/grid';
import { i18n, withTranslation } from '../src/i18n';
import { FORMS_WIDTH } from '../src/constants/env';
import jsCookie from "js-cookie";
import { toast } from 'react-toastify';
import Router from 'next/router';


export default withTranslation('common')(
  class extends React.Component<{ t: any; openModal?: any; }> {
    static async getInitialProps(props) {
      return {
        edit_mode : props.query.edit === 'true' ? true: false,
        car_id : props.query.edit === 'true' ? props.query.car_id: false,
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

    componentDidMount =() =>{
      if (!jsCookie.get('first_name')) {
        toast.error('ثابت نام خود را کامل کنید', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
        Router.push({ pathname: '/complete-register' })
        return
    }
    }

    render() {
      const { t, edit_mode ,car_id} = this.props;
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
                  edit_mode = {edit_mode}
                  car_id={car_id}
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
