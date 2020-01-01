import React, { Component } from "react";
import DropDownWithSearch from "../../components/DropDownWithSearch/DropDownWithSearch";

import {  convertNumbers2English,DnumberWithCommas } from '../../utils/numbers';

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
    carValue: 0
  };
  componentDidMount = () => {
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

  calculator = () =>{
      console.log(this.state.carValue.replace(/,/g,""));
        let conToNum  = Number(this.state.carValue.replace(/,/g,""))
      console.log(conToNum*0.0024)
  }

  render() {
    return (
      <div>
        <h2>چقدر می‌توانید کسب درآمد کنید؟</h2>
        <p>مشخصات ماشین‌تان را وارد کنید:</p>
        <form>
          <div className=" field">
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
                setBrandAndGetModels("", "");
              }}
              placeholder="برند"
              // disabled={brand == null || brand == ""}
            ></DropDownWithSearch>
          </div>
          <div className=" field">
            <DropDownWithSearch
              loading={true}
              top="46"
              IconTop="20"
              data={this.state.modelsFarsi}
              Select={e => {
                // setModel(e.value, "");
                // values.carDistrict = e.value
              }}
              clearField={() => {
                setModel("", "");
              }}
              placeholder="مدل"
              //   disabled={modelLoading && !(brand == null || brand == "")}
            ></DropDownWithSearch>
            <div className="field">
              <DropDownWithSearch
                // defaultVal={values.carYear}
                disabled={false}
                data={this.state.yearsFarsi}
                // error={Boolean(errors.carYear && touched.carYear)}
                IconTop="42"
                // clearField={() => {
                //   values.carYear = "";
                // }}
                InputDisable={true}
                Select={e => {}}
                placeholder="سال"
              ></DropDownWithSearch>

              <div className="field">
                <label>ارزش خودرو</label>
                <input
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
                <span
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "42px"
                  }}
                >
                  تومان
                </span>
              </div>
              <span onClick={()=>{
                  this.calculator()
              }}
              style={{
                  background:'red'
              }}>
                  محاسبه درآمد
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Calculator;
