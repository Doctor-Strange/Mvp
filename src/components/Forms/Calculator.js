import React, { Component } from "react";
import DropDownWithSearch from "../../components/DropDownWithSearch/DropDownWithSearch";
import { i18n, Link, withTranslation } from "../../i18n";

import { convertNumbers2English, DnumberWithCommas } from "../../utils/numbers";

import {
  REQUEST_getFactoryBrands,
  REQUEST_getFactoryCars,
  REQUEST_GET_YEAR
} from "../../API";

class Calculator extends Component {
  state = {
    brandsFarsi: [],
    modelsFarsi: [],
    yearsFarsi: [],
    carValue: "",
    brandValue: "",
    modelValue: "",
    yearValue: "",
    daily: 0,
    weekly: 0,
    monthly: 0,
    dayUnit: "هزار تومان",
    weekUnit: "هزار تومان",
    monthUnit: "هزار تومان",
    showCalculateBox: true
  };
  componentDidMount = () => {
    console.log("Run");
    
    this.fetchData();
    this.getYear();
  };

  getYear = async () => {
    const res = await REQUEST_GET_YEAR();
    console.log(res);
    this.setState({
      yearsFarsi: res
    });
  };

  fetchData = async () => {
    const resBrands = await REQUEST_getFactoryBrands({ limit: 900 });
    // console.log(resBrands.brandsFarsi);
    this.setState({
      brandsFarsi: resBrands.brandsFarsi
    });
  };

  fetchBrandId = async (brand_id = 90) => {
    const res = await REQUEST_getFactoryCars({
      limit: 900,
      brand_id
    });
    console.log(res);

    this.setState({
      modelsFarsi: res.modelsFarsi
    });
  };

  setBrandAndGetModels = brand_id => {
    // console.log(brand_id);

    this.fetchBrandId(brand_id);
    // this.setState({
    //   brand_id
    // });
  };

  clearField = name => {
    if (name === "brandValue") {
      this.setState({
        brandValue: "",
        modelsFarsi: [],
        modelValue: ""
      });
    } else
      this.setState({
        [name]: ""
      });
  };

  calculator = () => {
    let daily = 0;
    let dayUnit = "هزار تومان";
    let weekly = 0;
    let weekUnit = "هزار تومان";
    let monthly = 0;
    let monthUnit = "هزار تومان";
    if (this.state.carValue < 10000000) return;
    console.log(this.state.carValue.replace(/,/g, ""));
    let conToNum = Number(this.state.carValue.replace(/,/g, ""));
    let eachDaily = conToNum * 0.0022;
    let Round = Math.ceil(eachDaily / 10) * 10;
    let eachWeek = Round * 7;
    let eachMonth = Round * 30;
    if (Round > 1000000) {
      dayUnit = "میلیون";
    }
    if (eachWeek > 1000000) {
      weekUnit = "میلیون";
    }
    if (eachMonth > 1000000) {
      monthUnit = "میلیون";
    }

    if (Round > 1000) {
      daily = Number(String(Round).slice(0, -3));
    } else if (Round > 1000000) {
      daily = Number(String(Round).slice(0, -6));
    }

    if (eachWeek > 1000) {
      weekly = Number(String(eachWeek).slice(0, -3));
    } else if (eachWeek > 1000000) {
      weekly = Number(String(eachWeek).slice(0, -6));
    }

    if (eachMonth > 100000000) {
      console.log("eachMonth ===> ", eachMonth);
      monthly = Number(String(eachMonth).slice(0, -3));
    } else if (eachMonth > 10000000) {
      console.log("eachMonth ===> ", eachMonth);
      monthly = Number(String(eachMonth).slice(0, -3));
    } else if (eachMonth > 1000000) {
      console.log("eachMonth ===> ", eachMonth);
      monthly = Number(String(eachMonth).slice(0, -3));
    }

    this.setState({
      daily,
      weekly,
      monthly,
      dayUnit,
      weekUnit,
      monthUnit,
      showCalculateBox:false
    });
  };

