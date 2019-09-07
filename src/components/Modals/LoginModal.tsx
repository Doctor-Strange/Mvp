import * as React from 'react';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import { Button, Form, Input } from 'formik-semantic-ui';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Countdown from 'react-countdown-now';
import { LoginForm, PhoneRow } from './LoginStyle';
import { ModalWrapper } from './ModalWrapper';
import { PanelsWrapper } from '../Carousel/PanelsWrapper';
import { Panel } from '../Carousel/Panel';
// import { mobileNumberOptions } from '../../constants/options';
import { i18n, withTranslation } from '../../i18n';
import { ltrTheme, rtlTheme } from '../../theme/Directions';
import { actions } from "../../store";

function convertToEnglishNum(s) {
  const a = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const p = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  for (let i = 0; i < 10; i++) {
    s = s.replace(new RegExp(a[i], 'g'), i).replace(new RegExp(p[i], 'g'), i);
  }
  return s;
}
interface LoginModalValues {
  phone: number;
}

interface LoginModalCodeValues {
  code: number;
}

export default withTranslation('common')(
  class extends React.Component<
    { onRef: any; t: any, updateInfo: any },
    {
      showIndex: number;
      prevIndex: number;
      phone?: string;
      code?: number;
      timeToSendSMSAgain?: number;
      codeError?: string;
      height: number;
    }
    > {
    [x: string]: any;
    constructor(props) {
      super(props);
      this.state = {
        phone: '',
        timeToSendSMSAgain: null,
        codeError: null,
        prevIndex: 0,
        showIndex: 0,
        height: 245
      };
      this.nextPanel = this.nextPanel.bind(this);
      this.prevPanel = this.prevPanel.bind(this);
    }
    handleOpenModal = () => {
      this.modalwrapper.handleOpenModal(); // do stuff
    };

    handleCloseModal = () => {
      this.modalwrapper.handleCloseModal(); // do stuff
    };

    componentDidMount() {
      this.props.onRef(this);
    }
    componentWillUnmount() {
      this.props.onRef(undefined);
    }

    nextPanel() {
      if (this.state.showIndex + 1 > 2) return;
      this.setState({
        prevIndex: this.state.showIndex,
        showIndex: this.state.showIndex + 1,
        height: 290,
        codeError: null
      });
    }

    prevPanel() {
      if (this.state.showIndex - 1 < 0) return;
      this.setState({
        prevIndex: this.state.showIndex,
        showIndex: this.state.showIndex - 1,
        height: 280,
        codeError: null
      });
    }

    renderTimeTOSend = ({ hours, minutes, seconds, completed }) => {
      const { t } = this.props;
      if (completed) {
        return (
          <span style={{ cursor: 'pointer' }} onClick={() => this.prevPanel()}>
            ارسال مجدد
          </span>
        );
      } else {
        return (
          <span style={{ cursor: 'default', paddingTop: '8px' }}>
            ارسال مجدد کد {seconds}
          </span>
        );
      }
    };

    render() {
      const { t, updateInfo } = this.props;
      const theme = i18n.language == 'fa' ? rtlTheme : ltrTheme;
      return (
        <ThemeProvider
          theme={{
            lang: i18n.language,
            direction: theme
          }}
        >
          <ModalWrapper
            title={''}
            onRef={ref => (this.modalwrapper = ref)}
            direction={theme.direction}
            height={this.state.height}
          >
            <PanelsWrapper
              showIndex={this.state.showIndex}
              prevIndex={this.state.prevIndex}
            >
              <Panel>
                <Form
                  initialValues={{ phone: Number(this.state.phone) || null }}
                  onSubmit={(
                    values: LoginModalValues,
                    formikActions: FormikActions<LoginModalValues>
                  ) => {
                    let validPhoneFormated;
                    const phone = convertToEnglishNum(values.phone.toString());
                    if (/^[0][9][0-5][0-9]{8,8}$/.test(phone)) {
                      validPhoneFormated = phone;
                    } else if (/^[9][0-5][0-9]{8,8}$/.test(phone)) {
                      validPhoneFormated = '0' + phone;
                    } else {
                      validPhoneFormated = phone;
                    }
                    axios
                      .post(process.env.PRODUCTION_ENDPOINT + '/core/device/send-code', {
                        cell: validPhoneFormated
                      })
                      .then(response => {
                        if (response.data.success) {
                          this.setState({
                            phone: validPhoneFormated,
                            timeToSendSMSAgain: Date.now() + 30000
                          });
                          this.nextPanel();
                        }
                      })
                      .catch(error => {
                        // tslint:disable-next-line:no-console
                        console.error("Error in LoginModal Happend:");
                        console.error(error.response.data);
                      })
                      .then(() => {
                        formikActions.setSubmitting(false);
                      });
                  }}
                  validationSchema={Yup.object().shape({
                    phone: Yup.string()
                      .matches(
                        /(^[0][9][0-5][0-9]{8,8}$|^[9][0-5][0-9]{8,8}$|^[\u06F0][\u06F9][\u06F1-\u06F2][\u06F0-\u06F9]{8,8}$|^[\u06F9][\u06F1-\u06F2][\u06F0-\u06F9]{8,8}$)/,
                        "شماره‌ موبایل صحیح نیست"
                      )
                      .required("لطفا شماره موبایل را وارد کنید")
                      .typeError("لطفا شماره موبایل را وارد کنید")
                  })}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    isSubmitting,
                    values,
                    errors,
                    touched
                  }) => (
                      <LoginForm
                      style={{textAlign:"right"}}
                        onSubmit={handleSubmit}
                        className="sign-in-wrapper"
                      >
                        <label>شماره تلفن همراه</label>
                        <Input
                          name="phone"
                          inputProps={{
                            type: 'tel',
                            tabIndex: this.state.showIndex === 0 ? 0 : -1,
                            className: 'add_top_8',
                            placeholder: "لطفا شماره همراه خود را وارد کنید"
                          }}
                        />

                        <div className="text-center">
                          <Button.Submit
                            loading={isSubmitting}
                            primary
                            type="submit"
                            className="btn_1 full-width"
                            tabIndex={this.state.showIndex === 0 ? 0 : -1}
                          >
                            ارسال کد ورود
                          </Button.Submit>
                          {/* <br />
                        <small>ما از شماره‌ی شما سوءاستفاده نمی‌کنیم </small> */}
                        </div>
                        {/* <div className="divider">
                        <span>{t('or')}</span>
                      </div>
                      <Button
                        style={{ width: '100%' }}
                        color="google plus"
                        content={t('login_with_google')}
                        icon="google"
                        labelPosition="left"
                        tabIndex={this.state.showIndex === 0 ? 0 : -1}
                      /> */}
                      </LoginForm>
                    )}
                </Form>
              </Panel>
              <Panel>
                <Form
                  initialValues={{ code: null }}
                  onSubmit={(
                    values: LoginModalCodeValues,
                    formikActions: FormikActions<LoginModalCodeValues>
                  ) => {
                    axios
                      .post(process.env.PRODUCTION_ENDPOINT + '/core/device/login', {
                        cell: this.state.phone,
                        code: convertToEnglishNum(values.code)
                      })
                      .then(response => {
                        if (response.data.token && !response.data.has_name) {
                          this.setState({
                            code: convertToEnglishNum(values.code),
                            codeError: null,
                            timeToSendSMSAgain: null
                          });
                          // sign user in store
                          actions.signin({
                            user_id: response.data.user_profile.id,
                            token: response.data.token,
                            phone: this.state.phone,
                            complete_register: true,
                          });
                          this.handleCloseModal();
                          let go_to_pathname = Router.pathname;
                          let go_to_queries = Router.query;
                          // console.log(go_to_queries);
                          Router.push({
                            pathname: '/complete-register', query: {
                              cell: this.state.phone,
                              token: response.data.token,
                              go_to_pathname,
                              go_to_queries: Object.keys(go_to_queries).map(function (k) {
                                return encodeURIComponent(k) + '=' + encodeURIComponent(go_to_queries[k])
                              }).join('&')
                            }
                          }, {
                              pathname: '/complete-register'
                            });
                        } else if (
                          response.data.token &&
                          response.data.has_name
                        ) {
                          // let also get user name and last name and them sign them in
                          axios
                            .post(
                              process.env.PRODUCTION_ENDPOINT + '/core/user/info',
                              {},
                              {
                                headers: {
                                  Authorization: 'Bearer ' + response.data.token
                                }
                              }
                            )

                            .then(response2 => {
                              // now lets sign them in
                              // console.log(response);
                              actions.signin({
                                user_id: response.data.user_profile.id,
                                token: response.data.token,
                                phone: this.state.phone,
                                first_name: response2.data.data.first_name,
                                last_name: response2.data.data.last_name
                              });
                              this.handleCloseModal();
                              updateInfo();
                            });
                        } else {
                          // tslint:disable-next-line:no-console
                          console.error('error');
                          // TODO: handle errors
                        }
                      })
                      .catch(error => {
                        // tslint:disable-next-line:no-console
                        console.error("Error in LoginModal Happend:");
                        console.error(error.response.data);
                        this.setState({
                          codeError: error.response.data.message
                        });
                      })
                      .then(() => {
                        formikActions.setSubmitting(false);
                      });
                  }}
                  validationSchema={Yup.object().shape({
                    code: Yup.number()
                      .required( "لطفاً کد را وارد کنید.")
                      .typeError("لطفاً فیلد را پر کنید")
                  })}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    isSubmitting,
                    values,
                    errors,
                    touched
                  }) => (
                      <LoginForm className="sign-in-wrapper" style={{textAlign:"right"}}>
                        <div className="form-group">
                          <label>
                            {/* {`کد ورود به شماره ${this.state.phone} پیامک شد `} */}
                            کد چهار رقمی که به موبایل شما اس‌ام‌اس شده را وارد کنید
                            {/* <a
                              className="small"
                              onClick={this.prevPanel}
                              style={{ cursor: 'pointer' }}
                              tabIndex={this.state.showIndex === 1 ? 0 : -1}
                            >
                              ویرایش شماره
                            </a> */}
                          </label>
                          {/* <div className="notShowErrors"> */}
                          <Input
                            name="code"
                            inputProps={{
                              type: 'number',
                              tabIndex: this.state.showIndex === 1 ? 0 : -1,
                              className: 'add_top_8',
                              placeholder: "لطفا کد را وارد کنید"
                            }}
                          />
                          <a
                              className="small"
                              onClick={this.prevPanel}
                              style={{ cursor: 'pointer',marginTop:"-13px",display:"block",marginBottom: "18px" }}
                              tabIndex={this.state.showIndex === 1 ? 0 : -1}
                            >
                              ویرایش شماره
                            </a>
                        </div>
                        <span className="sui-error-message">
                          {this.state.codeError || null}
                        </span>
                        {/* </div> */}
                        <div className="clearfix add_bottom_15 flow-root">
                          <a
                            tabIndex={this.state.showIndex === 1 ? 0 : -1}
                            className="small"
                            href="javascript:void(0);"
                          >
                            <Countdown
                              date={this.state.timeToSendSMSAgain}
                              renderer={this.renderTimeTOSend}
                            />
                          </a>
                        </div>
                        <div className="text-center">
                          <Button.Submit
                            loading={isSubmitting}
                            primary
                            type="submit"
                            className="btn_1 full-width"
                            tabIndex={this.state.showIndex === 0 ? 0 : -1}
                          >
                            ورود
                          </Button.Submit>
                        </div>
                      </LoginForm>
                    )}
                </Form>
              </Panel>
            </PanelsWrapper>
          </ModalWrapper>
        </ThemeProvider>
      );
    }
  }
);
