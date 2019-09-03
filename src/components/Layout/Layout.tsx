import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  Header as SemanticHeader,
  Icon,
  Menu,
  Segment,
  Sidebar
} from 'semantic-ui-react';
import { rtlTheme, ltrTheme, lightTheme, darkTheme, spacing} from '../../theme';
import { Header, SubHeader } from '../Header';
import Footer from '../Footer';
import Head from 'next/head';
import Link from 'next/link';
import { i18n, withTranslation } from '../../i18n';
import { actions } from "../../store";
import { ITheme } from "../../theme/Interfaces";


class Layout extends React.Component<{
  haveSubHeader: boolean;
  pageTitle: string;
  t: any;
  changeLang: any;
  bgImage?: string;
}> {
  [x: string]: any;

  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    };
  }

  state = { visible: false };

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

  componentDidMount() {
    if (this.props.onRef) this.props.onRef(this);
  }
  componentWillUnmount() {
    if (this.props.onRef) this.props.onRef(undefined);
  }

  // componentWillReceiveProps = (props) =>{
  //   console.log("props ===>",props)
  // }

  doRef = ref => {
    if (ref) this.header = ref.loginmodal;
  };

  onClick = () => {
    this.header.handleOpenModal(); // do stuff 2
  };

  render() {
    const directionTheme = i18n.language == 'en' ? ltrTheme : rtlTheme;
    // console.log("i18n.language: ", i18n.language);
    const { t, pageTitle, children, bgImage } = this.props;
    const theme: ITheme = {
      lang: i18n.language,
      direction: directionTheme,
      color: lightTheme,
      spacing: spacing,
    }
    return (
      <ThemeProvider
        theme={theme}
      >
        <div id="layout" className={theme.direction.direction}>
          <Head>
          <script  dangerouslySetInnerHTML={{
          __html: `<!-- Google Tag Manager -->
          <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TN3MV4L');</script>
          <!-- End Google Tag Manager -->`,
        }}>
        </script>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          </Head><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TN3MV4L"
          height="0" width="0" style={{display:"none",visibility:"hidden"}}></iframe>


          <Header
            onRef={this.doRef}
            openMenu={this.handleShowClick}
            headerBtn={t('add_car')}
            changeLang={() => actions.changeLang()}
          />
          {this.propshaveSubHeader ? <SubHeader title={pageTitle} /> : null}
          <div style={{
            background: `url(${bgImage}) no-repeat 50%/cover`,
            backgroundPositionY: '60%',
            // minHeight: '80vh'
          }}>{children}</div>
          <Footer changeLangFunc={() => actions.changeLang()} />
        </div>
        {/* </Sidebar.Pusher>
        </Sidebar.Pushable> */}
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ }) => ({});

export default withTranslation('common')(Layout);
