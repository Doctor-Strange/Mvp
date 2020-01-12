/* tslint:disable */
import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });
import {
  Form,
  Divider,
  Header,
  Label,
  Segment,
  Button,
  Checkbox,
  Grid,
  Progress,
  Icon,
  Radio,
  TextArea,
  Image,
  Input,
  Item
} from 'semantic-ui-react';
import Error404 from '../404';
import { 
  REQUEST_getCarIsMine,
  REQUEST_getCarAvailabilities,
  REQUEST_setCarAvailability,
  REQUEST_getCarDiscounts,
  REQUEST_editCarPartial,
  REQUEST_setCarDiscounts
} from '../../API';
import { i18n, withTranslation } from '../../i18n';
import { connect } from '../../store';
import { Formik, FormikActions, withFormik } from 'formik';
import * as Yup from 'yup';
import jsCookie from 'js-cookie';
// import { setLocale } from 'yup';
// setLocale({
//   number: {
//     min: 'مقدار وارد شده از ${min} کمتر است',
//     max: 'مقدار وارد شده از ${max} بیشتر است'
//   }
// });
import axios from 'axios';
import * as NewUser from '../../../static/new_user.svg';
import { Pelak } from '../Cards';
import { Box, Flex } from '@rebass/grid';
import { kmDrivenEnglish, kmDrivenFarsi } from '../../constants/options';
import {
  numberWithCommas,
  convertNumbers2Persian,
  convertNumbers2English
} from '../../utils/numbers';
import {
  convertDateToMoment,
  convertRangeDateToMoment,
  convertMomentsToDateRange,
  getBetweenRange
} from '../../utils/date';
import TimeRangesSelector from './TimeRangesSelector';
import DiscountsSelector from './DiscountsSelector';
import { toast } from 'react-toastify';
import * as PelakTemplate from '../../../static/pelak2.png';


function clearNumber(x) {
  return convertNumbers2English(x.toString())
    .replace(/,/g, '')
    .replace(/\./g, '')
    .replace(/\D/g, '');
}

const BoxAccount = styled.div`
  margin-bottom: 25px;
  margin-top: 25px;
  .ui.segments {
    .segment.timingEntery {
      min-height: 225px;
    }
  }
  .DateInput {
    max-width: 128px;
    margin-top: 5px;
  }
  h3 {
    font-size: 16px;
    color: #313131;
    padding-left: 30px;
    padding-right: 30px;
    height: 30px;
    padding-top: 8px;
    display: inline-block;
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    &.new_client {
      background: url(${NewUser}) center left no-repeat;
      background-size: 18px;
    }
  }
  .ui.input {
    float: right;
    flex-direction: row;
    &.labeled.icon.button {
      /* padding-left: 2.5em !important;
      padding-right: 0em !important; */
    }
    &.numstep {
      height: 32px !important;
      max-width: 150px;
      margin-right: 5px;
      margin-left: 5px;
      margin-bottom: 18px;
      input {
        width: 70px !important;
        height: 32px !important;
        margin: 0px 5px;
        z-index: 2;
        text-align: center !important;
      }
      .label {
        z-index: 2;
        border: none;
        cursor: pointer;
        background-color: #85b7d924;
        i.minus.icon,
        i.plus.icon {
          margin: 0px;
          line-height: 15px;
          z-index: 2;
          color: #85b7d9;
        }
        &:hover {
          border-color: #85b7d9;
        }
      }
      span {
        position: relative;
        min-width: 100px;
        padding-right: 5px;
        /* position: absolute; */
        line-height: 32px;
        z-index: 1;
      }
      &.daysToGetReminded {
        span {
          width: 200px;
        }
      }
      &.minDaysToRent {
        span {
          width: 175px;
        }
      }
    }
  }
  .extraKm,.distanceLimit {
    
    display: inline-block;
    vertical-align: middle;
    float: none,
  }
  .extraKm{
    margin:0
  }
  .extraKm,
  .distanceLimit {
    max-width: 150px !important;
    margin: 0 !important;
    div {
      max-width: 300px !important;
      input {
        max-width: 300px !important;
      }
    }
  }
  #Step2Item{
    // position:relative;
    margin: 0;
  }
  .pelakTemp {
    background: url(${PelakTemplate}) no-repeat;
    height: 30px;
    width: 231px;
    background-position: right;
    background-size: contain;
    position: relative;
    margin-top: 8px;
    text-align: right;
    @media (max-width:768px){
      margin: 0;
    }
  .first{
    position: absolute;
    right: 11px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(72,72,72,0.87);
    top: 12px;
  }
.third, .second , .forth{
  position: absolute;
    right: 40px;
    font-size: 16px;
    color: rgba(72,72,72,0.87);
    top: 4px;
    font-weight: 500;
}
.second{
  right: 76px;
  top: 1px;
}
.forth{
  right: 100px;
}
}

  i.close,
  i.edit.outline {
    float: left;
    position: relative;
    top: -20px;
    font-size: 24px;
    cursor: pointer;
  }
  .ui.form input[type='text'] {
    direction: ltr;
  }
  button#pos_bott,
  button#pos_bott2,
  button.pos_bott {
    box-shadow: none !important;
    font-size: 14px !important;
    padding: 14px !important;
    background: none !important;
  }

  i.icon.edit,
  i.icon.calendar {
    margin-right: 0px !important;
    :before {
      right: -5px;
      position: relative;
    }
  }
`;

