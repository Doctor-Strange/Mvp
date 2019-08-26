import * as React from 'react';

import { Section } from '../src/components/row/Sections';
import Layout from '../src/components/Layout';
import SetCarTimingForm from '../src/components/Forms/SetCarTimingForm';
import { Box, Flex } from '@rebass/grid';
import { i18n, withTranslation } from '../src/i18n';
import { FORMS_WIDTH } from '../src/constants/env';

export default withTranslation('common')(
  class extends React.Component<{ t: any }> {
    static async getInitialProps(props) {
      if (typeof window === 'undefined') {
        //console.log('Server Side Router Query', props.query);
      } else {
        //console.log('Client side Router Query', props.query);
      }
      return {
        namespacesRequired: ['common'],
        id: props.query.id
      };
    }

    render() {
      const { t } = this.props;
      return (
        <Layout haveSubHeader={true} pageTitle={'list Your Car'}>
          <Section justifyCenter={true}>
            <Flex justifyContent="space-around" style={{ width: FORMS_WIDTH }}>
              <Box width={1 / 1} px={2}>
                <SetCarTimingForm t={t} id={this.props.id} />
              </Box>
            </Flex>
          </Section>
        </Layout>
      );
    }
  }
);
