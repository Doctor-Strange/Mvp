import * as React from 'react';
import styled from 'styled-components';
import { Section } from '../src/components/row/Sections';
import IndexForm from '../src/components/Forms/IndexForm';
import Layout from '../src/components/Layout';
import { Box, Flex } from '@rebass/grid';
import * as backgroundImage from '../static/back.jpg';
import * as seoImage from '../static/index-landing.jpeg';
import NextSeo from 'next-seo';
import { i18n, Link, withTranslation } from '../src/i18n';

const Page = props => (
  <Layout haveSubHeader={true} pageTitle={'Hello World'} bgImage={backgroundImage}>
    {/* {console.log(`https://otoli.net/${seoImage}`)} */}
     <NextSeo
        config={{
            title: `اتولی | اجاره آسان خودرو`,
            description: `اجاره خودرو`,
            openGraph: {
                title: `اتولی | اجاره آسان خودرو`,
                description: `اجاره خودرو`,
                images: [
                  { url: `https://otoli.net${seoImage}` },
                ],
                site_name: 'اتولی',
            },
            twitter: {
                handle: '@otoli_net',
                site: '@otoli_net',
                cardType: 'summary_large_image',
            },
        }}
    />
    <Section justifyCenter={true}>
      <div className="hero_single version_4">
        <Flex justifyContent="space-around" className="wrapper">
          <Box width={2 / 2} px={2}>
            <h3>اتولی | اجاره آسان خودرو</h3>
            <p>
              ماشینی که دوست دارید رو پیدا کنید و در سریع‌ترین زمان اجاره کنید
            </p>
            <IndexForm t={props.t} />
          </Box>
        </Flex>
      </div>
    </Section>
  </Layout>
)

Page.getInitialProps = async (props) => {
  return {
      namespacesRequired: ['common']
  };
}

export default withTranslation('common')(Page);
