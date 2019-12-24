import { Formik, FormikActions } from "formik";
import * as React from "react";
import styled from "styled-components";
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
} from "semantic-ui-react";
import { isBrowser, isMobile } from "react-device-detect";
import Error404 from "../404";
import { actions } from "../../store";
import Router from "next/router";
import * as Yup from "yup";
import axios from "axios";
import jsCookie from "js-cookie";
import * as NewUser from "../../../static/new_user.svg";
import { monthsFarsi } from "../../constants/options";
import {
  convertNumbers2Persian,
  convertNumbers2English
} from "../../utils/numbers";
import Laws from "../Modals/Laws";

function clearNumber(x) {
  return Number(
    convertNumbers2English(x.toString())
      .replace(/,/g, "")
      .replace(/\./g, "")
      .replace(/\D/g, "")
  );
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
    margin-bottom: 0;
    height: 18px;
    display: inline-block;
    width: 27px !important;
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

  input,
  .dropdown[name="month"] {
    height: 48px;
  }
`;

interface ICompleteRegisterFormValues {
  firstName: string;
  lastName: string;
  nationalid?: string;
  password: string;
  day: number;
  month: number;
  year: number;
  subscribe: boolean;
  company_name?: string;
}

export default class CompleteRegisterForm extends React.Component<{
  strings: object;
  success: boolean;
  name: string;
  query?: any;
  user: any;
}> {
  state = {
    error: "",
    name: null,
    success: false,
    checkbox: false,
    ShowInput: false
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
  updateInfo = () => {};

  onResult = result => {
    this.setState(pre => {
      return {
        checkbox: !pre.checkbox
      };
    });
  };

  ShowInputHandller = () => {
    this.setState(p => {
      return {
        ShowInput: !p.ShowInput
      };
    });
  };

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
    const token = jsCookie.get("token");
    const userId = jsCookie.get("user_id");
    const { t, query } = this.props;
    if (token) {
      return (
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            password: "",
            day: null,
            company_name: null,
            month: null,
            year: null,
            subscribe: false
          }}
          onSubmit={(
            values: ICompleteRegisterFormValues,
            formikActions: FormikActions<ICompleteRegisterFormValues>
          ) => {
            formikActions.setSubmitting(true);
            this.setState({ error: "" });
            const {
              firstName,
              lastName,
              password,
              day,
              company_name = null,
              month,
              year,
              subscribe
            } = values;
            axios
              .post(
                process.env.PRODUCTION_ENDPOINT + "/core/user/update",
                {
                  first_name: firstName,
                  last_name: lastName,
                  birth_date: `${year}/${month}/${day}`,
                  company_name: company_name,
                  is_ok_to_get_emails: false
                },
                {
                  headers: {
                    Authorization: "Bearer " + token
                  }
                }
              )
              .then(response => {
                if (response.data.success) {
                  this.setState({
                    success: response.data.success,
                    error: ""
                  });
                  actions.completeRegister({
                    first_name: firstName,
                    last_name: lastName,
                    company_name: company_name,
                    complete_register: false
                  });
                  if (localStorage["URL"]) {
                    let index = localStorage["URL"].indexOf("?");
                    if (index === -1) {
                      Router.push({
                        pathname: localStorage["URL"]
                      });
                      localStorage.removeItem("URL");
                    } else {
                      let url = localStorage["URL"].slice(0, index);
                      Router.push({
                        pathname: url,
                        query: {
                          search_id: localStorage["URL"].slice(index + 11)
                        }
                      });
                      localStorage.removeItem("URL");
                    }
                  } else {
                    Router.push({
                      pathname: "/profile",
                      query: { id: userId }
                    });
                  }
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
              this.setState({
                name: values.firstName + " " + values.lastName
              });
              formikActions.setSubmitting(false);
            }, 3000);
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string()
              .required("لطفاً فیلد" + $firstname + " را پر کنید. ")
              .min(2, "نام باید حداقل ۲ حرف باشد")
              .max(30, "نام می‌تواند حداکثر ۳۰ حرف باشد"),
            lastName: Yup.string()
              .required(" لطفاً فیلد " + $lastname + " را پر کنید. ")
              .min(2, "نام باید حداقل ۲ حرف باشد")
              .max(30, "نام می‌تواند حداکثر ۳۰ حرف باشد"),
            day: Yup.number()
              .typeError(" لطفاً فیلد " + $day + " را پر کنید. ")
              .required(" لطفاً فیلد " + $day + " را پر کنید. ")
              .min(1, "روز تولد معتبر نیست")
              .max(31, "روز تولد معتبر نیست"),
            month: Yup.number()
              .typeError(" لطفاً فیلد " + $month + " را پر کنید. ")
              .required(" لطفاً فیلد " + $month + " را پر کنید. "),
            year: Yup.number()
              .typeError(" لطفاً فیلد " + $year + " را پر کنید. ")
              .required(" لطفاً فیلد " + $year + " را پر کنید. ")
              .min(1300, "سال تولد معتبر نیست")
              .max(1398, "سال تولد معتبر نیست")
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
            let nameErrors =
              (errors.firstName && touched.firstName) ||
              (errors.lastName && touched.lastName);
            return (
              <BoxAccount className="box_account">
                <Laws
                  onRef={this.doRef}
                  updateInfo={this.updateInfo}
                  result={this.onResult}
                />
                <Form onSubmit={handleSubmit}>
                  <h3 className="new_client">تکمیل اطلاعات</h3>
                  <Segment>
                    <Form.Group widths="2">
                      <Form.Input
                        label="نام"
                        name="firstName"
                        error={Boolean(errors.firstName && touched.firstName)}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                      />

                      <Form.Input
                        label="نام خانوادگی"
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
                    {!this.state.ShowInput ? (
                      <p
                        onClick={this.ShowInputHandller}
                        className="addCompanyName"
                      >
                        افزودن نام شرکت
                      </p>
                    ) : (
                      <>
                        <Form.Field>
                          <Form.Input
                            label="نام شرکت"
                            name="company_name"
                            error={Boolean(
                              errors.company_name && touched.company_name
                            )}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.company_name}
                          >
                            <p
                              onClick={this.ShowInputHandller}
                              className="removeCompanyName"
                            >
                              حذف
                            </p>
                            <input id="IinputCompany" />
                          </Form.Input>
                        </Form.Field>
                      </>
                    )}
                    <Form.Group widths="3" className="paddingInMobile">
                      <div className="field">
                        <label>تاریخ تولد</label>
                        <Input
                          name="day"
                          type="text"
                          placeholder="روز"
                          error={Boolean(errors.day && touched.day)}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(
                                data.name,
                                clearNumber(convertNumbers2English(data.value))
                              );
                            }
                          }}
                          onBlur={handleBlur}
                          value={
                            values.day ? convertNumbers2Persian(values.day) : ""
                          }
                        >
                          <input
                            style={{ marginBottom: "0px !important" }}
                            inputMode="numeric" /* novalidate pattern="[0-9]*/
                          />
                        </Input>
                      </div>

                      <Form.Dropdown
                        name="month"
                        id="month"
                        label={isMobile && "ماه"}
                        placeholder="ماه"
                        clearable
                        selection
                        options={monthsFarsi}
                        style={{ marginTop: isMobile ? "0px" : "25px" }}
                        error={Boolean(errors.month && touched.month)}
                        onChange={(e, data) => {
                          if (data && data.name) {
                            setFieldValue(data.name, data.value);
                          }
                        }}
                        value={values.month}
                      />

                      {isBrowser && (
                        <Form.Input
                          name="year"
                          type="text"
                          inputMode="numeric" /* novalidate pattern="[0-9]*/
                          placeholder={"سال"}
                          style={{ marginTop: "25px" }}
                          error={Boolean(errors.year && touched.year)}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(
                                data.name,
                                convertNumbers2English(data.value)
                              );
                            }
                          }}
                          onBlur={handleBlur}
                          value={
                            values.year
                              ? convertNumbers2Persian(values.year)
                              : values.year
                          }
                        />
                      )}
                      {isMobile && (
                        <div className="field">
                          <label>{$year}</label>
                          <Input
                            name="year"
                            type="text"
                            placeholder={"سال"}
                            error={Boolean(errors.year && touched.year)}
                            onChange={(e, data) => {
                              if (data && data.name) {
                                setFieldValue(
                                  data.name,
                                  convertNumbers2English(data.value)
                                );
                              }
                            }}
                            onBlur={handleBlur}
                            value={
                              values.year
                                ? convertNumbers2Persian(values.year)
                                : values.year
                            }
                          >
                            <input
                              style={{ marginBottom: "0px !important" }}
                              inputMode="numeric" /* novalidate pattern="[0-9]*/
                            />
                          </Input>
                        </div>
                      )}
                    </Form.Group>

                    <Form.Field
                      style={{ textAlign: "center", fontSize: "0.8em" }}
                    >
                      <div style={{ textAlign: "right" }}>
                        <input
                          id="selectBox"
                          type="checkbox"
                          checked={this.state.checkbox}
                          name="laws"
                          onChange={e =>
                            this.setState(pre => {
                              return {
                                checkbox: !pre.checkbox
                              };
                            })
                          }
                        />
                        <label style={{ fontSize: "13px" }}>
                          <span
                            onClick={this.onClick}
                            style={{ fontSize: "13px" }}
                            style={{
                              textDecoration: "underline",
                              color: "#0099ff",
                              cursor: "pointer",
                              display: "inline-block",
                              marginBottom: "11px"
                            }}
                          >
                            {" "}
                            شرایط و مقررات
                          </span>
                          <span
                            onClick={e =>
                              this.setState(pre => {
                                return {
                                  checkbox: !pre.checkbox
                                };
                              })
                            }
                          >
                            {" "}
                            استفاده از اتولی را مطالعه کردم و می‌پذیرم.
                          </span>
                        </label>
                      </div>
                      {this.state.checkbox ? (
                        <Button
                          loading={isSubmitting}
                          primary
                          type="submit"
                          className="btn_1 full-width"
                        >
                          تایید
                        </Button>
                      ) : (
                        <Button
                          disabled
                          primary
                          style={{ background: "#ccc" }}
                          type="submit"
                          className="btn_1 full-width"
                        >
                          تایید
                        </Button>
                      )}
                    </Form.Field>

                    {error && (
                      <Label attached="bottom" color="red">
                        خطایی غیرمنتظره رخ داد!
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
            );
          }}
        </Formik>
      );
    } else {
      return <Error404 token={token} openModal={this.props.openModal} />;
    }
  }
}

// start 696
// end 569
