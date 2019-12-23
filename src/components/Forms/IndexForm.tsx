/* tslint:disable */
import React, { useState, useEffect } from "react";
import Router from "next/router";
import styled from "styled-components";
import "otoli-react-persian-calendar-date-picker/lib/DatePicker.css";
import DatePicker from "otoli-react-persian-calendar-date-picker";
import { Form, Label, Button } from "semantic-ui-react";
import { Formik, FormikActions } from "formik";
import * as Yup from "yup";
import { Box, Flex } from "@rebass/grid";
import { convertDateToMoment } from "../../utils/date";
import { convertNumbers2Persian } from "../../utils/numbers";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

const BoxAccount = styled.div`
  .index-box {
    .field > .selection.dropdown {
      min-width: 149px !important;
    }
    .field > label {
      font-weight: 500;
    }
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 2 0 5px #000000;
    padding: 32px;
    width: 100%;
    @media (min-width: 768px) {
      width: 100٪;
    }
    @media (min-width: 768px) {
      width: 723px;
    }
    @media (min-width: 992px) {
      width: 933px;
    }
    @media (min-width: 1200px) {
      width: 1056px;
    }
    & > div {
      padding: 0px 8px;
      @media (min-width: 992px) {
        :nth-child(2) {
          padding-left: 0px;
          input.DatePicker__input {
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
            border-left: none;
          }
        }
        :nth-child(3) {
          padding-right: 0px;
          input.DatePicker__input {
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
          }
        }
      }
    }
    .pickerbox {
      width: 50%;
    }
    .field {
      margin-bottom: 4px !important;
    }

    .btn_1 {
      bottom: -25px;
      position: relative;
    }
    input.DatePicker__input {
      cursor: pointer;
    }
    .wrapper {
      position: relative;
    }
    .JustForTehran {
      position: absolute;
      margin: 0 !important;
      right: 42px;
      bottom: 7px;
      color: #2a2a2a !important;
      z-index: 2;
      text-shadow: none !important;
      font-size: 12px !important;
      @media (max-width: 768px) {
        position: static;
        font-size: 13px !important;
        text-align: right;
        margin-top: 4px !important;
        margin-bottom: 8px !important;
      }
    }
  }
`;

interface IIndexFormValues {
  carCity: number;
  startDate: any;
  endDate: any;
}

interface IIndexForm {
  success: boolean;
  name: string;
}

