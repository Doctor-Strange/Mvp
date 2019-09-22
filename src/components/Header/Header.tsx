import * as React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Nav } from '../Nav';
import { Logo } from '../Logo';
import Router from 'next/router';
import Link from 'next/link';
import { i18n, withTranslation } from '../../i18n';
import ReactModal from 'react-modal';
import LoginModal from '../Modals/LoginModal';
import { connect } from '../../store';
import { ITheme } from "../../theme/Interfaces";

const HeaderSticky = styled.div`
  height: 64px;
  padding-top: 12px;
  background-color: ${({theme}:{theme:ITheme}) => theme.color.darkBackground};
  @media (max-width: 767px) {
    padding:0;
    height: 56px;
    .main-menu {
      top: 16px;
    }
  }
  #logo {
    float: left;
    @media (max-width: 991px) {
      position: absolute;
      top: 12px;
      left: 12px;
      img {
        float: left;
        width: auto;
        height: 28px;
      }
    }
  }

  @media (max-width: 991px) {
    .header_in #logo img {
      margin: 0;
    }
  }

  a.btn_add,
  .btn_add {
    border: none;
    color: #fff;
    background: ${({theme}:{theme:ITheme}) => theme.color.mainForeground};
    outline: none;
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
    color: #fff !important;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
    border-radius: 3px;
    line-height: 1 !important;
    padding: 10px 15px !important;
    position: relative;
    top: 2px;

    @media (max-width: 991px) {
      display: none;
    }

    :hover {
      background-color: #ffc107;
      color: #222 !important;
      opacity: 1 !important;
    }
  }
  .img-header {
    height: 24px;
    width: 24px;
    border-radius: 999em;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.13)
  }
`;

class Header extends React.Component<{
  headerBtn: string;
  openMenu: any;
  changeLang: any;
  user: any;
  onRef?: any;
}> {
  [x: string]: any;
  constructor(props) {
    super(props);
  }

  onClick = () => {
    this.loginmodal.handleOpenModal(); // do stuff
  };

  logout = () => {
    // alert('Loging out...');
    // localStorage.removeItem('token');
    // localStorage.removeItem('first_name');
    // localStorage.removeItem('last_name');
    // this.setState({
    //   token: '',
    //   firstName: '',
    //   lastName: ''
    // });
  };

  doRef = ref => {
    this.loginmodal = ref;
  };

  updateInfo = () => { }

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  render() {
    let { t, user } = this.props;
    // console.log(user);
    if (!user) {
      user = { token: "", user_id: "", phone: "", first_name: "", last_name: "" };
    }
    const { token, user_id, phone, first_name, last_name } = user;
    return (
      <>
        <HeaderSticky>
          <header>
            <div className="container">
              <div className="row">
                <div className="col-lg-3" style ={{position:"relative",zIndex:"20"}}>
                  <Logo />
                </div>
                <div className="col-lg-9 hidden_mobile">
                  <Nav>
                    <>
                      <li>
                        {!token && (
                          <a
                            href="#"
                            id="sign-in"
                            className="login"
                            // commented by sajad saderi 
                            // title={t('signin')}
                            title={t('ورود/ثبت نام')}
                            onClick={this.onClick}
                          >
                            {/* commented by sajad saderi */}
                            {/* {t('signin')} */}
                            {t('ورود/ثبت نام')}

                          </a>
                        )}
                        {token && (
                          <span>
                            <a href={`/profile?id=${user_id}`}>
                              {first_name} {last_name}
                              {' '}
                              {/* <Icon name="user circle" size='big' className="img-header" /> */}
                              <img
                                src={localStorage["ImageUrl"] || "https://core.otoli.net/static/core/default_profile_pic.png" }
                                className="img-header"
                                alt=""
                              />
                            </a>
                          </span>
                        )}
                      </li>
                    </>
                  </Nav>
                </div>
                <div className="col-lg-9 justInMobile">
                  <Nav isMobile={true}>
                    <>
                      <li>
                        {!token && (
                          <a
                            href="#"
                            id="sign-in"
                            className="login"
                            // commented by sajad saderi 
                            // title={t('signin')}
                            title={t('ورود/ثبت نام')}
                            onClick={this.onClick}
                          >
                            {/* {t('signin')} */}
                            {t('ورود/ثبت نام')}
                          </a>
                        )}
                        {token && (
                          <span>
                            <a href={`/profile?id=${user_id}`}>
                              {first_name} {last_name}
                              {' '}
                              <Icon name="user circle" size='big' className="img-header" />
                              {/* <img
                                src={"https://core.otoli.net/static/core/default_profile_pic.png"}
                                className="img-header"
                                alt=""
                              /> */}
                            </a>
                          </span>
                        )}
                      </li>
                    </>
                  </Nav>
                </div>
              </div>
            </div>
          </header>
        </HeaderSticky>

        <LoginModal onRef={this.doRef} updateInfo={this.updateInfo} />
      </>
    );
  }
}

export default withTranslation('common')(connect(state => state)(Header));