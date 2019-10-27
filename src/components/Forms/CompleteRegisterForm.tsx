// import {  } from 'formik-semantic-ui';
import { Formik, FormikActions, withFormik } from 'formik';
import * as React from 'react';
import styled from 'styled-components';
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Label,
  Message,
  Radio,
  Segment,
  TextArea
} from 'semantic-ui-react';
import {
  isBrowser,
  isMobile
} from "react-device-detect";
import Error404 from '../404';
import { i18n, withTranslation } from '../../i18n';
import { actions } from '../../store';
import Router from 'next/router';
import * as Yup from 'yup';
import axios from 'axios';
import jsCookie from 'js-cookie';
import * as NewUser from '../../../static/new_user.svg';
import { Box, Flex } from '@rebass/grid';
import { monthsEnglish, monthsFarsi } from '../../constants/options';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../../utils/numbers';
import Laws from '../Modals/Laws';




function clearNumber(x) {
  return Number(convertNumbers2English(x.toString())
    .replace(/,/g, '')
    .replace(/\./g, '')
    .replace(/\D/g, ''));
}

const BoxAccount = styled.div`
  margin-bottom: 25px;
  margin-top: 25px;
  h3 {
    font-size: 21px;
    font-size: 1.3125rem;
    padding-left: 30px;
    padding-right: 30px;
    height: 30px;
    padding-top: 5px;
    display: inline-block;
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    &.new_client {
      background: url(${NewUser}) center left no-repeat;
    }
  }
  #selectBox {
    height:18px;
    display: inline-block;
    width:27px !important;
    margin-left: 4px;
    vertical-align: middle;
  }
  .selection {
    font-size: 14px;
    border-radius: 3px;
    border: 1px solid #d2d8dd;
    &.wide {
      width: 100%;
    }
  }
  input[name="day"] {
    margin-bottom: 0px !important;
  }

  input,.dropdown[name="month"]{
    height:48px;
  }
`;

interface ICompleteRegisterFormValues {
  firstName: string;
  lastName: string;
  nationalid: string;
  emailAddress: string;
  password: string;
  day: number;
  month: number;
  year: number;
  subscribe: boolean;
}

