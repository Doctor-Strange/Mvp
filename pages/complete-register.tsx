import * as React from 'react';

import { Section } from '../src/components/row/Sections';
import Layout from '../src/components/Layout';
import CompleteRegisterForm from '../src/components/Forms/CompleteRegisterForm';
import { Box, Flex } from '@rebass/grid';
import Router, { withRouter } from 'next/router';
import { i18n, withTranslation } from '../src/i18n';
import { FORMS_WIDTH } from '../src/constants/env';

export default withRouter(withTranslation('common')(
  class extends React.Component<{ t: any, router: any }> {
    static async getInitialProps() {
      return {
        namespacesRequired: ['common']
      };
    }

    render() {
      const { t, router } = this.props;
      return (
        <Layout haveSubHeader={true} pageTitle={'list Your Car'}>
          <Section justifyCenter={true}>
            <Flex justifyContent="space-around" style={{ width: FORMS_WIDTH }}>
              <Box width={1 / 1} px={2}>
                <CompleteRegisterForm
                  strings={{
                    $required_fields: t('required_fields'),
                    $firstname: t('firstname'),
                    $lastname: t('lastname'),
                    $national_id: t('national_id'),
                    $phone_number: t('phone_number'),
                    $day: t('day'),
                    $month: t('month'),
                    $year: t('year'),
                    $year_hint: t('year_hint'),
                    $email: t('email') + ' (' + t('optional') + ')',
                    $password: t('password'),
                    $subscribe_checkbox: t('subscribe_checkbox'),
                    $signup: t('signup'),
                    $new_client: t('new_client'),
                    $agreement_sentence: t('agreement_sentence'),
                    $birthdate: t('birthdate')
                  }}
                  query={router.query}
                />
              </Box>
            </Flex>
          </Section>
        </Layout>
      );
    }
  }
));
