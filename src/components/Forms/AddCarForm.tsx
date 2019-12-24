/* tslint:disable */
import * as React from "react";
import swal from "@sweetalert/with-react";
import Router from "next/router";
import styled from "styled-components";
import {
  Form,
  Label,
  Segment,
  Button,
  Checkbox,
  Dropdown,
  TextArea
} from "semantic-ui-react";
import Error404 from "../404";
import { connect } from "../../store";
import { Formik, FormikActions } from "formik";
import * as Yup from "yup";
import axios from "axios";
import * as NewUser from "../../../static/new_user.svg";
import * as Pelak from "../../../static/pelak2.png";
import * as VIN from "../../../static/vin.jpg";
import { kmDrivenFarsi } from "../../constants/options";
import AddCarImageUpload from "./AddCarImageUpload";
import { convertNumbers2English, DnumberWithCommas } from "../../utils/numbers";
import jsCookie from "js-cookie";
import { toast } from "react-toastify";
import DropDownWithSearch from "../DropDownWithSearch/DropDownWithSearch";
import { REQUEST_getCar } from "../../API";

const BoxAccount = styled.div`
  margin-bottom: 25px;
  margin-top: 25px;
  select * {
    font-family Vazir;
    color: rgba(0,0,0,.87);
    line-height: 24px;
  }
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
  .pelak {
    background: url(${Pelak}) no-repeat;
    height: 70px;
    width: 308px;
    position:relative;
    margin-bottom: 24px;
  
    // #carLicensePlates1 {
    //   background: transparent;
    //   position: absolute;
    //   left: 40px;
    //   width: 40px !important;
    //   padding: 8px;
    //   top: 9px;
    //   font-size: 18px;
    // }
    // #carLicensePlates2 {
    //   background: transparent;
    //   position: relative;
    //   left: -150px;
    //   width: 70px !important;
    //   height: 48px;
    //   padding: 8px;
    //   top: -35px;
    //   font-size: 18px;
    //   text-align: center;
    //   direction: rtl;
    // }
    // #carLicensePlates3 {
    //   background: transparent;
    //   position: absolute;
    //   left: 166px;
    //   width: 55px !important;
    //   padding: 8px;
    //   top: -101px;
    //   font-size: 18px;
    // }
    // #carLicensePlates4 {
    //   background: transparent;
    //   position: absolute;
    //   left: 237px;
    //   width: 55px !important;
    //   height: 39px;
    //   padding: 8px;
    //   top: -133px;
    //   font-size: 18px;
    // }
  }
  .fieldEmulator{
    margin-bottom:18px;
    .diz{
      opacity:0.3
    }
  }
  .fieldEmulator select:disabled{
    opacity:0.2;
  }
  .field select, .fieldEmulator select  {
    height : 48px;
  }
  label{
    display: block;
    margin: 0 0 .28571429rem 0;
    color: rgba(0,0,0,.87);
    font-size: .92857143em;
    font-weight: 700;
    text-transform: none;
  }
  .selection {
    font-size: 14px;
    border-radius: 3px;
    border: 1px solid #d2d8dd;
    &.wide {
      width: 100%;
    }
  }
  .car_checkboxes {
    .field {
      width: 50% !important;
      @media (min-width: 767px) {
        width: 33% !important;
      }
      label{
        font-weight:100
      }
      min-width: 150px !important;
    }
  }
  .visible.menu {
    height: auto !important;
  }
  @media (min-width: 767px) {
    .carModelRow {
      .field:not(:first-child) {
        padding-right: 0px;
      }
    }
  }
  .gearBoxRow {
    .field:first-child {
      padding-right: 0px !important;
    }
    label {
      padding-right: 19px !important;
    }
  }
  .colorpicker {
    color: #666 !important;
    .menu {
      right: 0 !important;
      @media only screen and (max-width: 767px) {
        max-height: fit-content !important;
      }
    }
  }
  #carModel .text {
    height: 24px;
    overflow: hidden;
  }

  .field{
    position:relative
  }
`;

interface IAddCarFormValues {
  carCity: number;
  carDistrict: number;
  carBrand: number;
  carModel: number;
  carYear: number;
  carGearboxType: number;
  carBodyStyle: number;
  carCapacity: number;
  carKmDriven: number;
  carLicensePlates1: number;
  carLicensePlates2: string;
  carLicensePlates3: number;
  carLicensePlates4: number;
  carDescription: string;
  cylinder_id: any;
  value: any;
  edit_mode?: boolean;
  car_id?: string;
}