interface ISetCarTimingFormValues {
  daysToGetReminded: number;
  minDaysToRent: number;
  deliverAtRentersPlace: boolean;
  distanceLimit: string;
  extraKm: string;
  radioGroup: boolean;
  date: IRange;
  price: string;
  radiGoroup: boolean;
  availableInAllPrice: string;
  cancellationPolicy: string;
}

interface IDate {
  year: number;
  month: number;
  day: number;
}

interface IRange {
  from: IDate;
  to: IDate;
}

interface ISetCarTimingForm {
  user: any;
  t: any;
  success: boolean;
  name: string;
  rentalCarID: string;
}

interface ICar {
  carName: string;
  carBrand: string;
  carPelak: string;
  carColor: string;
  carYear: any;
  carMin_days_to_rent: any;
  carDeliver_at_renters_place: any;
  carDays_to_get_reminded: any;
  carLocation: any;
  carDescription: string;
  carMedia_set: [any];
  plate1: any;
  plate2: any;
  plate3: any;
  plate4: any;
}

const SetCarTimingForm: React.SFC<ISetCarTimingForm> = ({ t, id }) => {
  const carSample = {
    registration_plate_first_part: '',
    max_km_per_day: 0,
    extra_km_price: 0,
    cancellation_policy: '',
    color: {
      priority: 1,
      name: { fa: '', en: 'Black' },
      id: 5,
      slug: { fa: '', en: 'black' },
      code: '#000000'
    },
    body_style: {
      id: 0
    },
    registration_plate_forth_part: '',
    media_set: [
      {
        id: 0,
        thumbnail_url: null,
        url: ''
      }
    ],
    deliver_at_renters_place: true,
    car: {
      brand: {
        name: { fa: '', en: '' },
        id: 0,
        description: { fa: null, en: null }
      },
      media_set: [],
      id: 0,
      differential: null,
      slug: { fa: '', en: '' },
      description: { fa: '', en: '' },
      transmission_type: null,
      facility_set: [],
      capacity: 0,
      body_style: null,
      name: { fa: '', en: '' }
    },
    capacity: 0,
    vin: '',
    owner: {},
    location: {
      id: 0,
      name: {
        breadcrumb_en: '',
        fa: '',
        en: '',
        breadcrumb_fa: ''
      }
    },
    description: '',
    registration_plate_third_part: '',
    days_to_get_reminded: 0,
    min_days_to_rent: '',
    id: 0,
    registration_plate_second_part: '',
    mileage_range: {},
    transmission_type: {},
    facility_set: [],
    year: {}
  };

  const empetyDate = {
    from: null,
    to: null
  };

  const [error, setError] = useState(false);
  const [CustomeError, SEtCtomeError] = useState("");
  const [car, setCar] = useState({ ...carSample });
  const [mapApiToFormik, setMapApiToFormik] = useState(false);
  const [carTimings, setCarTimings] = useState([]);
  const [carDiscounts, setCarDiscounts] = useState([]);
  const [isIsAllTime, setIsIsAllTime] = useState(true);
  const [isAllTimePrice, setIsAllTimePrice] = useState("");
  const [success, setSuccess] = useState('');
  const [disabledDays, setDisabledDays] = useState([]);

  const modifyCarTimings = async (array, curentRange = [] /* fixme */) => {
    // console.log("array is ", array);
    setCarTimings(array);
    let out = [];
    var disabledDaysFiltered = array
      .filter(range => {
        if (array.is_all_time) {
          return false; // skip
        }
        return true;
      })
      .map((value, index) => {
        if(value){
          // console.log('index:', value);
          var days = getBetweenRange(value.date);
          out.push(...days);
        }
      });
    await setDisabledDays(out);
    // console.log('disabledDays is: ', disabledDays);
  };

  const modifyCarDiscounts = async (array) => {
    // console.log("array is ", array);
    setCarDiscounts(array);
  };

    // Let make calls
  const fetchAPI = async () => {
    // 1. fetch car data itself 
    const carRes = await REQUEST_getCarIsMine({
      id,
      token: jsCookie.get('token')
    });
    setCar(carRes);
    // console.log("carRes",carRes)

    // 2. fetch car availablity data and parse it and set it to state
    const timeRes = await REQUEST_getCarAvailabilities({
      id,
      token: jsCookie.get('token')
    });
    const parsedTimes = timeRes.map((value, index) => {
      // console.log("value",value);
      
      if (value.is_all_time) {
        setIsIsAllTime(true);
        setIsAllTimePrice(value.price_per_day);
      } else {
        setIsIsAllTime(false);
        const s = value.start_date.jalali;
        const e = value.end_date.jalali;
        return {
          id: value.id,
          price: value.price_per_day,
          date: {
            from: {
              year: s.y,
              month: s.m,
              day: s.d
            },
            to: {
              year: e.y,
              month: e.m,
              day: e.d
            }
          }
        };
      }
    });
    modifyCarTimings(parsedTimes);

    // 3. fetch car discounts data and parse it and set it to state
    const discountRes = await REQUEST_getCarDiscounts({
      id,
      token: jsCookie.get('token')
    });
    const parsedDiscounts = discountRes.map((value, index) => {
      return {
        id: value.id,
        duration: value.days_limit,
        percent: value.discount_percent,
      };
    });
    modifyCarDiscounts(parsedDiscounts);

    setMapApiToFormik(true);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const fieldErrorGenrator = fieldName => {
    return (
      t('forms.error_filed_required1') +
      fieldName +
      t('forms.error_filed_required2')
    );
  };
  const MaxErrorGenrator = (fieldName, val) => {
    return `${t('forms.error_filed_maxmin_required1')} ${fieldName} ${t(
      'forms.error_filed_max_required2'
    )} (${convertNumbers2Persian(val)}) ${t(
      'forms.error_filed_max_required3'
    )}`;
  };
  const MinErrorGenrator = (fieldName, val) => {
    return `${t('forms.error_filed_maxmin_required1')} ${fieldName} ${t(
      'forms.error_filed_min_required2'
    )} (${convertNumbers2Persian(val)}) ${t(
      'forms.error_filed_min_required3'
    )}`;
  };

  return (
    <Formik
      initialValues={{
        daysToGetReminded: 1,
        minDaysToRent: 3,
        deliverAtRentersPlace: false,
        availableInAllPrice: null,
        distanceLimit: null,
        extraKm: null,
        radioGroup: false,
        cancellationPolicy: ''
      }}
      onSubmit={async (
        values: ISetCarTimingFormValues,
        actions: FormikActions<ISetCarTimingFormValues>
      ) => {
        // console.log("availableInAllPrice",values.availableInAllPrice,"values.availableInAllPrice",
        // values.availableInAllPrice ,"carTimings.length", carTimings.length);
        // if(!values.availableInAllPrice && carTimings.length === 0){
        //   setError(true);
        //   SEtCtomeError("بازه قیمت خودرو را به درستی وارد نکرده اید")
        //   return
        // }
        // return 
        actions.setSubmitting(true);
        setError(false);
        if(!values.availableInAllPrice && carTimings.length === 0){
          setError(true);
          SEtCtomeError("بازه قیمت خودرو را به درستی وارد نکرده اید")
          return
        }
        let {
          availableInAllPrice,
          cancellationPolicy,
          daysToGetReminded,
          deliverAtRentersPlace,
          distanceLimit,
          extraKm,
          minDaysToRent,
          radioGroup
        } = values;
        if (!deliverAtRentersPlace) deliverAtRentersPlace = false;
        // car discounts
        let discounts = [];
        carDiscounts.map((val, index) => {
          if(val){
            discounts.push({
              days_limit: clearNumber(val.duration),
              discount_percent: clearNumber(val.percent)
            });
          }
        });
        await REQUEST_setCarDiscounts({
          token: jsCookie.get('token'),
          rental_car_id: id,
          data: JSON.stringify(discounts)
        });
        await REQUEST_editCarPartial({
          token: jsCookie.get('token'),
          id,
          deliver_at_renters_place: deliverAtRentersPlace,
          max_km_per_day: Number(distanceLimit), // fixme
          extra_km_price: Number(extraKm), // fixme
          cancellation_policy: cancellationPolicy,
          days_to_get_reminded: daysToGetReminded,
          min_days_to_rent: minDaysToRent
        })
        .catch(error => {
          console.error(error);
          setError(true);
          setSuccess(false);
        });
        if(radioGroup == false) {
          REQUEST_setCarAvailability({
            token: jsCookie.get('token'),
            rental_car_id: id,
            data: JSON.stringify([{
              rental_car_id: id,
              is_all_time: 1,
              price_per_day: clearNumber(availableInAllPrice),
              status_id: 'available'
            }])
          })
          .then(response => {
            toast.success(`خودرو ${car.car.name.fa} با موفقیت ثبت شد`,{
              position: "bottom-center",
              autoClose: 7000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true
            })
            localStorage.removeItem("CarEditId")
            let userId  = jsCookie.get("user_id")
              setTimeout(() => {
                actions.setSubmitting(false);
                // Router.push(`/car/${id}/${car.car.brand.name.fa.replace(/ /ig,"-")}-${car.car.name.fa.replace(/ /ig,"-")}`);
                Router.push(`/profile?id=${userId}`);
              }, 1000);
          })
        }
        else {
          let timings = [];
          carTimings.map((val, index) => {
            if(val){
              timings.push({
                start_date: convertDateToMoment(val.date.from).format(
                  'jYYYY/jMM/jDD'
                ),
                end_date: convertDateToMoment(val.date.to).format(
                  'jYYYY/jMM/jDD'
                ),
                price_per_day: clearNumber(val.price),
                status_id: 'available'
              });
            }
          });
          REQUEST_setCarAvailability({
            token: jsCookie.get('token'),
            rental_car_id: id,
            data: JSON.stringify(timings)
          })
          .then(response => {
              setTimeout(() => {
                actions.setSubmitting(false);
                Router.push(`/car/${id}/${car.car.brand.name.fa}-${car.car.name.fa}`);
              }, 1000);
          })
        }
        
       
      }}
      validationSchema={Yup.object().shape({
        daysToGetReminded: Yup.number()
          .required(fieldErrorGenrator(t('carTiming.daysToGetReminded')))
          .typeError(fieldErrorGenrator(t('carTiming.daysToGetReminded')))
          .min(1, MinErrorGenrator(t('carTiming.daysToGetReminded'), 1))
          .max(31, MaxErrorGenrator(t('carTiming.daysToGetReminded'), 31)),
        minDaysToRent: Yup.number()
          .required(fieldErrorGenrator(t('carTiming.minDaysToRent')))
          .typeError(fieldErrorGenrator(t('carTiming.minDaysToRent')))
          .min(1, MinErrorGenrator(t('carTiming.minDaysToRent'), 1))
          .max(31, MaxErrorGenrator(t('carTiming.minDaysToRent'), 31)),
        distanceLimit: Yup.number()
          .required(fieldErrorGenrator(t('carTiming.distanceLimit')))
          .typeError(fieldErrorGenrator(t('carTiming.distanceLimit')))
          .min(50, MinErrorGenrator(t('carTiming.distanceLimit'), 50)),
        extraKm: Yup.number()
          .required(fieldErrorGenrator(t('carTiming.extraKmCost')))
          .typeError(fieldErrorGenrator(t('carTiming.extraKmCost')))
          .max(
            10000000,
            MaxErrorGenrator(t('carTiming.extraKmCost'), 10000000)
          ),
        cancellationPolicy: Yup.string()
          .required(fieldErrorGenrator(t('carTiming.cancellationPolicy')))
          .typeError(fieldErrorGenrator(t('carTiming.cancellationPolicy'))),
        availableInAllPrice: Yup.mixed()
          .when('radioGroup', {
            is: false, // alternatively: (val) => val == true
            then: Yup.number()
              .required(fieldErrorGenrator(t('carTiming.price')))
              .typeError(fieldErrorGenrator(t('carTiming.price'))),
            otherwise: Yup.number()
          })
          .when('$other', (other, schema) =>{                      
            other === 4 ? schema.max(6) : schema
          }
          )
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
        let radioPad;
        if (values.radioGroup == false) {
          radioPad = '0px';
        } else {
          radioPad = '0px';
        }
        if (mapApiToFormik) {
          // console.log("mapApiToFormik",isAllTimePrice);
          
          setMapApiToFormik(false);
          setFieldValue('distanceLimit', car.max_km_per_day);
          setFieldValue('extraKm', car.extra_km_price);
          setFieldValue('cancellationPolicy', car.cancellation_policy);
          setFieldValue('deliverAtRentersPlace', car.deliver_at_renters_place);
          setFieldValue('daysToGetReminded', car.days_to_get_reminded);
          setFieldValue('minDaysToRent', car.min_days_to_rent);
          // console.log('isAllTimePrice: ', isAllTimePrice);
          if (isIsAllTime) {
          
            // console.log('setting is all time price', isAllTimePrice);
            setFieldValue('availableInAllPrice', isAllTimePrice);
          } else {
            // console.log('setFieldValue', values.radioGroup);
            setFieldValue('radioGroup', true);
            // console.log('setFieldValue', values.radioGroup);
          }
        }
        return (
          <BoxAccount className="box_account" id="Step2InAddCar">
            <Form onSubmit={handleSubmit}>
              <h3 className="new_client">تعیین شرایط اجاره</h3>
              {/* <small className="float-right pt-2">* {$required_fields}</small> */}
              <Segment>
                <Item.Group>
                  <Item id="Step2Item">
                    <Item.Image src={(car.media_set[0] || { url: '' }).url}  />
                    <Item.Content id ="partOneInStepTwoOfAddCar">
                      <Item.Header as="a">
                        {`${car.car.brand.name.fa} - ${car.car.name.fa}`}
                      </Item.Header>
                      {/* <Item.Meta>{carDescription}</Item.Meta> */}
                      <div className="pelakTemp" style={{}}>
                        <div className="first">
                        {convertNumbers2Persian(
                            car.registration_plate_first_part
                          )}
                        </div>
                        <div className="second">
                            <span>{car.registration_plate_second_part}</span>
                        </div>
                        <div className="third">
                        {convertNumbers2Persian(
                            car.registration_plate_third_part
                          )}
                        </div>
                        <div className="forth">
                        {convertNumbers2Persian(
                            car.registration_plate_forth_part
                          )}
                        </div>
                      </div>
                      <Item.Description>
                        {/* <Pelak
                          first={convertNumbers2Persian(
                            car.registration_plate_first_part
                          )}
                          second={car.registration_plate_second_part}
                          third={convertNumbers2Persian(
                            car.registration_plate_third_part
                          )}
                          forth={convertNumbers2Persian(
                            car.registration_plate_forth_part
                          )}
                          type={1}
                          size={'small'}
                          style={{ maxWidth: '150px' }}
                        /> */}
                      </Item.Description>
                      {/* <Item.Extra>{carLocation}</Item.Extra> */}
                    </Item.Content>
                  </Item>
                  {/* carPelak, carColor, carYear, carMin_days_to_rent,
                        carDeliver_at_renters_place, , ,
                          */}
                </Item.Group>
                {/* ===================================================================== */}
                </Segment>
                <Segment>

                <Divider horizontal id="DividerInStep2">
                  <Header as="h4">
                    {/* <Icon name="edit" /> */}
                    شرایط اجاره
                  </Header>
                </Divider>
                {/* ===================================================================== */}
                <Form.Field style={{ margin: 0 }}>
                  <label id="Step2Lable">زمان اطلاع از اجاره</label>
                  <Input
                  
                    name="daysToGetReminded"
                    style={{direction:'ltr', display: 'contents'}}
                    className="numstep daysToGetReminded"
                    error={Boolean(
                      errors.daysToGetReminded && touched.daysToGetReminded
                    )}
                    onChange={(e, data) => {
                      if (data && data.name) {
                        setFieldValue(data.name, clearNumber(data.value));
                        setFieldTouched(data.name);
                      }
                    }}
                    value={convertNumbers2Persian(values.daysToGetReminded)}
                  >
                    <Label
                      basic
                      onClick={(e, data) => {
                        if (values.daysToGetReminded < 31) {
                          let val = Number(values.daysToGetReminded);
                          setFieldValue('daysToGetReminded', ++val);
                        }
                      }}
                    >
                      <Icon name="plus" />
                    </Label>
                    <input data-hj-whitelist inputMode="numeric" />
                    <Label
                      basic
                      onClick={(e, data) => {
                        if (values.daysToGetReminded > 1) {
                          let val = Number(values.daysToGetReminded);
                          setFieldValue('daysToGetReminded', --val);
                        }
                      }}
                    >
                      <Icon name="minus" />
                    </Label>
                    <span>روز قبل</span>
                  </Input>
                </Form.Field>
                {/* ===================================================================== */}
                <Form.Field style={{ margin: 0 }}>
                  <label id="Step2Lable">حداقل مدت اجاره</label>
                  <Input
                    name="minDaysToRent"
                    style={{direction:'ltr', display: 'contents'}}
                    className="numstep minDaysToRent"
                    inputMode="numeric"
                    error={Boolean(
                      errors.minDaysToRent && touched.minDaysToRent
                    )}
                    onChange={(e, data) => {
                      if (data && data.name) {
                        setFieldValue(data.name, clearNumber(data.value));
                        setFieldTouched(data.name);
                      }
                    }}
                    value={convertNumbers2Persian(values.minDaysToRent)}
                  >
                    <Label
                      basic
                      onClick={(e, data) => {
                        if (clearNumber(values.minDaysToRent) < 31) {
                          let val = Number(clearNumber(values.minDaysToRent));
                          setFieldValue('minDaysToRent', clearNumber(++val));
                        }
                      }}
                    >
                      <Icon name="plus" />
                    </Label>
                    <input data-hj-whitelist inputMode="numeric" />
                    <Label
                      basic
                      onClick={(e, data) => {
                        if (clearNumber(values.minDaysToRent) > 1) {
                          let val = Number(clearNumber(values.minDaysToRent));
                          setFieldValue('minDaysToRent', clearNumber(--val));
                        }
                      }}
                    >
                      <Icon name="minus" />
                    </Label>
                    <span>روز</span>
                  </Input>
                </Form.Field>
                {/* ===================================================================== */}
                <Form.Field style={{ margin: 0 }} id="exceptioninstep2">
                  <label id="Step2Lable">محدودیت مسافت</label>

                  <Form.Input
                    // icon="search"
                    // iconPosition="left"
                    name="distanceLimit"
                    className="distanceLimit"
                    error={Boolean(
                      errors.distanceLimit && touched.distanceLimit
                    )}
                    onChange={(e, data) => {
                      if (data && data.name) {
                        setFieldValue(data.name, clearNumber(data.value));
                        setFieldTouched(data.name);
                      }
                    }}
                    value={
                      values.distanceLimit
                        ? convertNumbers2Persian(
                          numberWithCommas(values.distanceLimit)
                        )
                        : values.distanceLimit
                    }
                  >
                    <input data-hj-whitelist inputMode="numeric"  
                  
                    />
                  </Form.Input>
                  <span
                    style={{
                      float: 'none',
                      lineHeight: '48px',
                      marginRight: '8px'
                    }}
                  >
                    کیلومتر در روز
                  </span>
                </Form.Field>
                {/* ===================================================================== */}
                <Form.Field style={{ margin: 0 }} id="exceptioninstep2">
                  <label id="Step2Lable">هزینه هر کیلومتر اضافه</label>
<div className="extraKm" id="DudeComeOn">
                  <Form.Input
                  
                    // icon="search"
                    // iconPosition="left"
                    name="extraKm"
                    
                    className="extraKm"
                    inputMode="numeric"
                    //   type="number"
                    error={Boolean(errors.extraKm && touched.extraKm)}
                    onChange={(e, data) => {
                      if (data && data.name) {
                        setFieldValue(data.name, clearNumber(data.value));
                        setFieldTouched(data.name);
                      }
                    }}
                    value={
                      values.extraKm
                        ? convertNumbers2Persian(
                          numberWithCommas(values.extraKm)
                        )
                        : values.extraKm
                    }
                  >
                    <input data-hj-whitelist inputMode="numeric" />
                  </Form.Input>
                  </div>
                  <span
                    style={{
                      float: 'none',
                      lineHeight: '48px',
                      marginRight: '8px'
                    }}
                  >
                    تومان
                  </span>
                </Form.Field>
                {/* ===================================================================== */}
                <Form.Field>
                  <Checkbox
                    label="در محل اجاره‌گیرنده تحویل می‌دهم"
                    name="deliverAtRentersPlace"
                    id="deliverAtRentersPlace"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.deliverAtRentersPlace}
                  />
                </Form.Field>
                {/* ===================================================================== */}
                {/* ===================================================================== */}
                </Segment>
                <Segment>

                <Divider horizontal id="DividerInStep2">
                  <Header as="h4">
                    {/* <Icon name="calendar alternate outline" /> */}
                    تاریخ و نرخ اجاره
                  </Header>
                </Divider>
                {/* ===================================================================== */}
                <Form.Field className="marg8">
                  <Radio
                  select
                    label="موجود در تمام تاریخ‌ها با قیمت یکسان"
                    name="radioGroup"
                    value={false}
                    checked={values.radioGroup === false}
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
                </Form.Field>
                {values.radioGroup == false && (
                  <div>
                    {/* <Form.Field style={{ margin: 0 }}>
                      <label>{t('carTiming.extraKmCost')}</label>
                    </Form.Field> */}
                    <Input
                      // icon="search"
                      // iconPosition="left"
                      name="availableInAllPrice"
                      className="extraKm"
                      error={Boolean(
                        errors.availableInAllPrice &&
                        touched.availableInAllPrice
                      )}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setFieldValue(data.name, clearNumber(data.value));
                          setFieldTouched(data.name);
                        }
                      }}
                      value={
                        values.availableInAllPrice
                          ? convertNumbers2Persian(
                            numberWithCommas(values.availableInAllPrice)
                          )
                          : values.availableInAllPrice
                      }
                    >
                      <input data-hj-whitelist inputMode="numeric" />
                    </Input>
                    <span
                      style={{
                        float: 'right',
                        lineHeight: '48px',
                        marginRight: '8px'
                      }}
                    >
                      تومان در روز
                    </span>
                  </div>
                )}
                {/* ===================================================================== */}
                <Form.Field style={{ paddingTop: radioPad }}>
                  <Radio
                    label="موجود در بازه‌های زمانی مختلف با قیمت‌های متفاوت"
                    name="radioGroup"
                    value={true}
                    checked={values.radioGroup === true}
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
                </Form.Field>
                {values.radioGroup == true && (
                  <>
                  {/* {console.log("car timings before ",carTimings)} */}
                  <TimeRangesSelector
                  error = {error}
                    carTimings={carTimings}
                    disabledDays={disabledDays}
                    modifyCarTimings={modifyCarTimings}
                  />
                  </>
                )}
                 {/* ===================================================================== */}
                 </Segment>
                <Segment>
                 <Divider horizontal id="DividerInStep2">
                  <Header as="h4">
                    {/* <Icon name="calendar alternate outline" /> */}
                    تخفیف‌‌ها
                  </Header>
                </Divider>
                {/* ===================================================================== */}
                <p>می‌توانید برای اجاره‌های با مدت بیشتر تخفیف تعیین کنید.</p>
                <DiscountsSelector
                    carDiscounts={carDiscounts}
                    modifyCarDiscounts={modifyCarDiscounts}
                  />
                {/* ===================================================================== */}
                <Form.Group>
                  <Form.Field
                    control={TextArea}
                    label="شرایط اجاره و کنسلی"
                    id="cancellationPolicy Step2Lable"
                    name="cancellationPolicy"
                    placeholder="شرایط اجاره و کنسلی"
                    style={{ minHeight: 150 }}
                    error={Boolean(
                      errors.cancellationPolicy && touched.cancellationPolicy
                    )}
                    onChange={(e, data) => {
                      if (data && data.name) {
                        setFieldValue(data.name, data.value);
                        setFieldTouched(data.name);
                      }
                    }}
                    onBlur={handleBlur}
                    value={values.cancellationPolicy}
                    data-hj-whitelist
                  />
                </Form.Group>
                {/* ===================================================================== */}
                <Form.Field style={{ textAlign: 'center', fontSize: '0.8em' }}>
                  <Button
                    loading={isSubmitting && !error}
                    primary
                    type="submit"
                    className="btn_1 full-width SET_CAR_AND_TIMMING"
                  >
                    تایید
                  </Button>
                  {/* {isSubmitting && (
                      <Progress
                        value={this.state.submittingSteps}
                        total="7"
                        indicating={isSubmitting}
                        success={this.state.submittingSteps == 7}
                      />
                    )} */}
                </Form.Field>
                {error && (
                  <Label attached="bottom" color="red">
                {CustomeError ? "لطفا نرخ اجاره را وارد کنید." :t('forms.error')}
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
};

export default withTranslation('common')(
  connect(state => state)(SetCarTimingForm)
);
