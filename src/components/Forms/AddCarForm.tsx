/* tslint:disable */
import * as React from 'react';
// import { useCallback } from 'react';
import swal from '@sweetalert/with-react'
import Router from 'next/router';
import styled from 'styled-components';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import {
  Form,
  Label,
  Segment,
  Button,
  Checkbox,
  Input,
  Dropdown,
  Icon,
  Card,
  TextArea
} from 'semantic-ui-react';
import Error404 from '../404';
import { i18n, withTranslation } from '../../i18n';
import { connect } from '../../store';
// import {  } from 'formik-semantic-ui';
import { Formik, FormikActions, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import * as NewUser from '../../../static/new_user.svg';
import * as Pelak from '../../../static/pelak2.png';
import * as VIN from '../../../static/vin.jpg';
import { Box, Flex } from '@rebass/grid';
import { kmDrivenEnglish, kmDrivenFarsi } from '../../constants/options';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone';
import scrollToElement from 'scroll-to-element';
import AddCarImageUpload from "./AddCarImageUpload";
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../../utils/numbers';

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
    margin-bottom: 24px;
    #carLicensePlates1 {
      background: transparent;
      position: absolute;
      left: 40px;
      width: 40px !important;
      padding: 8px;
      top: 9px;
      font-size: 18px;
    }
    #carLicensePlates2 {
      background: transparent;
      position: relative;
      left: -150px;
      width: 70px !important;
      height: 48px;
      padding: 8px;
      top: -35px;
      font-size: 18px;
      text-align: center;
      direction: rtl;
    }
    #carLicensePlates3 {
      background: transparent;
      position: absolute;
      left: 166px;
      width: 55px !important;
      padding: 8px;
      top: -101px;
      font-size: 18px;
    }
    #carLicensePlates4 {
      background: transparent;
      position: absolute;
      left: 237px;
      width: 55px !important;
      height: 39px;
      padding: 8px;
      top: -133px;
      font-size: 18px;
    }
  }
  .fieldEmulator{
    margin-bottom:18px;
    .diz{
      opacity:0.2
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
  carVIN: string;
  carLicensePlates1: number;
  carLicensePlates2: string;
  carLicensePlates3: number;
  carLicensePlates4: number;
  carDescription: string;
}

export default withTranslation('common')(connect(state => state)(
  class AddCarForm extends React.Component<{
    t: any;
    success: boolean;
    name: string;
    openModal?: any;
    user: any;
  }> {
    state = {
      error: '',
      name: null,
      success: false,
      city: null,
      citiesFarsi: [{ text: 'کمی صبر کنید...', value: null }],
      citiesEnglish: [{ text: 'کمی صبر کنید...', value: null }],
      cityDistrict: null,
      shouldCityDistrictLoad: false,
      shouldCityDistrictShow: false,
      cityDistrictFarsi: [{ text: 'کمی صبر کنید...', value: null }],
      cityDistrictEnglish: [{ text: 'کمی صبر کنید...', value: null }],
      bodyStyle: null,
      bodyStyleFarsi: [{ text: 'کمی صبر کنید...', value: null }],
      bodyStyleEnglish: [{ text: 'کمی صبر کنید...', value: null }],
      color: null,
      colorCode: null,
      colorId: null,
      colors: [
        {
          text: 'کمی صبر کنید...',
          value: null,
          label: { color: 'red', empty: true, circular: true }
        }
      ],
      brand: null,
      brandsFarsi: [{ text: 'کمی صبر کنید...', value: null }],
      brandsEnglish: [{ text: 'کمی صبر کنید...', value: null }],
      model: null,
      shouldModelLoad: false,
      modelsFarsi: [{ text: 'کمی صبر کنید...', value: null }],
      modelsEnglish: [{ text: 'کمی صبر کنید...', value: null }],
      year: null,
      yearsFarsi: [{ text: 'کمی صبر کنید...', value: null }],
      yearsEnglish: [{ text: 'کمی صبر کنید...', value: null }],
      checkboxesID: [],
      checkboxes: [
        { id: 0, label: 'کمی صبر کنید...', checked: true, parsedID: null }
      ],
      picturesID: [],
      picturesPreview: []
    };

    constructor(props) {
      super(props);
    }

    componentDidMount() {
      // changed by sajad 980528
      // disable Auto scroll because of small screens
      // scrollToElement('#form');

      //get cities and genrate a dropdown input in form
      axios
        .post(process.env.PRODUCTION_ENDPOINT + '/core/location/list?limit=800')
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
        .post(process.env.PRODUCTION_ENDPOINT + '/core/body-style/list?limit=800')
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
        .post(process.env.PRODUCTION_ENDPOINT + '/core/color/list?limit=16')
        .then(response => {
          if (response.data.success) {
            const colors = response.data.items.map((value, index) => ({
              key: value.id,
              text: '',
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
        .post(process.env.PRODUCTION_ENDPOINT + '/core/brand/list?limit=500')
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
        .post(process.env.PRODUCTION_ENDPOINT + '/core/year/list?limit=500')
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
        .post(process.env.PRODUCTION_ENDPOINT + '/core/facility/list?limit=10000')
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
            this.setState({ checkboxes });
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
          '/core/location/list?limit=800&parent_id=' +
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
              cityDistrictFarsi: [{ text: 'تمام شهر', value: cityID }],
              cityDistrictEnglish: [{ text: 'تمام شهر', value: cityID }],
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
        .post(process.env.PRODUCTION_ENDPOINT + '/core/car/list?limit=800&brand_id=' + brandID)
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
              modelsFarsi: [{ text: 'Loading', value: null }],
              modelsEnglish: [{ text: 'Loading', value: null }]
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
      let IDs = [...this.state.checkboxesID];
      //console.log(id);
      //console.log(cblist[i].id);
      // try {
        if (!OnlyActive) {
          cblist.map((value, index) => {
              if (value.id === id) {
                if(cblist[index].checked){
                  cblist[index].checked = false;
                  let indexItem = IDs.indexOf(id)
                  IDs.splice(indexItem,1)
                }else{
                  cblist[index].checked = true;
                  IDs.push(id)
                }  
            }
          })
        }
        else {
          cblist[index].checked = true;
          IDs.push(id);
        }
            // console.log(
            //   `"id" is ${cblist[index].label} and "checkboxes[${index}]" is ${
            //   cblist[index].checked
            //   }`
            // );
            //console.log(id + ' added.');
          // }
        // });
      // } catch (error) {
      //   console.error(error);
      // }

      this.setState({
        checkboxes: cblist,
        checkboxesID: IDs
      });
    }

    getCarInfo(modelID) {
      return new Promise(function (resolve, reject) {
        axios
          .post(process.env.PRODUCTION_ENDPOINT + '/core/car/get?id=' + modelID)
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
              output['facilities'] = facilities;
              if (transmission_type) {
                output['transmission_type'] = transmission_type.id;
              }
              if (body_style) {
                output['body_style'] = body_style.id;
              }
              if (capacity && capacity != 0) {
                output['capacity'] = capacity;
              }
              //console.log(output);
              resolve(output);
            } else {
              resolve({});
            }
          })
          .catch(error => {
            // tslint:disable-next-line:no-console
            console.error(error);
            reject(new Error('Error in loading car data!'));
          });
      });
    }

    removePicture(i) {
      var picturesID = this.state.picturesID;
      //console.log(picturesID);
      var picturesIDIndex = picturesID.indexOf(i);
      //console.log('going to delte');
      picturesID.splice(i, 1);
      //console.log(picturesID);
      this.setState({ picturesID });
    }

    openVINHint() {
      swal(
        <div>
          {/* <h1>Hello world!</h1> */}
          <img src={VIN} alt="پیدا کردن کد شناسایی خودرو" />
        </div>,
        {
          button: {
            text: "بستن",
            closeModal: true,
          },
        });
    }

    // InputController = (e) =>{
    //   e.persist()
    //   this.setState({
    //     e.target.name
    //   })
    // }

    render() {
      const { checkboxes, error } = this.state;
      const { token } = this.props.user;
      const { t } = this.props;
      const fieldErrorGenrator = fieldName => {
        return (
          " لطفاً فیلد " +
          fieldName +
          " را پر کنید. "
        );
      };
      if (token) return (
        <Formik
          initialValues={{
            carCity: null,
            carDistrict: null,
            carBrand: null,
            carModel: null,
            carYear: null,
            carGearboxType: null,
            carBodyStyle: null,
            carCapacity: null,
            carKmDriven: null,
            carVIN: null,
            carLicensePlates1: null,
            carLicensePlates2: null,
            carLicensePlates3: null,
            carLicensePlates4: null,
            carColor: null,
            carDescription: null
          }}
          onSubmit={(
            values: IAddCarFormValues,
            actions: FormikActions<IAddCarFormValues>
          ) => {
            actions.setSubmitting(true);
            // if (!values.carCity) {
            //   // alert("لطفاً حداقل یک تصویر بارگذاری کنید.");
            //   this.setState({ error: 'خود رو در کدام شهر است؟' });
            //   actions.setSubmitting(false);
            //   return false;
            // }else if (!value.carDistrict) {
            //   // alert("لطفاً حداقل یک تصویر بارگذاری کنید.");
            //   this.setState({ error: 'خود رو در کدام منطقه است؟' });
            //   actions.setSubmitting(false);
            //   return false;
            // }else if (!carYear) {
            //   // alert("لطفاً حداقل یک تصویر بارگذاری کنید.");
            //   this.setState({ error: 'سال خودرو را به درستی انتخاب نکرده اید' });
            //   actions.setSubmitting(false);
            //   return false;
            // }else
            if (this.state.picturesID.length <= 0) {
              // alert("لطفاً حداقل یک تصویر بارگذاری کنید.");
              this.setState({ error: 'لطفاً حداقل یک تصویر بارگذاری کنید.' });
              actions.setSubmitting(false);
              return false;
            }
            this.setState({ error: '' });
            //console.log(values);
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
              carVIN,
              carLicensePlates1,
              carLicensePlates2,
              carLicensePlates3,
              carLicensePlates4,
              carDescription
            } = values;
            axios
              .post(
                process.env.PRODUCTION_ENDPOINT + '/core/rental-car/new',
                {
                  car_id: carModel,
                  location_id: (carDistrict || carCity),
                  year_id: carYear,
                  transmission_type_id: carGearboxType,
                  body_style_id: carBodyStyle,
                  mileage_range_id: carKmDriven,
                  color_id: this.state.colorId,
                  special_type_id: 1,
                  vin: carVIN,
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
                  media_id: this.state.picturesID
                },
                {
                  headers: {
                    Authorization: 'Bearer ' + token
                  }
                }
              )
              .then(response => {
                if (response.data.success) {
                  //console.log(response.data);
                  Router.push({
                    pathname: '/set-car-timing',
                    query: {
                      id: response.data.data.id
                    }
                  });
                }
              })
              .catch(error => {
                // tslint:disable-next-line:no-console
                console.error(error);
                this.setState({ error: error, success: false });
              })
              .then(() => {
                actions.setSubmitting(false);
              });
            setTimeout(() => {
              //console.log(values);

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
            carBodyStyle: Yup.number()
              .required(fieldErrorGenrator("نوع شاسی"))
              .typeError(fieldErrorGenrator("نوع شاسی")),
            carCapacity: Yup.number()
              .required(fieldErrorGenrator("ظرفیت خودرو"))
              .typeError(fieldErrorGenrator("ظرفیت خودرو")),
            carKmDriven: Yup.number()
              .required(fieldErrorGenrator("کارکرد خودرو"))
              .typeError(fieldErrorGenrator("کارکرد خودرو")),
            carVIN: Yup.string()
              .required(fieldErrorGenrator("VIN"))
              .typeError(fieldErrorGenrator("VIN"))
              .matches(/[a-zA-Z0-9]{17}/, t("کد VIN معتبر نیست")),
            carLicensePlates1: Yup.number()
              .required(fieldErrorGenrator("بخش نخست شماره پلاک باید ۲ رقم باشد"))
              .typeError(fieldErrorGenrator("بخش نخست شماره پلاک باید ۲ رقم باشد"))
              .min(10, t('forms.error_licensePlates1_not_valid'))
              .max(99, t('forms.error_licensePlates1_not_valid')),
            carLicensePlates2: Yup.string()
              .required(fieldErrorGenrator("بخش سوم شماره پلاک باید ۳ رقم باشد"))
              .typeError(fieldErrorGenrator("بخش سوم شماره پلاک باید ۳ رقم باشد")),
            carLicensePlates3: Yup.number()
              .required(fieldErrorGenrator(t('carProperty.licensePlates')))
              .typeError(fieldErrorGenrator(t('carProperty.licensePlates')))
              .min(100, t('forms.error_licensePlates3_not_valid'))
              .max(999, t('forms.error_licensePlates3_not_valid')),
            carLicensePlates4: Yup.number()
              .required(fieldErrorGenrator("کد استانی شماره پلاک باید ۲ رقم باشد"))
              .typeError(fieldErrorGenrator("کد استانی شماره پلاک باید ۲ رقم باشد"))
              .min(10, t('forms.error_licensePlates4_not_valid'))
              .max(99, t('forms.error_licensePlates4_not_valid')),
            carColor: Yup.mixed()
              .required(fieldErrorGenrator("رنگ"))
              .typeError(fieldErrorGenrator("رنگ"))
            // carOptions: [string]:Yup.number().required( t('forms.error_filed_required1') +                   t('carProperty.city') + t('forms.error_filed_required2') ),
            // carDescription: Yup.string()
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
          }) => (
            <BoxAccount className="box_account" id="form">
                <Form onSubmit={handleSubmit}>
                  <h3 className="new_client">{t('add_car')}</h3>
                  {/* <small className="float-right pt-2">* {$required_fields}</small> */}
                  <Segment>
<p>مشخصات خودرو را با مطابق با مدارک آن پر کنید. </p>
                    {/* <Form.Field style={{ margin: 0 }}>
                      <label>{t('carProperty.whereIsIt')}</label>
                    </Form.Field> */}
                    <div className="field">
                    <label>ماشین شما کجاست؟</label>
                    <select  
                    // onBlur={(e)=> {;;}} 
                    onChange= {(e) => {this.setCityDistrict(e.target.value);values.carCity = e.target.value}}>
                    <option value=""></option>
                      {this.state.citiesFarsi.map(i => 
                      <option value={i.value} key={i.key} >{i.text}</option>
                      )
                    }
                    </select>
                    </div>
                    {/* <Form.Group> */}
                      {/* {isBrowser &&
                        <Form.Dropdown
                          name="carCity"
                          id="carCity"
                          label={t('carProperty.whereIsIt')}
                          placeholder={t('carProperty.city')}
                          noResultsMessage={t('forms.error_no_result_found')}
                          selection
                          loading={this.state.citiesFarsi[0].value == null}
                          options={
                            i18n.language === 'en'
                              ? this.state.citiesEnglish
                              : this.state.citiesFarsi
                          }
                          error={Boolean(errors.carCity && touched.carCity)}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(data.name, data.value);
                              setFieldValue('carDistrict', undefined);
                              this.setCityDistrict(data.value);
                            }
                          }}
                          onClose={(e, data) => {
                            //console.log(e);
                            if (data && data.name) {
                              setFieldTouched(data.name);
                            }
                          }}
                          value={values.carCity}
                        />
                      }
                      {isMobile &&
                        <div className="field">
                          <label>{t('carProperty.whereIsIt')}</label>
                          <select
                            name="carCity"
                            className={Boolean(errors.carCity && touched.carCity) ? "ui search selection dropdown error" : "ui search selection dropdown noterror"}
                            value={values.carCity}
                            onChange={(e) => {
                              //console.log(e.target.value);
                              if (e.target && e.target.name) {
                                setFieldValue(e.target.name, Number(e.target.value));
                                setFieldValue('carDistrict', undefined);
                                this.setCityDistrict(Number(e.target.value));
                              }
                            }}
                            // onBlur={handleBlur}
                            style={{ display: 'block' }}
                          >
                            <option value={""} label={""} hidden />
                            {this.state.citiesFarsi.map((item, index) => (
                              <option value={item.value} label={item.text} />
                            ))}
                          </select>
                        </div>
                      } */}
                      {/* {this.state.shouldCityDistrictShow ? ( */}
                    <div className="fieldEmulator">

                    <label className ={this.state.cityDistrictFarsi[0].value == null ? "diz": null}>محله</label>
                    <select 
                    id="Mahaleh"
                    disabled={
                      this.state.cityDistrictFarsi[0].value == null
                    }
                    // onBlur={(e)=> {;;}} 
                    onChange= {(e) => {values.carDistrict = e.target.value}}>
                    <option value=""></option>
                      {this.state.cityDistrictFarsi.map(i => 
                      <option value={i.value} key={i.key} >{i.text}</option>
                      )
                    }
                    </select>
                    </div>
                        {/* <Form.Dropdown
                          name="carDistrict"
                          id="carDistrict"
                          search
                          label={"محله"}
                          placeholder={"محله"}
                          noResultsMessage={t('forms.error_no_result_found')}
                          selection
                          loading={this.state.shouldCityDistrictLoad}
                          disabled={
                            this.state.cityDistrictFarsi[0].value == null
                          }
                          options={
                            i18n.language === 'en'
                              ? this.state.cityDistrictEnglish
                              : this.state.cityDistrictFarsi
                          }
                          error={Boolean(
                            errors.carDistrict && touched.carDistrict
                          )}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(data.name, data.value);
                            }
                          }}
                          onClose={(e, data) => {
                            if (data && data.name) {
                              setFieldTouched(data.name);
                            }
                          }}
                          value={values.carDistrict}
                        /> */}
                      {/*) 
                       : (
                          <p />
                        )} */}
                    {/* </Form.Group> */}

                    <Form.Group className="carModelRow" id="carBrand">
                      <Form.Dropdown
                        name="carBrand"
                        id="carBrand"
                        label={"برند"}
                        placeholder={"برند"}
                        noResultsMessage={t('forms.error_no_result_found')}
                        search
                        selection
                        loading={this.state.brandsFarsi[0].value == null}
                        options={
                          i18n.language === 'en'
                            ? this.state.brandsEnglish
                            : this.state.brandsFarsi
                        }
                        error={Boolean(errors.carBrand && touched.carBrand)}
                        onChange={(e, data) => {
                          if (data && data.name) {
                            setFieldValue(data.name, data.value);
                            this.setModels(data.value);
                          }
                        }}
                        onOpen={(e, data) => scrollToElement('#carBrand')}
                        onClose={(e, data) => {
                          if (data && data.name) {
                            setFieldTouched(data.name);
                          }
                        }}
                        value={values.carBrand}
                      />
                      <Form.Dropdown
                        name="carModel"
                        id="carModel"
                        search
                        placeholder={"مدل"}
                        noResultsMessage={t('forms.error_no_result_found')}
                        label={"مدل"}
                        selection
                        loading={this.state.shouldModelLoad}
                        disabled={this.state.modelsFarsi[0].value == null}
                        options={
                          i18n.language === 'en'
                            ? this.state.modelsEnglish
                            : this.state.modelsFarsi
                        }
                        error={Boolean(errors.carModel && touched.carModel)}
                        onChange={(e, data) => {
                          if (data && data.name) {
                            setFieldValue(data.name, data.value);
                            this.getCarInfo(data.value)
                              .then(carInfo => {
                                //set car options
                                setFieldValue(
                                  'carGearboxType',
                                  carInfo.transmission_type
                                );
                                setFieldValue(
                                  'carBodyStyle',
                                  carInfo.body_style
                                );
                                setFieldValue('carCapacity', carInfo.capacity);

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
                                this.setState({ checkboxes: newcheckboxes });
                                //set car facilities checkboxes
                                carInfo.facilities.map((value, index) => {
                                  this.setFasalities(value, true);
                                });
                              })
                              .catch(function (error) {
                                //console.log(error.message);
                              });
                          }
                        }}
                        onClose={(e, data) => {
                          if (data && data.name) {
                            setFieldTouched(data.name);
                          }
                        }}
                        value={values.carModel}
                      />
                      {/* {isBrowser && */}
                      <div className="field">

                      <label>سال</label>

                      <select 
                      style={{
                        height: "50px",
                        marginTop: "4px"
                      }}
                    disabled={this.state.yearsFarsi[0].value == null}
                    // onBlur={(e)=> {;;}} 
                    onChange= {(e) => {values.carYear = e.target.value}}>
                    <option value=""></option>
                      {this.state.yearsFarsi.map(i => 
                      <option value={i.value} key={i.key} >{i.text}</option>
                      )
                    }
                    </select>
                    </div>

                        {/* <Form.Dropdown
                          name="carYear"
                          id="carYear"
                          search
                          placeholder={"سال"}
                          noResultsMessage={t('forms.error_no_result_found')}
                          label={"سال"}
                          selection
                          loading={this.state.yearsFarsi[0].value == null}
                          disabled={this.state.yearsFarsi[0].value == null}
                          options={
                            i18n.language === 'en'
                              ? this.state.yearsEnglish
                              : this.state.yearsFarsi
                          }
                          error={Boolean(errors.carYear && touched.carYear)}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(data.name, data.value);
                            }
                          }}
                          onClose={(e, data) => {
                            if (data && data.name) {
                              setFieldTouched(data.name);
                            }
                          }}
                          value={values.carYear}
                        /> */}
                      {/* // } */}
                      {/* {isMobile &&
                        <div className="field">
                          <label>{"سال"}</label>
                          <select
                            name="carYear"
                            className={Boolean(errors.carYear && touched.carYear) ? "ui search selection dropdown error" : "ui search selection dropdown noterror"}
                            value={values.carYear}
                            onChange={(e) => {
                              //console.log(e.target.value);
                              if (e.target && e.target.name) {
                                setFieldValue(e.target.name, Number(e.target.value));
                              }
                            }}
                            // onBlur={handleBlur}
                            style={{ display: 'block' }}
                          >
                            <option value={""} label={""} hidden />
                            {this.state.yearsFarsi.map((item, index) => (
                              <option value={item.value} label={item.text} />
                            ))}
                          </select>
                        </div>
                      } */}
                    </Form.Group>
                    <Form.Field style={{ margin: 0 }}>
                      <label>{"نوع دنده"}</label>
                    </Form.Field>
                    <Form.Group inline className="gearBoxRow">
                      <Form.Radio
                        label={"دنده دستی"}
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
                        label={"دنده اتوماتیک"}
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

                    {/* {isBrowser && */}
                    <div className="field">

                      <label>نوع شاسی</label>

                      <select 
                        style={{
                          height: "50px",
                          marginTop: "4px"
                        }}
                        disabled={this.state.yearsFarsi[0].value == null}
                        // onBlur={(e)=> {;;}} 
                        onChange= {(e) => {values.carBodyStyle = e.target.value}}>
                          <option value=""></option>
                            {this.state.bodyStyleFarsi.map(i => 
                            <option value={i.value} key={i.key} >{i.text}</option>
                            )
                          }
                      </select>
                    </div>
                      {/* <Form.Dropdown
                        name="carBodyStyle"
                        id="carBodyStyle"
                        placeholder={"نوع شاسی"}
                        label={"نوع شاسی"}
                        noResultsMessage={t('forms.error_no_result_found')}
                        search
                        selection
                        loading={this.state.bodyStyleFarsi[0].value == null}
                        options={
                          i18n.language === 'en'
                            ? this.state.bodyStyleEnglish
                            : this.state.bodyStyleFarsi
                        }
                        error={Boolean(
                          errors.carBodyStyle && touched.carBodyStyle
                        )}
                        onChange={(e, data) => {
                          if (data && data.name) {
                            setFieldValue(data.name, data.value);
                          }
                        }}
                        onClose={(e, data) => {
                          if (data && data.name) {
                            setFieldTouched(data.name);
                          }
                        }}
                        value={values.carBodyStyle}
                      /> */}
                    {/* } */}
                    {/* {isMobile && */}
                      {/* <div className="field">
                        <label>{t('carProperty.cassis')}</label>
                        <select
                          name="carBodyStyle"
                          className={Boolean(errors.carBodyStyle && touched.carBodyStyle) ? "ui search selection dropdown error" : "ui search selection dropdown noterror"}
                          value={values.carBodyStyle}
                          onChange={(e) => {
                            //console.log(e.target.value);
                            if (e.target && e.target.name) {
                              setFieldValue(e.target.name, Number(e.target.value));
                            }
                          }}
                          // onBlur={handleBlur}
                          style={{ display: 'block' }}
                        >
                          <option value={""} label={""} hidden />
                          {this.state.bodyStyleFarsi.map((item, index) => (
                            <option value={item.value} label={item.text} />
                          ))}
                        </select>
                      </div> */}
                    {/* } */}

                    {/* {isBrowser && */}
                    <div className="field">

                      <label>ظرفیت خودرو</label>
                    <select
                          name="carCapacity"
                          className={Boolean(errors.carCapacity && touched.carCapacity) ? "ui search selection dropdown error" : "ui search selection dropdown noterror"}
                          value={values.carCapacity}
                          onChange={(e) => {
                            //console.log(e.target.value);
                            if (e.target && e.target.name) {
                              setFieldValue(e.target.name, Number(e.target.value));
                            }
                          }}
                          // onBlur={handleBlur}
                          style={{ display: 'block' }}
                        >
                          <option value={""} label={""} hidden />
                          <option value={1} label={"۱"} />
                          <option value={2} label={"۲"} />
                          <option value={3} label={"۳"} />
                          <option value={4} label={"۴"} />
                          <option value={5} label={"۵"} />
                          <option value={6} label={"۶"} />
                          <option value={7} label={"۷"} />
                          <option value={8} label={"۸"} />
                          <option value={9} label={"۹"} />
                          <option value={10} label={"۱۰"} />
                          <option value={11} label={"۱۱"} />
                          <option value={12} label={"۱۲"} />
                          <option value={13} label={"۱۳"} />
                          <option value={14} label={"۱۴"} />
                          <option value={15} label={"۱۵"} />
                          <option value={16} label={"۱۶"} />
                          <option value={16} label={"17"} />
                        </select>
                        </div>
                      {/* <Form.Input
                        // label={t('carProperty.capacity') + ' ' + t('carProperty.withDriver')}
                        label={"ظرفیت خودرو"}
                        name="carCapacity"
                        inputmode="numeric"
                        type="number"
                        pattern="[0-9]*"
                        className="no_margin"
                        error={Boolean(errors.carCapacity && touched.carCapacity)}
                        onChange={(e, data) => {
                          if (data && data.name) {
                            setFieldValue(data.name, data.value);
                            setFieldTouched(data.name);
                          }
                        }}
                        value={values.carCapacity}
                      /> */}
                    {/* } */}
                    {/* {isMobile &&
                      <div className="field">
                        <label>{"ظرفیت خودرو"}</label>
                        <select
                          name="carCapacity"
                          className={Boolean(errors.carCapacity && touched.carCapacity) ? "ui search selection dropdown error" : "ui search selection dropdown noterror"}
                          value={values.carCapacity}
                          onChange={(e) => {
                            //console.log(e.target.value);
                            if (e.target && e.target.name) {
                              setFieldValue(e.target.name, Number(e.target.value));
                            }
                          }}
                          // onBlur={handleBlur}
                          style={{ display: 'block' }}
                        >
                          <option value={""} label={""} hidden />
                          <option value={1} label={"۱"} />
                          <option value={2} label={"۲"} />
                          <option value={3} label={"۳"} />
                          <option value={4} label={"۴"} />
                          <option value={5} label={"۵"} />
                          <option value={6} label={"۶"} />
                          <option value={7} label={"۷"} />
                          <option value={8} label={"۸"} />
                          <option value={9} label={"۹"} />
                          <option value={10} label={"۱۰"} />
                          <option value={11} label={"۱۱"} />
                          <option value={12} label={"۱۲"} />
                          <option value={13} label={"۱۳"} />
                          <option value={14} label={"۱۴"} />
                          <option value={15} label={"۱۵"} />
                          <option value={16} label={"۱۶"} />
                        </select>
                      </div>
                    } */}
                    <div className="field">

                    <label>کارکرد خودرو</label>

                    <select 
                      style={{
                        height: "50px",
                        marginTop: "4px"
                      }}
                      disabled={this.state.yearsFarsi[0].value == null}
                      // onBlur={(e)=> {;;}} 
                      onChange= {(e) => {values.carKmDriven = e.target.value}}>
                        <option value=""></option>
                          {kmDrivenFarsi.map(i => 
                          <option value={i.value} key={i.key} >{i.text}</option>
                          )
                        }
                    </select>
                    </div>

                    {/* <Form.Group>
                      {isBrowser &&
                        <Form.Dropdown
                          name="carKmDriven"
                          id="carKmDriven"
                          label={"کارکرد خودرو"}
                          placeholder={"کارکرد خودرو"}
                          // className="ltr"
                          selection
                          options={
                            i18n.language === 'en'
                              ? kmDrivenEnglish
                              : kmDrivenFarsi
                          }
                          error={Boolean(
                            errors.carKmDriven && touched.carKmDriven
                          )}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(data.name, data.value);
                            }
                          }}
                          onClose={(e, data) => {
                            if (data && data.name) {
                              setFieldTouched(data.name);
                            }
                          }}
                          value={values.carKmDriven}
                        />
                      }
                      {isMobile &&
                        <div className="field">
                          <label>{"کارکرد خودرو"}</label>
                          <select
                            name="carKmDriven"
                            className={Boolean(errors.carKmDriven && touched.carKmDriven) ? "ui search selection dropdown error" : "ui search selection dropdown noterror"}
                            value={values.carKmDriven}
                            onChange={(e) => {
                              // console.log(e.target.value);
                              if (e.target && e.target.name) {
                                setFieldValue(e.target.name, Number(e.target.value));
                              }
                            }}
                            // onBlur={handleBlur}
                            style={{ display: 'block' }}
                          >
                            <option value={""} label={""} hidden />
                            {kmDrivenFarsi.map((item, index) => (
                              <option value={item.value} label={item.text} />
                            ))}
                          </select>
                        </div>
                      }
                    </Form.Group> */}
                    <div className="field">
                      <label>
                        {"کد شناسایی خودرو (VIN)"}
                      </label>
                      <Input
                        name="carVIN"
                        error={Boolean(errors.carVIN && touched.carVIN)}
                        onChange={(e, data) => {
                          if (data && data.name) {
                            setFieldValue(data.name, convertNumbers2English(data.value));
                            setFieldTouched(data.name);
                          }
                        }}
                        value={values.carVIN
                          ? convertNumbers2Persian(values.carVIN)
                          : values.carVIN
                        }
                        style={{ direction: 'ltr' }}
                      />
                      <span onClick={this.openVINHint} style={{ fontSize: '12px',textDecoration : 'underline', fontWeight: 400 }}>
                        <Icon name="help circle" />{' '}
                        VIN را از کجا پیدا کنیم؟
                        </span>
                      <p   style={{ fontSize: '12px', fontWeight: 400}}>
                       کد شناسایی خودرو فقط جهت تنظیم قرارداد اجاره به کار می‌رود و در سایت نمایش داده نمی‌شود.
                        </p>
                    </div>

                    <Form.Field style={{ margin: 0 }}>
                      <label>{"پلاک خودرو"}</label>
                    </Form.Field>
                    <Form.Group>
                      <div className="pelak" style={{}}>
                        <Form.Input
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
                              setFieldValue(data.name, convertNumbers2English(data.value));
                              setFieldTouched(data.name);
                            }
                          }}
                          value={values.carLicensePlates1}
                        />
                        <Form.Input
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
                          pattern="[0-9]*"
                          min="100"
                          max="999"
                          error={Boolean(
                            errors.carLicensePlates3 &&
                            touched.carLicensePlates3
                          )}
                          onChange={(e, data) => {
                            if (data && data.name) {
                              setFieldValue(data.name, convertNumbers2English(data.value));
                              setFieldTouched(data.name);
                            }
                          }}
                          value={values.carLicensePlates3}
                        />
                        <Form.Input
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
                              setFieldValue(data.name, convertNumbers2English(data.value));
                              setFieldTouched(data.name);
                            }
                          }}
                          value={values.carLicensePlates4}
                        />
                      </div>
                    </Form.Group>
                    <span   style={{ fontSize: '12px', fontWeight: 400,marginBottom: '20px',
                    marginTop: "-25px",display: 'block' }}>
                    پلاک خودرو فقط جهت تنظیم قرارداد اجاره به کار می‌رود و در سایت نمایش داده نمی‌شود.
                        </span>
                    <Form.Field style={{ margin: 0 }}>
                      <label>{"امکانات خودرو"}</label>
                    </Form.Field>
                    <Form.Group
                      style={{ flexWrap: 'wrap' }}
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
                    {/* <label>{"بارگذاری عکس‌ها"}</label>

                            <input type = "file" multiple onInput={(e)=>{e.persist();
                              console.log(e)}
                              
                              } accept="image/jpeg, image/png" /> */}
                    <Form.Field style={{ margin: 0 }}>
                      <label>{"بارگذاری عکس‌ها"}</label>
                      <AddCarImageUpload
                        picturesID={this.state.picturesID}
                        setPicturesID={(val) => this.setState({picturesID:val})}
                        removePictureID={(i) =>  this.removePicture(i)}
                      />
                    </Form.Field>

                    <Form.Field style={{ margin: 0 }}>
                      <label>رنگ خودرو</label>
                    </Form.Field>
                    <Form.Field style={{ marginBottom: '24px' }}>
                      <Dropdown
                        text={"رنگ خودرو"}
                        icon={/*this.state.colorIcon || */ `paint brush`}
                        id="carColor"
                        name="carColor"
                        floating
                        labeled
                        button
                        className={`icon colorpicker color${(
                          this.state.colorCode || 'cc'
                        ).substr(1)}`}
                        error={Boolean(errors.carColor && touched.carColor)}
                        onBlur={handleBlur}
                        value={values.carColor}
                      >
                        <Dropdown.Menu >
                          {/* <Dropdown.Header
                                icon="tags"
                                content="Tag Label"
                              /> */}
                          <Dropdown.Menu scrolling >
                            {this.state.colors.map(option => (
                              <Dropdown.Item
                                onClick={(e, data) => {
                                  if (data && data.value) {
                                    setFieldValue('carColor', data.value);
                                    this.setState({
                                      color: data.value,
                                      colorCode: data.color,
                                      colorIcon: 'car',
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
                        placeholder={"توضیحات اضافی در مورد شرایط خودرو..."}
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
                      style={{ textAlign: 'center', fontSize: '0.8em' }}
                    >
                      <Button
                        loading={isSubmitting}
                        primary
                        type="submit"
                        className="btn_1 full-width"
                      >
                        {t('ثبت خودرو')}
                      </Button>
                    </Form.Field>

                    {error && (
                      <Label attached="bottom" color="red">
                        {error || t('forms.error')}
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
            )
          }
        </Formik>
      );
      else return (
        <Error404 token={token} openModal={this.props.openModal} />
      )
    }
  }
));