export default connect(state => state)(
  class AddCarForm extends React.Component<{
    success: boolean;
    name: string;
    openModal?: any;
    user: any;
    edit_mode?: boolean;
    car_id?: string;
  }> {
    state = {
      error: "",
      name: null,
      success: false,
      city: null,
      citiesFarsi: [{ text: "کمی صبر کنید...", value: null }],
      citiesEnglish: [{ text: "کمی صبر کنید...", value: null }],
      cityDistrict: null,
      shouldCityDistrictLoad: false,
      shouldCityDistrictShow: false,
      cityDistrictFarsi: [],
      cityDistrictEnglish: [],
      bodyStyle: null,
      bodyStyleFarsi: [{ text: "کمی صبر کنید...", value: null }],
      bodyStyleEnglish: [{ text: "کمی صبر کنید...", value: null }],
      color: null,
      colorCode: null,
      colorId: null,
      colors: [
        {
          text: "کمی صبر کنید...",
          value: null,
          label: { color: "red", empty: true, circular: true }
        }
      ],
      brand: null,
      brandsFarsi: [],
      brandsEnglish: [],
      model: null,
      shouldModelLoad: false,
      modelsFarsi: [],
      modelsEnglish: [],
      year: null,
      yearsFarsi: [{ text: "کمی صبر کنید...", value: null }],
      yearsEnglish: [{ text: "کمی صبر کنید...", value: null }],
      checkboxesID: [],
      checkboxes: [
        { id: 0, label: "کمی صبر کنید...", checked: true, parsedID: null }
      ],
      picturesID: [],
      defaultImage: [],
      picturesPreview: [],
      cylinder_id: null,
      value: "",
      cylinderList: [],
      fetchDataFromApi: false,
      fieldsEdited: false
    };

    constructor(props) {
      super(props);
    }

    getCarPropsForEdit = async () => {
      let INterid = this.props.car_id;

      if (!this.props.edit_mode && localStorage["CarEditId"]) {
        INterid = localStorage["CarEditId"];
      }
      const res = await REQUEST_getCar({
        id: INterid
      });
      const incomming = res.data;
      if (!this.props.edit_mode && localStorage["CarEditId"]) {
        swal(
          <div>
            <h2>
              ثبت خودرو{" "}
              {incomming.car.brand.name.fa + " " + incomming.car.name.fa} کامل
              نشده است
            </h2>
          </div>,
          {
            buttons: {
              cancel: "ثبت خودرو",
              catch: {
                text: "حذف خودرو",
                value: "done"
              }
            }
          }
        ).then(value => {
          if (value === "done") {
            this.deleteCarHandller(incomming.owner.id, incomming.id);
          }
        });
      }
      this.setState({
        fetchDataFromApi: true,
        incomming
      });
    };

    deleteCarHandller = (userid, carid) => {
      const DOMAIN = process.env.PRODUCTION_ENDPOINT;
      const token = jsCookie.get("token");
      const DELETE_CAR = "/core/rental-car/delete";
      axios
        .post(
          DOMAIN + DELETE_CAR,
          {
            id: carid
          },
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        )
        .then(response => {
          localStorage.removeItem("CarEditId");

          location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    };

    componentDidMount() {
      if (!this.props.edit_mode && localStorage["CarEditId"]) {
        this.getCarPropsForEdit();
      }

      if (!this.props.user.token) {
        localStorage["URL"] = Router.router.asPath;
      }
      axios
        .post(process.env.PRODUCTION_ENDPOINT + "/core/cylinder/list?limit=16")
        .then(response => {
          if (response.data.success) {
            this.setState({
              cylinderList: response.data.items
            });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: error, success: false });
        });

      //get cities and genrate a dropdown input in form
      axios
        .post(process.env.PRODUCTION_ENDPOINT + "/core/location/list?limit=800")
        .then(response => {
          if (response.data.success) {
            const citiesFarsi = response.data.items.map((value, index) => ({
              key: value.id,
              text: value.name.fa,
              value: value.id
            }));
            const citiesEnglish = response.data.items.map((value, index) => ({
              key: value.id,
              text: value.name.en,
              value: value.id
            }));
            this.setState({ citiesFarsi, citiesEnglish });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: error, success: false });
        });

      //get body styles and genrate a dropdown input in form
      axios
        .post(
          process.env.PRODUCTION_ENDPOINT + "/core/body-style/list?limit=800"
        )
        .then(response => {
          if (response.data.success) {
            const bodyStyleFarsi = response.data.items.map((value, index) => ({
              key: value.id,
              text: value.name.fa,
              value: value.id
            }));
            const bodyStyleEnglish = response.data.items.map(
              (value, index) => ({
                key: value.id,
                text: value.name.en,
                value: value.id
              })
            );
            this.setState({ bodyStyleFarsi, bodyStyleEnglish });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: error, success: false });
        });

      //get car colors and genrate a dropdown input in form
      axios
        .post(process.env.PRODUCTION_ENDPOINT + "/core/color/list?limit=16")
        .then(response => {
          if (response.data.success) {
            const colors = response.data.items.map((value, index) => ({
              key: value.id,
              text: "",
              value: value.slug.en,
              color: value.code,
              label: { color: value.slug.en, empty: true, circular: true }
            }));
            this.setState({ colors });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: error, success: false });
        });

      //get car brands and genrate a dropdown input in form
      axios
        .post(process.env.PRODUCTION_ENDPOINT + "/core/brand/list?limit=500")
        .then(response => {
          if (response.data.success) {
            const brandsFarsi = response.data.items.map((value, index) => ({
              key: value.id,
              text: `${value.name.fa} - ${value.name.en}`,
              value: value.id
            }));
            const brandsEnglish = response.data.items.map((value, index) => ({
              key: value.id,
              text: value.name.en,
              value: value.id
            }));
            this.setState({ brandsEnglish, brandsFarsi });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: error, success: false });
        });

      //get years and genrate a dropdown input in form
      axios
        .post(process.env.PRODUCTION_ENDPOINT + "/core/year/list?limit=500")
        .then(response => {
          if (response.data.success) {
            const yearsFarsi = response.data.items.map((value, index) => ({
              key: value.id,
              text: value.name.fa,
              value: value.id
            }));
            const yearsEnglish = response.data.items.map((value, index) => ({
              key: value.id,
              text: value.name.en,
              value: value.id
            }));
            this.setState({ yearsEnglish, yearsFarsi });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: error, success: false });
        });

      //get facilities and genrate checkbox inputs in form
      axios
        .post(
          process.env.PRODUCTION_ENDPOINT + "/core/facility/list?limit=10000"
        )
        .then(response => {
          if (response.data.success) {
            let checkboxes = [];
            response.data.items.map((value, index) => {
              checkboxes.push({
                id: value.id,
                label: value.name.fa,
                checked: false,
                parsedID: null
              });
            });
            this.setState({ checkboxes }, () => {
              if (this.props.edit_mode) {
                this.getCarPropsForEdit();
              }
            });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({ error: error, success: false });
        });
    }

    setCityDistrict(cityID) {
      this.setState({ city: cityID, shouldCityDistrictLoad: true });

      axios
        .post(
          process.env.PRODUCTION_ENDPOINT +
            "/core/location/list?limit=800&parent_id=" +
            cityID
        )
        .then(response => {
          if (
            response.data.success &&
            Object.keys(response.data.items).length >= 1
          ) {
            const cityDistrictFarsi = response.data.items.map(
              (value, index) => ({
                key: value.id,
                text: value.name.fa,
                value: value.id
              })
            );
            const cityDistrictEnglish = response.data.items.map(
              (value, index) => ({
                key: value.id,
                text: value.name.en,
                value: value.id
              })
            );
            this.setState({
              cityDistrictFarsi,
              cityDistrictEnglish,
              shouldCityDistrictShow: true
            });
          } else {
            this.setState({
              cityDistrict: cityID,
              cityDistrictFarsi: [{ text: "تمام شهر", value: cityID }],
              cityDistrictEnglish: [{ text: "تمام شهر", value: cityID }],
              shouldCityDistrictShow: false
            });
          }
        })
        .catch(error => {
          // tslint:disable-next-line:no-console
          console.error(error);
          this.setState({ error: error, success: false });
        })
        .then(() => {
          this.setState({ shouldCityDistrictLoad: false });
        });
    }

    setModels(brandID) {
      this.setState({ brand: brandID, shouldModelLoad: true });
      axios
        .post(
          process.env.PRODUCTION_ENDPOINT +
            "/core/car/list?limit=800&brand_id=" +
            brandID
        )
        .then(response => {
          if (
            response.data.success &&
            Object.keys(response.data.items).length >= 1
          ) {
            const modelsFarsi = response.data.items.map((value, index) => ({
              key: value.id,
              text: `${value.name.fa} - ${value.name.en}`,
              value: value.id
            }));
            const modelsEnglish = response.data.items.map((value, index) => ({
              key: value.id,
              text: value.name.en,
              value: value.id
            }));
            this.setState({ modelsFarsi, modelsEnglish });
          } else {
            this.setState({
              model: null,
              modelsFarsi: [{ text: "Loading", value: null }],
              modelsEnglish: [{ text: "Loading", value: null }]
            });
          }
        })
        .catch(error => {
          // tslint:disable-next-line:no-console
          console.error(error);
          this.setState({ error: error, success: false });
        })
        .then(() => {
          this.setState({ shouldModelLoad: false });
        });
    }

    setFasalities(id, OnlyActive = false) {
      const cblist = this.state.checkboxes;
      let IDs = this.state.checkboxesID;
      if (!OnlyActive) {
        cblist.map((value, index) => {
          if (value.id === id) {
            if (cblist[index].checked) {
              cblist[index].checked = false;
              let indexItem = IDs.indexOf(id);
              IDs.splice(indexItem, 1);
            } else {
              cblist[index].checked = true;
              IDs.push(id);
            }
          }
        });
      } else {
        cblist.map((value, index) => {
          if (value.id === id) {
            cblist[index].checked = true;
            IDs.push(id);
          }
        });
      }
      this.setState(
        {
          checkboxes: cblist,
          checkboxesID: IDs
        },
        () => {
          console.log(this.state.checkboxesID);
        }
      );
    }

    getCarInfo(modelID) {
      return new Promise(function(resolve, reject) {
        axios
          .post(process.env.PRODUCTION_ENDPOINT + "/core/car/get?id=" + modelID)
          .then(response => {
            if (response.data.success) {
              let output = {};
              const {
                facility_set,
                transmission_type,
                body_style,
                capacity
              } = response.data.data;

              let facilities = [];
              facility_set.map((value, index) => {
                facilities.push(value.id);
              });
              output["facilities"] = facilities;
              if (transmission_type) {
                output["transmission_type"] = transmission_type.id;
              }
              if (body_style) {
                output["body_style"] = body_style.id;
              }
              if (capacity && capacity != 0) {
                output["capacity"] = capacity;
              }
              resolve(output);
            } else {
              resolve({});
            }
          })
          .catch(error => {
            // tslint:disable-next-line:no-console
            console.error(error);
            reject(new Error("Error in loading car data!"));
          });
      });
    }

    removePicture(i) {
      var picturesID = this.state.picturesID;
      var picturesIDIndex = picturesID.indexOf(i);
      picturesID.splice(i, 1);
      this.setState({ picturesID });
    }

    openVINHint() {
      swal(
        <div>
          <img src={VIN} alt="پیدا کردن کد شناسایی خودرو" />
        </div>,
        {
          button: {
            text: "بستن",
            closeModal: true
          }
        }
      );
    }
    render() {
      const { checkboxes, error } = this.state;
      const { token } = this.props.user;

      const fieldErrorGenrator = fieldName => {
        return " لطفاً فیلد " + fieldName + " را پر کنید. ";
      };
      if (token)
        return (
          <Formik
            initialValues={{
              carCity: null,
              carDistrict: null,
              carBrand: null,
              carModel: null,
              carYear: null,
              carGearboxType: null,
              carBodyStyle: this.state.bodyStyle,
              carCapacity: null,
              carKmDriven: null,
              carLicensePlates1: null,
              carLicensePlates2: null,
              carLicensePlates3: null,
              carLicensePlates4: null,
              carColor: null,
              carDescription: null,
              cylinder_id: null,
              value: ""
            }}
            onSubmit={(
              values: IAddCarFormValues,
              actions: FormikActions<IAddCarFormValues>
            ) => {
              let HoleValues = { ...this.state.incomming };
              actions.setSubmitting(true);
              if (this.state.picturesID.length <= 0) {
                this.setState({
                  error: "لطفاً حداقل یک تصویر بارگذاری کنید."
                });
                actions.setSubmitting(false);
                return false;
              }
              this.setState({ error: "" });
              const {
                carCity,
                carDistrict,
                carBrand,
                carModel,
                carYear,
                carGearboxType,
                carBodyStyle,
                carCapacity,
                carKmDriven,
                carLicensePlates1,
                carLicensePlates2,
                carLicensePlates3,
                carLicensePlates4,
                carDescription,
                cylinder_id,
                value
              } = values;
              if (this.props.edit_mode) {
                (HoleValues.id = this.props.car_id),
                  (HoleValues.car_id = carModel),
                  (HoleValues.location_id = carDistrict || carCity),
                  (HoleValues.year_id = carYear),
                  (HoleValues.transmission_type_id = carGearboxType),
                  (HoleValues.body_style_id = carBodyStyle),
                  (HoleValues.mileage_range_id = carKmDriven),
                  (HoleValues.color_id = this.state.colorId),
                  (HoleValues.special_type_id = 1),
                  (HoleValues.registration_plate_first_part = carLicensePlates1),
                  (HoleValues.registration_plate_second_part = carLicensePlates2),
                  (HoleValues.registration_plate_third_part = carLicensePlates3),
                  (HoleValues.registration_plate_forth_part = carLicensePlates4),
                  (HoleValues.days_to_get_reminded = 3), // sample
                  (HoleValues.min_days_to_rent = 1), // sample
                  (HoleValues.capacity = carCapacity),
                  (HoleValues.deliver_at_renters_place = 0), // sample
                  (HoleValues.facility_id = this.state.checkboxesID),
                  (HoleValues.description = carDescription),
                  (HoleValues.media_id = this.state.picturesID),
                  (HoleValues.cylinder_id = cylinder_id),
                  (HoleValues.value = Number(value.replace(/,/g, "")));
              }
              // console.log("after",HoleValues);

              // console.log({
              //   id :this.props.car_id ,
              //   car_id: carModel,
              //   location_id: (carDistrict || carCity),
              //   year_id: carYear,
              //   transmission_type_id: carGearboxType,
              //   body_style_id: carBodyStyle,
              //   mileage_range_id: carKmDriven,
              //   color_id: this.state.colorId,
              //   special_type_id: 1,
              //   registration_plate_first_part: carLicensePlates1,
              //   registration_plate_second_part: carLicensePlates2,
              //   registration_plate_third_part: carLicensePlates3,
              //   registration_plate_forth_part: carLicensePlates4,
              //   days_to_get_reminded: 3, // sample
              //   min_days_to_rent: 1, // sample
              //   capacity: carCapacity,
              //   deliver_at_renters_place: 0, // sample
              //   facility_id: this.state.checkboxesID,
              //   description: carDescription,
              //   media_id: this.state.picturesID,
              //   cylinder_id: cylinder_id,
              //   value: Number(value.replace(/,/g,""))
              // })
              // return
              let data = this.props.edit_mode
                ? HoleValues
                : {
                    id: localStorage["CarEditId"]
                      ? localStorage["CarEditId"]
                      : this.props.car_id,
                    car_id: carModel,
                    location_id: carDistrict || carCity,
                    year_id: carYear,
                    transmission_type_id: carGearboxType,
                    body_style_id: carBodyStyle,
                    mileage_range_id: carKmDriven,
                    color_id: this.state.colorId,
                    special_type_id: 1,
                    registration_plate_first_part: carLicensePlates1,
                    registration_plate_second_part: carLicensePlates2,
                    registration_plate_third_part: carLicensePlates3,
                    registration_plate_forth_part: carLicensePlates4,
                    days_to_get_reminded: 3, // sample
                    min_days_to_rent: 1, // sample
                    capacity: carCapacity,
                    deliver_at_renters_place: 0, // sample
                    facility_id: this.state.checkboxesID,
                    description: carDescription,
                    media_id: this.state.picturesID,
                    cylinder_id: cylinder_id,
                    value: Number(value.replace(/,/g, ""))
                  };
              axios
                .post(
                  process.env.PRODUCTION_ENDPOINT + "/core/rental-car/new",
                  data,
                  {
                    headers: {
                      Authorization: "Bearer " + token
                    }
                  }
                )
                .then(response => {
                  if (response.data.success) {
                    if (this.props.edit_mode) {
                      Router.push({
                        pathname: `/user/${jsCookie.get("user_id")}`
                      });
                    } else {
                      localStorage["CarEditId"] = response.data.data.id;
                      Router.push({
                        pathname: "/set-car-timing",
                        query: {
                          id: response.data.data.id
                        }
                      });
                    }
                  }
                })
                .catch(error => {
                  this.setState({
                    error: error.response.data.message,
                    success: false
                  });
                })
                .then(() => {
                  actions.setSubmitting(false);
                });
              setTimeout(() => {
                actions.setSubmitting(false);
              }, 3000);
            }}
            validationSchema={Yup.object().shape({
              carCity: Yup.number()
                .required(fieldErrorGenrator("شهر خودرو"))
                .typeError(fieldErrorGenrator("شهر خودرو")),
              carDistrict: Yup.number()
                .required(fieldErrorGenrator("محله"))
                .typeError(fieldErrorGenrator("محله")),
              carBrand: Yup.number()
                .required(fieldErrorGenrator("برند"))
                .typeError(fieldErrorGenrator("برند")),
              carModel: Yup.number()
                .required(fieldErrorGenrator("مدل"))
                .typeError(fieldErrorGenrator("مدل")),
              carYear: Yup.number()
                .required(fieldErrorGenrator("سال"))
                .typeError(fieldErrorGenrator("سال")),
              carGearboxType: Yup.number()
                .required(fieldErrorGenrator("نوع دنده"))
                .typeError(fieldErrorGenrator("نوع دنده"))
                .min(1)
                .max(2),

              cylinder_id: Yup.number()
                .required(fieldErrorGenrator("تعداد سیلندر"))
                .typeError(fieldErrorGenrator("تعداد سیلندر")),
              carBodyStyle: Yup.number()
                .required(fieldErrorGenrator("نوع شاسی"))
                .typeError(fieldErrorGenrator("نوع شاسی")),
              carCapacity: Yup.number()
                .required(fieldErrorGenrator("ظرفیت خودرو"))
                .typeError(fieldErrorGenrator("ظرفیت خودرو")),
              carKmDriven: Yup.number()
                .required(fieldErrorGenrator("کارکرد خودرو"))
                .typeError(fieldErrorGenrator("کارکرد خودرو")),
              value: Yup.string()
                .required(fieldErrorGenrator("ارزش خودرو"))
                .typeError(fieldErrorGenrator("ارزش خودرو")),
              carLicensePlates1: Yup.number()
                .required(
                  fieldErrorGenrator("بخش نخست شماره پلاک باید ۲ رقم باشد")
                )
                .typeError(
                  fieldErrorGenrator("بخش نخست شماره پلاک باید ۲ رقم باشد")
                )
                .min(10, "بخش نخست شماره پلاک باید ۲ رقم باشد")
                .max(99, "بخش نخست شماره پلاک باید ۲ رقم باشد"),
              carLicensePlates2: Yup.string()
                .required(
                  fieldErrorGenrator("بخش سوم شماره پلاک باید ۳ رقم باشد")
                )
                .typeError(
                  fieldErrorGenrator("بخش سوم شماره پلاک باید ۳ رقم باشد")
                ),
              carLicensePlates3: Yup.number()
                .required(fieldErrorGenrator("پلاک خودرو"))
                .typeError(fieldErrorGenrator("پلاک خودرو"))
                .min(100, "بخش سوم شماره پلاک باید ۳ رقم باشد")
                .max(999, "بخش سوم شماره پلاک باید ۳ رقم باشد"),
              carLicensePlates4: Yup.number()
                .required(
                  fieldErrorGenrator("کد استانی شماره پلاک باید ۲ رقم باشد")
                )
                .typeError(
                  fieldErrorGenrator("کد استانی شماره پلاک باید ۲ رقم باشد")
                )
                .min(10, "کد استانی شماره پیلاک نباید کمتر از 10 باشد")
                .max(99, "کد استانی شماره پلاک نباید بیشتر از 99 باشد"),
              carColor: Yup.mixed()
                .required(fieldErrorGenrator("رنگ"))
                .typeError(fieldErrorGenrator("رنگ"))
            })}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              isSubmitting,
              setFieldValue,
              setFieldTouched,
              submitCount,
              values,
              errors,
              touched
            }) => {
              if (
                this.state.fetchDataFromApi &&
                this.state.checkboxes.length > 2
              ) {
                this.setCityDistrict(1);
                values.carCity = 1;
                values.carDistrict = this.state.incomming.location.id;
                setFieldValue("carBrand", this.state.incomming.car.brand.id);
                this.setModels(this.state.incomming.car.brand.id);
                setFieldValue("carModel", this.state.incomming.car.id);
                values.carYear = this.state.incomming.year.id;
                setFieldValue(
                  "carGearboxType",
                  this.state.incomming.transmission_type.id
                );
                setFieldValue(
                  "carBodyStyle",
                  this.state.incomming.body_style.id
                );
                setFieldValue("carCapacity", this.state.incomming.capacity);
                setFieldValue(
                  "cylinder_id",
                  this.state.incomming.cylinder
                    ? this.state.incomming.cylinder.id
                    : 1
                );
                setFieldValue(
                  "carKmDriven",
                  this.state.incomming.mileage_range.id
                );
                setFieldValue(
                  "value",
                  this.state.incomming.value
                    ? this.state.incomming.value.toString()
                    : "1000"
                );

                setFieldValue(
                  "carLicensePlates1",
                  convertNumbers2English(
                    this.state.incomming.registration_plate_first_part
                  )
                );
                setFieldValue(
                  "carLicensePlates2",
                  `${this.state.incomming.registration_plate_second_part}`
                );
                setFieldValue(
                  "carLicensePlates3",
                  convertNumbers2English(
                    this.state.incomming.registration_plate_third_part
                  )
                );
                setFieldValue(
                  "carLicensePlates4",
                  convertNumbers2English(
                    this.state.incomming.registration_plate_forth_part
                  )
                );
                this.state.incomming.facility_set.map((value, index) => {
                  this.setFasalities(value.id, true);
                });
                this.state.incomming.media_set.map(i => {
                  this.setState(p => {
                    return { defaultImage: [...p.defaultImage, i] };
                  });
                });
                setFieldValue(
                  "carDescription",
                  this.state.incomming.description
                );
                setFieldValue("carColor", this.state.incomming.color.name.fa);
                this.setState({
                  color: this.state.incomming.color.name.fa,
                  colorCode: this.state.incomming.color.code,
                  colorIcon: "car",
                  colorId: this.state.incomming.color.id,
                  fetchDataFromApi: false,
                  fieldsEdited: true
                });
              }
              return (
                <BoxAccount className="box_account" id="form">
                  <Form onSubmit={handleSubmit}>
                    {!this.props.edit_mode ? (
                      <h3 className="new_client">افزودن خودرو</h3>
                    ) : (
                      <h3 className="new_client">ویرایش مشخصات خودرو</h3>
                    )}
                    <Segment>
                      <p>مشخصات خودرو را با مطابق با مدارک آن پر کنید. </p>
                      <div className="field">
                        <label>ماشین شما کجاست؟</label>
                        <select
                          data-hj-whitelist
                          value={values.carCity && values.carCity}
                          error={Boolean(errors.carCity && touched.carCity)}
                          onChange={e => {
                            this.setCityDistrict(e.target.value);
                            values.carCity = e.target.value;
                          }}
                        >
                          <option value=""></option>
                          {this.state.citiesFarsi.map(i => (
                            <option value={i.value} key={i.key}>
                              {i.text}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="fieldEmulator field">
                        <DropDownWithSearch
                          defaultVal={values.carDistrict}
                          loading={true}
                          data={this.state.cityDistrictFarsi}
                          Select={e => {
                            values.carDistrict = e.value;
                          }}
                          error={Boolean(
                            errors.carDistrict && touched.carDistrict
                          )}
                          IconTop="42"
                          clearField={() => {
                            values.carDistrict = null;
                          }}
                          placeholder="محله"
                          disabled={values.carCity === null}
                        >
                          محله
                        </DropDownWithSearch>
                      </div>
                      <Form.Group className="carModelRow" id="carBrand">
                        <div className="field">
                          <DropDownWithSearch
                            defaultVal={values.carBrand}
                            disabled={false}
                            data={this.state.brandsFarsi}
                            IconTop="42"
                            error={Boolean(errors.carBrand && touched.carBrand)}
                            clearField={() => {
                              setFieldValue("carBrand", "");
                              // this.setModels("");
                            }}
                            Select={e => {
                              setFieldValue("carBrand", e.value);
                              this.setModels(e.value);
                            }}
                            placeholder="برند"
                          >
                            برند
                          </DropDownWithSearch>
                        </div>
                        <div className="field">
                          <DropDownWithSearch
                            defaultVal={values.carModel}
                            loading={true}
                            disabled={values.carBrand === null}
                            data={this.state.modelsFarsi}
                            IconTop="42"
                            error={Boolean(errors.carModel && touched.carModel)}
                            clearField={() => {
                              setFieldValue("carModel", "");
                            }}
                            Select={e => {
                              setFieldValue("carModel", e.value);
                              if (!this.state.fieldsEdited) {
                                this.getCarInfo(e.value)
                                  .then(carInfo => {
                                    //set car options
                                    setFieldValue(
                                      "carGearboxType",
                                      carInfo.transmission_type
                                    );
                                    setFieldValue(
                                      "carBodyStyle",
                                      carInfo.body_style
                                    );

                                    setFieldValue(
                                      "carCapacity",
                                      carInfo.capacity
                                    );

                                    // clear checkboxes
                                    let checkboxes = this.state.checkboxes;
                                    let newcheckboxes = [];
                                    checkboxes.map((value, index) => {
                                      newcheckboxes.push({
                                        id: value.id,
                                        label: value.label,
                                        checked: false,
                                        parsedID: null
                                      });
                                    });
                                    this.setState({
                                      checkboxes: newcheckboxes
                                    });
                                    //set car facilities checkboxes
                                    carInfo.facilities.map((value, index) => {
                                      this.setFasalities(value, false);
                                    });
                                  })
                                  .catch(function(error) {
                                    console.log(error);
                                  });
                              } else {
                                this.setState({ fieldsEdited: false });
                              }
                            }}
                            placeholder="مدل"
                          >
                            مدل
                          </DropDownWithSearch>
                        </div>
                        <div className="field">
                          <DropDownWithSearch
                            defaultVal={values.carYear}
                            disabled={false}
                            data={this.state.yearsFarsi}
                            error={Boolean(errors.carYear && touched.carYear)}
                            IconTop="42"
                            clearField={() => {
                              values.carYear = "";
                            }}
                            InputDisable={true}
                            Select={e => {
                              values.carYear = e.value;
                            }}
                            placeholder="سال"
                          >
                            سال
                          </DropDownWithSearch>
                        </div>
                      </Form.Group>
                      <Form.Field style={{ margin: 0 }}>
                        <label>نوع دنده</label>
                      </Form.Field>
                      <Form.Group inline className="gearBoxRow">
                        <Form.Radio
                          label="دنده دستی"
                          value={2}
                          name="carGearboxType"
                          checked={values.carGearboxType === 2}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(data.name, data.value);
                            }
                          }}
                          onClick={(e, data) => {
                            if (data && data.name) {
                              setFieldTouched(data.name);
                            }
                          }}
                        />
                        <Form.Radio
                          label="دنده اتوماتیک"
                          value={1}
                          name="carGearboxType"
                          checked={values.carGearboxType === 1}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(data.name, data.value);
                            }
                          }}
                          onClick={(e, data) => {
                            if (data && data.name) {
                              setFieldTouched(data.name);
                            }
                          }}
                        />
                      </Form.Group>
                      <div className="field">
                        <label>نوع شاسی</label>

                        <select
                          style={{
                            height: "50px",
                            marginTop: "4px"
                          }}
                          value={values.carBodyStyle}
                          className={
                            Boolean(errors.carBodyStyle && touched.carBodyStyle)
                              ? "ui search selection dropdown error"
                              : "ui search selection dropdown noterror"
                          }
                          disabled={this.state.yearsFarsi[0].value == null}
                          onChange={e => {
                            values.carBodyStyle = e.target.value;
                          }}
                        >
                          <option value=""></option>
                          {this.state.bodyStyleFarsi.map(i => (
                            <option value={i.value} key={i.key}>
                              {i.text}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="field">
                        <label>تعداد سیلندر</label>
                        <select
                          name="cylinder_id"
                          className={
                            Boolean(errors.cylinder_id && touched.cylinder_id)
                              ? "ui search selection dropdown error"
                              : "ui search selection dropdown noterror"
                          }
                          value={values.cylinder_id}
                          onChange={e => {
                            if (e.target && e.target.name) {
                              setFieldValue(
                                e.target.name,
                                Number(e.target.value)
                              );
                            }
                          }}
                          style={{ display: "block" }}
                        >
                          <option value={""} hidden></option>

                          {this.state.cylinderList.map(item => {
                            return (
                              <option value={item.id} key={item.id}>
                                {item.name.fa}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="field">
                        <label>ظرفیت خودرو</label>
                        <select
                          name="carCapacity"
                          className={
                            Boolean(errors.carCapacity && touched.carCapacity)
                              ? "ui search selection dropdown error"
                              : "ui search selection dropdown noterror"
                          }
                          value={values.carCapacity}
                          onChange={e => {
                            if (e.target && e.target.name) {
                              setFieldValue(
                                e.target.name,
                                Number(e.target.value)
                              );
                            }
                          }}
                          style={{ display: "block" }}
                        >
                          <option value={""} hidden></option>
                          <option value={1}>۱</option>
                          <option value={2}>۲</option>
                          <option value={3}>۳</option>
                          <option value={4}>۴</option>
                          <option value={5}>۵</option>
                          <option value={6}>۶</option>
                          <option value={7}>۷</option>
                          <option value={8}>۸</option>
                          <option value={9}>۹</option>
                          <option value={10}>۱۰</option>
                          <option value={11}>۱۱</option>
                          <option value={12}>۱۲</option>
                          <option value={13}>۱۳</option>
                          <option value={14}>۱۴</option>
                          <option value={15}>۱۵</option>
                          <option value={16}>۱۶</option>
                          <option value={17}>۱۷</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>کارکرد خودرو</label>
                        <select
                          style={{
                            height: "50px",
                            marginTop: "4px"
                          }}
                          className={
                            Boolean(errors.carKmDriven && touched.carKmDriven)
                              ? "ui search selection dropdown error"
                              : "ui search selection dropdown noterror"
                          }
                          disabled={this.state.yearsFarsi[0].value == null}
                          value={values.carKmDriven}
                          onChange={e => {
                            setFieldValue("carKmDriven", e.target.value);
                          }}
                        >
                          <option value=""></option>
                          {kmDrivenFarsi.map(i => (
                            <option value={i.value} key={i.key}>
                              {i.text}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="field">
                        <label>ارزش خودرو</label>
                        <input
                          data-hj-whitelist
                          className={
                            Boolean(errors.value && touched.value)
                              ? "ui search selection dropdown error"
                              : "ui search selection dropdown noterror"
                          }
                          id="JustPersian"
                          type="text"
                          maxLength="14"
                          minLength="7"
                          style={{
                            height: "50px",
                            marginTop: "4px",
                            paddingLeft: "52px",
                            textAlign: "left",
                            direction: "ltr"
                          }}
                          onChange={e => {
                            e.persist();
                            setFieldValue("value", e.target.value);
                          }}
                          value={DnumberWithCommas(
                            convertNumbers2English(values.value)
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
                      <Form.Field style={{ margin: 0 }} id="pelak_container">
                        <label>پلاک خودرو</label>
                      </Form.Field>
                      <Form.Group>
                        <div className="pelak" style={{}}>
                          <Form.Input
                            data-hj-whitelist
                            name="carLicensePlates1"
                            id="carLicensePlates1"
                            inputmode="numeric"
                            type="number"
                            pattern="[0-9]*"
                            min="10"
                            max="99"
                            error={Boolean(
                              errors.carLicensePlates1 &&
                                touched.carLicensePlates1
                            )}
                            onChange={(e, data) => {
                              if (data && data.name) {
                                setFieldValue(
                                  data.name,
                                  convertNumbers2English(data.value)
                                );
                                setFieldTouched(data.name);
                              }
                            }}
                            value={values.carLicensePlates1}
                          />
                          <Form.Input
                            data-hj-whitelist
                            name="carLicensePlates2"
                            id="carLicensePlates2"
                            control="select"
                            error={Boolean(
                              errors.carLicensePlates2 &&
                                touched.carLicensePlates2
                            )}
                            onChange={handleChange}
                            value={values.carLicensePlates2}
                          >
                            <option value="" selected disabled hidden>
                              ...
                            </option>
                            <option value="الف">الف</option>
                            <option value="ب">ب</option>
                            <option value="ت">ت</option>
                            <option value="ج">ج</option>
                            <option value="د">د</option>
                            <option value="ژ">ژ</option>
                            <option value="س">س</option>
                            <option value="ٌص">ص</option>
                            <option value="ط">ط</option>
                            <option value="ق">ق</option>
                            <option value="گ">گ</option>
                            <option value="ل">ل</option>
                            <option value="م">م</option>
                            <option value="ن">ن</option>
                            <option value="و">و</option>
                            <option value="ه">هـ</option>
                            <option value="ی">ی</option>
                          </Form.Input>
                          <Form.Input
                            name="carLicensePlates3"
                            id="carLicensePlates3"
                            inputmode="numeric"
                            type="number"
                            data-hj-whitelist
                            pattern="[0-9]*"
                            min="100"
                            max="999"
                            error={Boolean(
                              errors.carLicensePlates3 &&
                                touched.carLicensePlates3
                            )}
                            onChange={(e, data) => {
                              if (data && data.name) {
                                setFieldValue(
                                  data.name,
                                  convertNumbers2English(data.value)
                                );
                                setFieldTouched(data.name);
                              }
                            }}
                            value={values.carLicensePlates3}
                          />
                          <Form.Input
                            data-hj-whitelist
                            name="carLicensePlates4"
                            id="carLicensePlates4"
                            inputmode="numeric"
                            type="number"
                            pattern="[0-9]*"
                            min="10"
                            max="99"
                            error={Boolean(
                              errors.carLicensePlates4 &&
                                touched.carLicensePlates4
                            )}
                            onChange={(e, data) => {
                              if (data && data.name) {
                                setFieldValue(
                                  data.name,
                                  convertNumbers2English(data.value)
                                );
                                setFieldTouched(data.name);
                              }
                            }}
                            value={values.carLicensePlates4}
                          />
                        </div>
                      </Form.Group>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 400,
                          marginBottom: "20px",
                          marginTop: "-25px",
                          display: "block"
                        }}
                      >
                        پلاک خودرو فقط جهت تنظیم قرارداد اجاره به کار می‌رود و
                        در سایت نمایش داده نمی‌شود.
                      </span>
                      <Form.Field style={{ margin: 0 }}>
                        <label>امکانات خودرو</label>
                      </Form.Field>
                      <Form.Group
                        style={{ flexWrap: "wrap" }}
                        className="car_checkboxes"
                      >
                        {checkboxes.map((checkbox, index) => (
                          <Form.Field
                            control={Checkbox}
                            checked={checkbox.checked}
                            onChange={this.setFasalities.bind(
                              this,
                              checkbox.id,
                              false
                            )}
                            label={checkbox.label}
                          />
                        ))}
                      </Form.Group>
                      <Form.Field style={{ margin: 0 }}>
                        <label>{"بارگذاری عکس‌ها"}</label>
                        <AddCarImageUpload
                          DefaultVal={this.state.defaultImage}
                          picturesID={this.state.picturesID}
                          setPicturesID={val =>
                            this.setState({ picturesID: val })
                          }
                          removePictureID={i => this.removePicture(i)}
                        />
                      </Form.Field>
                      <Form.Field style={{ margin: 0 }}>
                        <label>رنگ خودرو</label>
                      </Form.Field>
                      <Form.Field style={{ marginBottom: "24px" }}>
                        <Dropdown
                          text={"انتخاب رنگ"}
                          icon="paint brush"
                          id="carColor"
                          name="carColor"
                          floating
                          labeled
                          button
                          className={`icon colorpicker color${(
                            this.state.colorCode || "cc"
                          ).substr(1)}`}
                          error={Boolean(errors.carColor && touched.carColor)}
                          onBlur={handleBlur}
                          value={values.carColor}
                        >
                          <Dropdown.Menu>
                            <Dropdown.Menu scrolling>
                              {this.state.colors.map(option => (
                                <Dropdown.Item
                                  onClick={(e, data) => {
                                    if (data && data.value) {
                                      setFieldValue("carColor", data.value);
                                      this.setState({
                                        color: data.value,
                                        colorCode: data.color,
                                        colorIcon: "car",
                                        colorId: option.key
                                      });
                                    }
                                  }}
                                  key={option.value}
                                  {...option}
                                />
                              ))}
                            </Dropdown.Menu>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form.Field>
                      <Form.Group>
                        <Form.Field
                          control={TextArea}
                          label={"توضیحات"}
                          id="carDescription"
                          name="carDescription"
                          placeholder={
                            "برای ماشین‌تان توضیحات جذاب بنویسید تا احتمال اجاره آن بیشتر شود.\nاگر برای اجاره شرایط خاصی، مثل سیگار نکشیدن، دارید می‌توانید اینجا وارد کنید."
                          }
                          style={{ minHeight: 150 }}
                          error={Boolean(
                            errors.carDescription && touched.carDescription
                          )}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(data.name, data.value);
                              setFieldTouched(data.name);
                            }
                          }}
                          onBlur={handleBlur}
                          value={values.carDescription}
                        />
                      </Form.Group>
                      <Form.Field
                        style={{ textAlign: "center", fontSize: "0.8em" }}
                      >
                        <Button
                          onClick={() => {
                            if (!jsCookie.get("first_name")) {
                              toast.error("ثابت نام خود را کامل کنید", {
                                position: "bottom-center",
                                autoClose: 7000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true
                              });
                              Router.push({ pathname: "/complete-register" });
                            }
                          }}
                          loading={isSubmitting}
                          primary
                          type="submit"
                          className="btn_1 full-width"
                        >
                          ثبت
                        </Button>
                      </Form.Field>

                      {error && (
                        <Label attached="bottom" color="red">
                          {error || "خطایی غیرمنتظره رخ داد!"}
                        </Label>
                      )}
                      {Object.keys(errors).length >= 1 && submitCount >= 1 && (
                        <Label attached="bottom" color="red">
                          {Object.values(errors)[0]}
                        </Label>
                      )}
                    </Segment>
                  </Form>
                </BoxAccount>
              );
            }}
          </Formik>
        );
      else
        return (
          <div id="Add-Car_box">
            <Error404 token={token} openModal={this.props.openModal} />
          </div>
        );
    }
  }
);

// start 2377
// end 1656