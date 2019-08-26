import * as React from 'react';
import { i18n, Link, withTranslation } from '../src/i18n';

class Error extends React.Component<{ statusCode: any, t: any }> {
  static getInitialProps({ res, err }) {
    let statusCode = null
    if (res) {
      ({ statusCode } = res)
    } else if (err) {
      ({ statusCode } = err)
    }
    return {
      namespacesRequired: ['common'],
      statusCode,
    }
  }

  render() {
    const { statusCode, t } = this.props
    return (
      <p>
        {statusCode
          ? t('error-with-status', { statusCode })
          : t('error-without-status')}
      </p>
    )
  }
}

export default withTranslation('common')(Error)