export default withTranslation('common')(
  class CompleteRegisterForm extends React.Component<{
    strings: object;
    success: boolean;
    name: string;
    query?: any;
    user: any;
  }> {
    state = {
      error: '',
      name: null,
      success: false,
      checkbox: false
    };

    constructor(props) {
      super(props);
    }

    onClick = () => {
      this.loginmodal.handleOpenModal(); // do stuff
    };

    doRef = ref => {
      this.loginmodal = ref;
    };
    updateInfo = () => { }

    onResult = (result) =>{
      this.setState(pre =>{
        return {
          checkbox : !pre.checkbox
        }
      })
    }

    render() {
      const {
        $required_fields,
        $firstname,
        $lastname,
        $national_id,
        $phone_number,
        $day,
        $month,
        $year,
        $year_hint,
        $email,
        $password,
        $subscribe_checkbox,
        $signup,
        $new_client,
        $agreement_sentence,
        $birthdate
      } = this.props.strings;
      const { error } = this.state;
      const token = jsCookie.get('token');
      const userId = jsCookie.get('user_id');
      const { t, query } = this.props;
      if (token) {
        return (
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              nationalid: '',
              emailAddress: '',
              password: '',
              day: null,
              month: null,
              year: null,
              subscribe: false
            }}
            onSubmit={(
              values: ICompleteRegisterFormValues,
              formikActions: FormikActions<ICompleteRegisterFormValues>
            ) => {
              formikActions.setSubmitting(true);
              this.setState({ error: '' });
              // console.log(values);
              const {
                firstName,
                lastName,
                nationalid,
                emailAddress,
                password,
                day,
                month,
                year,
                subscribe
              } = values;
              axios
                .post(
                  process.env.PRODUCTION_ENDPOINT + '/core/user/update',
                  {
                    first_name: firstName,
                    last_name: lastName,
                    national_id: convertNumbers2English(nationalid),
                    birth_date: `${year}/${month}/${day}`,
                    email: emailAddress,
                    is_ok_to_get_emails: false
                  },
                  {
                    headers: {
                      Authorization: 'Bearer ' + token
                    }
                  }
                )
                .then(response => {
                  if (response.data.success) {
                    // console.log(response.data);
                    // localStorage["complete_register"] = true
                    this.setState({
                      success: response.data.success,
                      error: ''
                    });
                    actions.completeRegister({
                      first_name: firstName,
                      last_name: lastName,
                      complete_register: false
                    });
                    // let path_to_go = `/profile?id=${userId}`;
                    // console.log(query);
                    // if (query.go_to_pathname) {
                    //   // fixme
                    //   path_to_go = decodeURIComponent(query.go_to_pathname) + decodeURIComponent("?") + decodeURIComponent(query.go_to_queries);
                    // }
                    if(localStorage["URL"]){
                      // window.location.href = localStorage["URL"]
                      Router.push({
                        pathname: localStorage["URL"]
                      })
                    }else{

                      Router.push({
                        pathname: '/profile',
                        query: { id: userId },
                      })
                    }
                    // Router.push(path_to_go, {
                    //   pathname: path_to_go
                    // }
                  //   ,{ shallow: true })
                  //     .then(() => window.scrollTo(0, 0));
                  }
                })
                .catch(error => {
                  // tslint:disable-next-line:no-console
                  console.error(error);
                  this.setState({ error, success: false });
                })
                .then(() => {
                  formikActions.setSubmitting(false);
                });
              setTimeout(() => {
                // console.log(values);
                this.setState({
                  name: values.firstName + ' ' + values.lastName
                });
                formikActions.setSubmitting(false);
              }, 3000);
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string().required(
                t('forms.error_filed_required1') +
                $firstname +
                t('forms.error_filed_required2')
              ).min(2, t('forms.error_name_must_be_2_char_long'))
                .max(30, t('forms.error_name_must_be_30_char_long')),
              lastName: Yup.string().required(
                t('forms.error_filed_required1') +
                $lastname +
                t('forms.error_filed_required2')
              ).min(2, t('forms.error_lastname_must_be_2_char_long'))
                .max(30, t('forms.error_lastname_must_be_30_char_long')),
              nationalid: Yup.string()
                .ensure() // convert undefined values to an empety string
                .trim()
                .required('')
                .length(10, t('forms.error_nationalID_10_char'))
                .test(
                  'Validate National ID',
                  t('forms.error_nationalID_not_valid'),
                  value => {
                    const check = parseInt(value[9], 10);
                    let sum = 0;
                    let i;
                    for (i = 0; i < 9; ++i) {
                      sum += parseInt(value[i], 10) * (10 - i);
                    }
                    sum %= 11;

                    return (
                      (sum < 2 && check == sum) ||
                      (sum >= 2 && check + sum == 11)
                    );
                  }
                ),
              emailAddress: Yup.string().email(
                t('forms.error_email_not_valid')
              ),
              day: Yup.number()
                .typeError(
                  t('forms.error_filed_required1') +
                  $day +
                  t('forms.error_filed_required2')
                )
                .required(
                  t('forms.error_filed_required1') +
                  $day +
                  t('forms.error_filed_required2')
                )
                .min(1, t('forms.error_day_not_valid'))
                .max(31, t('forms.error_day_not_valid')),
              month: Yup.number()
                .typeError(
                  t('forms.error_filed_required1') +
                  $month +
                  t('forms.error_filed_required2')
                )
                .required(
                  t('forms.error_filed_required1') +
                  $month +
                  t('forms.error_filed_required2')
                ),
              year: Yup.number()
                .typeError(
                  t('forms.error_filed_required1') +
                  $year +
                  t('forms.error_filed_required2')
                )
                .required(
                  t('forms.error_filed_required1') +
                  $year +
                  t('forms.error_filed_required2')
                )
                .min(1300, t('forms.error_year_not_valid'))
                .max(1398, t('forms.error_year_not_valid'))
            })}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
              setFieldValue,
              submitCount,
              values,
              errors,
              touched
            }) => {
              let nameErrors = (errors.firstName && touched.firstName) || (errors.lastName && touched.lastName);
              return (
                <BoxAccount className="box_account">
                  <Laws onRef={this.doRef} updateInfo={this.updateInfo} result= {this.onResult}/>
                  <Form onSubmit={handleSubmit}>
                    <h3 className="new_client">{$new_client}</h3>
                    {/* <small className="float-right pt-2">* {$required_fields}</small> */}
                    <Segment>
                      <Form.Group widths="2">
                        <Form.Input
                          label={$firstname}
                          name="firstName"
                          error={Boolean(errors.firstName && touched.firstName)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                        />

                        <Form.Input
                          label={$lastname}
                          name="lastName"
                          error={Boolean(errors.lastName && touched.lastName)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                        />
                      </Form.Group>
                      {nameErrors && (
                        <label className="sui-error-message sui-padd">
                          {errors.firstName || errors.lastName}
                        </label>
                      )}

                      <div className="field">
                        <label>{$national_id}</label>
                        <Input
                          // type={isMobile ? "number" : "text"}
                          name="nationalid"
                          error={Boolean(errors.nationalid && touched.nationalid)}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(data.name, convertNumbers2English(data.value));
                            }
                          }}
                          onBlur={handleBlur}
                          value={values.nationalid
                            ? convertNumbers2Persian(values.nationalid)
                            : values.nationalid
                          }
                        >
                          <input style={{ marginBottom: '0px !important' }} inputMode='numeric' /* novalidate pattern="[0-9]*/ />
                        </Input>
                        {errors.nationalid && touched.nationalid && (
                          <span className="sui-error-message">
                            {errors.nationalid}
                          </span>
                        )}
                      </div>

                      {/* <Form.Field>
                <label>{$phone_number}</label>
                <input name="phone" value={this.state.phone} disabled />
              </Form.Field> */}

                      <Form.Group widths="3" className="paddingInMobile">

                        <div className="field">
                          <label>{$birthdate}</label>
                          <Input
                            name="day"
                            type="text"
                            placeholder={$day}
                            // min="1"
                            // max="31"
                            error={Boolean(errors.day && touched.day)}
                            onChange={(e, data) => {
                              if (data && data.name) {
                                setFieldValue(data.name, clearNumber(convertNumbers2English(data.value)));
                              }
                            }}
                            onBlur={handleBlur}
                            value={values.day
                              ? convertNumbers2Persian(values.day)
                              : values.day
                            }
                          >
                            <input style={{ marginBottom: '0px !important' }} inputMode='numeric' /* novalidate pattern="[0-9]*/ />
                          </Input>
                        </div>

                        {/* {isBrowser && */}
                          <Form.Dropdown
                            // label={$month}
                            name="month"
                            id="month"
                            label={isMobile &&"ماه"}
                            placeholder={$month}
                            clearable
                            selection
                            options={
                              i18n.language === 'en' ? monthsEnglish : monthsFarsi
                            }
                            style={{ marginTop: isMobile ? "0px" :'25px' }}
                            error={Boolean(errors.month && touched.month)}
                            onChange={(e, data) => {
                              if (data && data.name) {
                                setFieldValue(data.name, data.value);
                              }
                            }}
                            value={values.month}
                          />
                        {/* } */}
                        {/* {isMobile &&
                          <div className="field">
                            <label>{$month}</label>
                            <select
                              name="month"
                              className={
                                Boolean(errors.month && touched.month) ?
                                  "ui search selection dropdown error" :
                                  "ui search selection dropdown noterror"
                              }
                              value={values.month}
                              onChange={(e) => {
                                // console.log(e.target.value);
                                if (e.target && e.target.name) {
                                  setFieldValue(e.target.name, Number(e.target.value));
                                }
                              }}
                              onBlur={handleBlur}
                              style={{ display: 'block' }}
                            >
                              <option value={""} label={""} hidden />
                              {monthsFarsi.map((item, index) => (
                                <option key={index} value={item.value} label={item.text} />
                              ))}
                            </select>
                          </div>
                        } */}

                        {isBrowser &&
                          <Form.Input
                            name="year"
                            type="text"
                            // min="1300"
                            // max="1397"
                            inputMode='numeric' /* novalidate pattern="[0-9]*/
                            placeholder={$year + $year_hint}
                            style={{ marginTop: '25px' }}
                            error={Boolean(errors.year && touched.year)}
                            onChange={(e, data) => {
                              if (data && data.name) {
                                setFieldValue(data.name, convertNumbers2English(data.value));
                              }
                            }}
                            onBlur={handleBlur}
                            value={values.year
                              ? convertNumbers2Persian(values.year)
                              : values.year
                            }
                          />
                        }
                        {isMobile &&
                          <div className="field">
                            <label>{$year}</label>
                            <Input
                              name="year"
                              type="text"
                              // min="1300"
                              // max="1397"
                              placeholder={$year + $year_hint}
                              error={Boolean(errors.year && touched.year)}
                              onChange={(e, data) => {
                                if (data && data.name) {
                                  setFieldValue(data.name, convertNumbers2English(data.value));
                                }
                              }}
                              onBlur={handleBlur}
                              value={values.year
                                ? convertNumbers2Persian(values.year)
                                : values.year
                              }
                            >
                              <input style={{ marginBottom: '0px !important' }} inputMode='numeric' /* novalidate pattern="[0-9]*/ />
                            </Input>
                          </div>
                        }
                      </Form.Group>
                      {/* {(errors.day || errors.month || errors.year) &&
                    (touched.day || touched.month || touched.year) && (
                      <label className="sui-error-message">
                        {errors.day || errors.month || errors.year}
                      </label>
                    )} */}

                      <Form.Input
                        label={$email}
                        name="emailAddress"
                        type="email"
                        error={Boolean(
                          errors.emailAddress && touched.emailAddress
                        )}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.emailAddress}
                      />
                      {errors.emailAddress && touched.emailAddress && (
                        <label className="sui-error-message sui-padd">
                          {errors.emailAddress}
                        </label>
                      )}

                      {/* <Input
                label={$password}
                name="password"
                inputProps={{
                  type: 'password'
                }}
              /> */}
                      {/* <div className="field">
                    <Checkbox
                      label={$subscribe_checkbox}
                      name="subscribe"
                      id="subscribe"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.subscribe}
                    />
                  </div> */}
                      <Form.Field
                        style={{ textAlign: 'center', fontSize: '0.8em' }}
                      >
                        <div style={{textAlign: 'right'}}>
                        <input id="selectBox" type="checkbox"
                        checked = {this.state.checkbox}
                        name="laws" onChange={(e) =>this.setState(pre =>{
                          return {
                            checkbox : !pre.checkbox
                          }
                        })}/>
                        <label style={{fontSize: '13px'}}>
                          <span 
                          onClick={this.onClick} style={{fontSize: '13px'}}
                          style ={{
                            textDecoration:"underline",
                          color:"#0099ff",
                          cursor:"pointer",
                          display:"inline-block",
                          marginBottom:"11px"}}> شرایط و مقررات  
                          </span>
                          <span onClick={(e) =>this.setState(pre =>{
                          return {
                            checkbox : !pre.checkbox
                          }
                        })}>
                             {" "}استفاده از اتولی را مطالعه کردم و می‌پذیرم. 
                            </span>
                             </label>
                        </div>
                        {this.state.checkbox ? <Button
                          loading={isSubmitting}
                          primary
                          type="submit"
                          className="btn_1 full-width"
                        >
                          تایید
                        </Button> :
                        <Button
                        disabled
                        primary
                        style={{background:"#ccc"}}
                        type="submit"
                        className="btn_1 full-width"
                      >
                        تایید
                      </Button> 
                      }
                      </Form.Field>

                      {error && (
                        <Label attached="bottom" color="red">
                          {t('forms.error')}
                        </Label>
                      )}
                      {Object.keys(errors).length >= 1 && submitCount >= 1 && (
                        <Label attached="bottom" color="red">
                          {Object.values(errors)[0]}
                        </Label>
                      )}

                      {this.state.success && this.state.name && (
                        <Label attached="bottom" color="green">
                          {this.state.name} خوش آمدی!
                      </Label>
                      )}
                    </Segment>
                  </Form>
                </BoxAccount>
              )
            }}
          </Formik>
        );
      }
      else {
        return (
          <Error404 token={token} openModal={this.props.openModal} />
        )
      }
    }
  }
);