const IndexForm: React.SFC<IIndexForm> = ({}) => {
  const [error, setError] = useState("");
  const [activeField1, setactiveField1] = useState(false);
  const [activeField2, setactiveField2] = useState(false);
  const [CalenderWork, SetCalenderWork] = useState(false);
  const [locationAlert, setAlert] = useState(false);
  const [errDateFrom, SeterrDateFrom] = useState(false);
  const [errDateTo, SeterrDateTo] = useState(false);
  const [
    datepicker_animation,
    setDPA
  ] = useState(`.DatePicker__calendarContainer {
  transform: translateX(-22%);
}
`);
  const [date, setDate] = useState({
    from: null,
    to: null
  });

  const getSelectedDayValue = date => {
    if (!date) return "";
    let D = convertNumbers2Persian(
      moment(convertDateToMoment(date)).format("dddd jD jMMMM jYY")
    );
    return D;
  };

  useEffect(() => {
    if (localStorage["start"] && localStorage["end"]) {
      let start = JSON.parse(localStorage["start"]);
      if (start.day > moment().jDate()) {
        if (start.month >= moment().jMonth() + 1) {
          setDate({
            from: JSON.parse(localStorage["start"]),
            to: JSON.parse(localStorage["end"])
          });
        } else {
          localStorage.removeItem("start");
          localStorage.removeItem("end");
        }
      } else if (start.month > moment().jMonth() + 1) {
        setDate({
          from: JSON.parse(localStorage["start"]),
          to: JSON.parse(localStorage["end"])
        });
      } else {
        localStorage.removeItem("start");
        localStorage.removeItem("end");
      }
    }
    SetCalenderWork(true);
  }, []);

  const setCalEnd = () => {
    SeterrDateFrom(false);
    SeterrDateTo(false);

    setDPA(`.DatePicker__calendarContainer {
      transform: translateX(-75%);
    }`);
    setDate({
      from: date.from,
      to: null
    });
    document.activeElement.blur();
  };

  return (
    <Formik
      initialValues={{ carCity: 1 }}
      onSubmit={(
        values: IIndexFormValues,
        actions: FormikActions<IIndexFormValues>
      ) => {
        actions.setSubmitting(true);
        if (date.from === null || date.to === null) {
          actions.setSubmitting(false);
          if (!date.from) SeterrDateFrom(true);
          if (!date.to) SeterrDateTo(true);
          return;
        }
        let queryString = "";
        let shownURL = "";
        if (values.carCity) {
          queryString = queryString + `location_id=${values.carCity}&`;
          shownURL = shownURL + `city=${values.carCity}&`;
        }
        if (date.from) {
          queryString =
            queryString +
            `start_date=${date.from.year}/${date.from.month}/${date.from.day}` +
            `&end_date=${date.to.year}/${date.to.month}/${date.to.day}&`;
          shownURL =
            shownURL +
            `start=${date.from.year}/${date.from.month}/${date.from.day}` +
            `&end=${date.to.year}/${date.to.month}/${date.to.day}&`;
        }

        localStorage["start"] = JSON.stringify(date.from);
        localStorage["end"] = JSON.stringify(date.to);
        const href = `/search-results?${shownURL}`;
        const as = href;
        Router.push(href, as).then(response => {
          setError("");
          actions.setSubmitting(false);
        });
      }}
      validationSchema={Yup.object().shape({})}
    >
      {({ handleSubmit, isSubmitting, submitCount, errors }) => {
        return (
          <BoxAccount className="box_account">
            <Form onSubmit={handleSubmit}>
              <style>{datepicker_animation}</style>
              <DatePicker
                selectedDayRange={date}
                onChange={v => {
                  if (!v.to) {
                    setCalEnd();
                  }
                  if (date.from && !date.to) {
                    setDPA(`.DatePicker__calendarContainer {
                      transform: translateX(-75%);
                    }`);
                  }
                  setDate(v);
                }}
                inputPlaceholder="انتخاب روزهای نمایش"
                isDayRange
                renderInput={({ ref, onFocus }) => {
                  return (
                    <Flex
                      justifyContent="space-around"
                      className="wrapper index-box responsiveFeildcontrol"
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        margin: "0 auto"
                      }}
                    >
                      <Box className="indexFullOnMobile" width={[4 / 16]}>
                        <label style={{ display: "block", textAlign: "right" }}>
                          خودرو را کجا تحویل می‌گیرید؟
                        </label>
                        <span
                          onClick={() => {
                            setAlert(true);
                          }}
                        >
                          <input disabled value="تهران" type="text" />
                        </span>
                        {locationAlert && (
                          <p className="JustForTehran">
                            اتولی فعلا اجاره‌های با مبدا تهران را پوشش می‌دهد.
                          </p>
                        )}
                      </Box>
                      <Box
                        className="indexFullOnMobile"
                        width={[4 / 16]}
                        style={{ position: "relative" }}
                      >
                        <Form.Field style={{ margin: 0 }}>
                          <label>از تاریخ</label>
                        </Form.Field>
                        <input
                          readOnly
                          ref={ref}
                          onBlur={() => {
                            setactiveField1(false);
                          }}
                          onClick={() => {
                            onFocus();
                            setactiveField1(true);
                            SeterrDateFrom(false);
                          }}
                          value={getSelectedDayValue(date.from)}
                          placeholder={"از تاریخ"}
                          className={[
                            "DatePicker__input index",
                            activeField1 ? "activefield" : null,
                            errDateTo ? "fieldError" : null
                          ].join(" ")}
                          aria-label="انتخاب تاریخ"
                        />
                        {CalenderWork ? null : <span className="loader"></span>}
                      </Box>
                      <Box
                        className="indexFullOnMobile"
                        width={[4 / 16]}
                        style={{ position: "relative" }}
                      >
                        <Form.Field style={{ margin: 0 }}>
                          <label>تا تاریخ</label>
                        </Form.Field>
                        <input
                          readOnly
                          ref={ref}
                          onBlur={() => {
                            setactiveField2(true);
                          }}
                          onClick={() => {
                            onFocus();
                            setactiveField1(true);
                            SeterrDateFrom(false);
                          }}
                          value={getSelectedDayValue(date.to)}
                          placeholder={"تا تاریخ"}
                          className={[
                            "DatePicker__input",
                            activeField2 || (date.from && !date.to)
                              ? "activefield"
                              : null,
                            errDateFrom ? "fieldError" : null
                          ].join(" ")}
                          aria-label="انتخاب تاریخ"
                        />
                        {CalenderWork ? null : <span className="loader"></span>}
                      </Box>
                      <Box className="indexFullOnMobile" width={[4 / 16]}>
                        <Form.Field
                          style={{ textAlign: "center", fontSize: "0.8em" }}
                        >
                          <Button
                            loading={isSubmitting}
                            primary
                            type="submit"
                            className="btn_1 full-width SEARCH_BUTTON"
                          >
                            {"جستجو"}
                          </Button>
                        </Form.Field>
                      </Box>
                    </Flex>
                  );
                }}
                disabledDays={[
                  {
                    year: Number(moment().format("jYYYY")),
                    month: Number(moment().format("jM")),
                    day: Number(moment().format("jD"))
                  }
                ]}
                disableBackward
                colorPrimary="#4BA3CE"
                colorPrimaryLight="#A3678B"
              />
            </Form>
            {error && (
              <Label attached="bottom" color="red">
                خطایی رخ داد
              </Label>
            )}
            {Object.keys(errors).length >= 1 && submitCount >= 1 && (
              <Label attached="bottom" color="red">
                {Object.values(errors)[0]}
              </Label>
            )}
          </BoxAccount>
        );
      }}
    </Formik>
  );
};
export default IndexForm;

// start => 502
// end => 374