  render() {
    console.log("this.state.brandsFarsi",this.state.brandsFarsi);
    
    return (
      <>
        {this.state.showCalculateBox ? (
          // <div className={["CalculatorBox", this.state.showCalculateBox?"showCalcBox": ""].join(" ")} id="CalculatorBox">
          <div className={"CalculatorBox"} id="CalculatorBox">
            <h2>چقدر می‌توانید از ماشینتان کسب درآمد کنید؟</h2>
            <p className="title">مشخصات ماشین‌تان را وارد کنید:</p>
            <form>
              <DropDownWithSearch
                loading={true}
                top="46"
                data={this.state.brandsFarsi}
                Select={
                  e => this.fetchBrandId(e.value)
                  // values.carDistrict = e.value
                }
                IconTop="20"
                clearField={() => {
                  this.clearField("brandValue");
                }}
                placeholder="برند"
                // disabled={brand == null || brand == ""}
              />
              <DropDownWithSearch
                // loading={true}
                top="46"
                IconTop="20"
                data={this.state.modelsFarsi}
                Select={e => {
                  // setModel(e.value, "");
                  // values.carDistrict = e.value
                }}
                clearField={() => {
                  this.clearField("modelValue");
                }}
                placeholder="مدل"
                // disabled={
                //   // // this.state.brandValue !== '' ||
                //   // this.state.brandsFarsi.length !== 0
                // }
              />
              <DropDownWithSearch
                // defaultVal={values.carYear}
                disabled={false}
                data={this.state.yearsFarsi}
                // error={Boolean(errors.carYear && touched.carYear)}
                IconTop="42"
                clearField={() => {
                  this.clearField("yearValue");
                }}
                InputDisable={true}
                Select={e => {}}
                placeholder="سال"
              />
              <div className="searchBoxContainer">
                <input
                  placeholder="ارزش خودرو"
                  data-hj-whitelist
                  type="text"
                  maxLength="14"
                  minLength="7"
                  onChange={e => {
                    e.persist();
                    this.setState({
                      carValue: e.target.value
                    });
                  }}
                  value={DnumberWithCommas(
                    convertNumbers2English(`${this.state.carValue}`)
                  )}
                />
                <span className="TomanText">تومان</span>
              </div>
              <div className="searchBoxContainer CalculatorBTN">
                <span
                  style={{
                    display: "block"
                  }}
                  onClick={() => {
                    this.calculator();
                  }}
                >
                  محاسبه درآمد
                </span>
              </div>
            </form>
          </div>
        ) : (
          // <div className={["CalculatorResult",this.state.showCalculateBox?"" : 'showResultbox'].join(" ")} id="CalculatorResult">
          <div className="CalculatorResult" id="CalculatorResult">
            <div className="eachSvgBox">
              <h3 className="CalcH3">
                {this.state.weekly
                  ? DnumberWithCommas(
                      convertNumbers2English(`${this.state.weekly}`)
                    )
                  : 0}
                <p>{this.state.weekUnit}</p>
              </h3>
              <div className="SvgDisc">
                <svg viewBox="0 0 600 600">
                  <g transform="translate(300, 300)">
                    <g className="arcs">
                      <defs>
                        <linearGradient
                          id="12036cef-b819-43c7-9e09-ddec8b2b9f1d-gradient"
                          x1="0"
                          x2="100%"
                        >
                          <stop
                            className="gaugeGradient-start"
                            offset="0%"
                            stop-color="rgb(75,163,206)"
                            stop-opacity="1"
                          ></stop>
                          <stop
                            className="gaugeGradient-end"
                            offset="100%"
                            stop-color="#a3678b"
                            stop-opacity="1"
                          ></stop>
                        </linearGradient>
                      </defs>
                      <defs>
                        <linearGradient
                          id="12036cef-b819-43c7-9e09-ddec8b2b9f1d-meetsExpectationsGradient"
                          x1="0"
                          x2="100%"
                        >
                          <stop
                            className="gaugeGradient-start"
                            offset="0%"
                            stop-color="rgb(75,163,206)"
                            stop-opacity="1"
                          ></stop>
                          <stop
                            className="gaugeGradient-end"
                            offset="100%"
                            stop-color="#a3678b"
                            stop-opacity="1"
                          ></stop>
                        </linearGradient>
                      </defs>
                      <path
                        className="gauge-backgroundArc"
                        d="M-96.8340087248707,207.6612018511683A20,20,0,0,1,-124.95670050609097,216.53134414821122A250,250,0,1,1,124.95670050609105,216.5313441482112A20,20,0,0,1,96.83400872487076,207.66120185116827L96.83400872487077,207.66120185116827A20,20,0,0,1,104.96362842511648,181.8863290844974A210,210,0,1,0,-104.96362842511637,181.88632908449745A20,20,0,0,1,-96.8340087248707,207.6612018511683Z"
                        style={{ fill: "rgb(230, 230, 230)" }}
                      ></path>
                      <path
                        className="gauge-arc"
                        fill="url(#12036cef-b819-43c7-9e09-ddec8b2b9f1d-meetsExpectationsGradient)"
                        d="M-96.8340087248707,207.6612018511683A20,20,0,0,1,-124.95670050609097,216.53134414821122A250,250,0,1,1,124.95670050609105,216.5313441482112A20,20,0,0,1,96.83400872487076,207.66120185116827L96.83400872487077,207.66120185116827A20,20,0,0,1,104.96362842511648,181.8863290844974A210,210,0,1,0,-104.96362842511637,181.88632908449745A20,20,0,0,1,-96.8340087248707,207.6612018511683Z"
                      ></path>
                      <path className="gauge-target"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <p className="UnderText">درآمد هفتگی</p>
            </div>
            <div className="eachSvgBox">
              <h3 className="CalcH3">
                {this.state.monthly
                  ? DnumberWithCommas(
                      convertNumbers2English(`${this.state.monthly}`)
                    )
                  : 0}
                <p>{this.state.monthUnit}</p>
              </h3>
              <div className="SvgDisc">
                <svg viewBox="0 0 600 600">
                  <g transform="translate(300, 300)">
                    <g className="arcs">
                      <defs>
                        <linearGradient
                          id="12036cef-b819-43c7-9e09-ddec8b2b9f1d-gradient"
                          x1="0"
                          x2="100%"
                        >
                          <stop
                            className="gaugeGradient-start"
                            offset="0%"
                            stop-color="rgb(75,163,206)"
                            stop-opacity="1"
                          ></stop>
                          <stop
                            className="gaugeGradient-end"
                            offset="100%"
                            stop-color="#a3678b"
                            stop-opacity="1"
                          ></stop>
                        </linearGradient>
                      </defs>
                      <defs>
                        <linearGradient
                          id="12036cef-b819-43c7-9e09-ddec8b2b9f1d-meetsExpectationsGradient"
                          x1="0"
                          x2="100%"
                        >
                          <stop
                            className="gaugeGradient-start"
                            offset="0%"
                            stop-color="rgb(75,163,206)"
                            stop-opacity="1"
                          ></stop>
                          <stop
                            className="gaugeGradient-end"
                            offset="100%"
                            stop-color="#a3678b"
                            stop-opacity="1"
                          ></stop>
                        </linearGradient>
                      </defs>
                      <path
                        className="gauge-backgroundArc"
                        d="M-96.8340087248707,207.6612018511683A20,20,0,0,1,-124.95670050609097,216.53134414821122A250,250,0,1,1,124.95670050609105,216.5313441482112A20,20,0,0,1,96.83400872487076,207.66120185116827L96.83400872487077,207.66120185116827A20,20,0,0,1,104.96362842511648,181.8863290844974A210,210,0,1,0,-104.96362842511637,181.88632908449745A20,20,0,0,1,-96.8340087248707,207.6612018511683Z"
                        style={{ fill: "rgb(230, 230, 230)" }}
                      ></path>
                      <path
                        className="gauge-arc"
                        fill="url(#12036cef-b819-43c7-9e09-ddec8b2b9f1d-meetsExpectationsGradient)"
                        d="M-96.8340087248707,207.6612018511683A20,20,0,0,1,-124.95670050609097,216.53134414821122A250,250,0,1,1,124.95670050609105,216.5313441482112A20,20,0,0,1,96.83400872487076,207.66120185116827L96.83400872487077,207.66120185116827A20,20,0,0,1,104.96362842511648,181.8863290844974A210,210,0,1,0,-104.96362842511637,181.88632908449745A20,20,0,0,1,-96.8340087248707,207.6612018511683Z"
                      ></path>
                      <path className="gauge-target"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <p className="UnderText">درآمد ماهانه</p>
            </div>
            <div className="eachSvgBox">
              <h3 className="CalcH3">
                {this.state.daily > 0
                  ? DnumberWithCommas(
                      convertNumbers2English(`${this.state.daily}`)
                    )
                  : 0}
                <p>{this.state.dayUnit}</p>
              </h3>
              <div className="SvgDisc">
                <svg viewBox="0 0 600 600">
                  <g transform="translate(300, 300)">
                    <g className="arcs">
                      <defs>
                        <linearGradient
                          id="12036cef-b819-43c7-9e09-ddec8b2b9f1d-gradient"
                          x1="0"
                          x2="100%"
                        >
                          <stop
                            className="gaugeGradient-start"
                            offset="0%"
                            stop-color="rgb(75,163,206)"
                            stop-opacity="1"
                          ></stop>
                          <stop
                            className="gaugeGradient-end"
                            offset="100%"
                            stop-color="#a3678b"
                            stop-opacity="1"
                          ></stop>
                        </linearGradient>
                      </defs>
                      <defs>
                        <linearGradient
                          id="12036cef-b819-43c7-9e09-ddec8b2b9f1d-meetsExpectationsGradient"
                          x1="0"
                          x2="100%"
                        >
                          <stop
                            className="gaugeGradient-start"
                            offset="0%"
                            stop-color="rgb(75,163,206)"
                            stop-opacity="1"
                          ></stop>
                          <stop
                            className="gaugeGradient-end"
                            offset="100%"
                            stop-color="#a3678b"
                            stop-opacity="1"
                          ></stop>
                        </linearGradient>
                      </defs>
                      <path
                        className="gauge-backgroundArc"
                        d="M-96.8340087248707,207.6612018511683A20,20,0,0,1,-124.95670050609097,216.53134414821122A250,250,0,1,1,124.95670050609105,216.5313441482112A20,20,0,0,1,96.83400872487076,207.66120185116827L96.83400872487077,207.66120185116827A20,20,0,0,1,104.96362842511648,181.8863290844974A210,210,0,1,0,-104.96362842511637,181.88632908449745A20,20,0,0,1,-96.8340087248707,207.6612018511683Z"
                        style={{ fill: "rgb(230, 230, 230)" }}
                      ></path>
                      <path
                        className="gauge-arc"
                        fill="url(#12036cef-b819-43c7-9e09-ddec8b2b9f1d-meetsExpectationsGradient)"
                        d="M-96.8340087248707,207.6612018511683A20,20,0,0,1,-124.95670050609097,216.53134414821122A250,250,0,1,1,124.95670050609105,216.5313441482112A20,20,0,0,1,96.83400872487076,207.66120185116827L96.83400872487077,207.66120185116827A20,20,0,0,1,104.96362842511648,181.8863290844974A210,210,0,1,0,-104.96362842511637,181.88632908449745A20,20,0,0,1,-96.8340087248707,207.6612018511683Z"
                      ></path>
                      <path className="gauge-target"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <p className="UnderText">درآمد روزانه</p>
            </div>
            <div className="addCarnowInlanding">
            <Link href="/add-car">
              <a>ماشین‌تان را اضافه کنید</a>
            </Link>
            <p className="tryAgainCalc" onClick={()=>{
              this.fetchData()
              this.setState({
                showCalculateBox:true
              })
            }}>محاسبه مجدد</p>
          </div>
          </div>
        )}
      </>
    );
  }
}

export default Calculator;
