import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Form,
  Grid,
  Icon,
  Label,
  Segment,
  TextArea,
  Transition
} from 'semantic-ui-react';
import Nouislider from "nouislider-react";
import { Formik, FormikActions, withFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { i18n, withTranslation } from '../../i18n';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });
import { Box, Flex } from '@rebass/grid';
import { FilterType } from "./FilterType";
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English, getShortVersion } from '../../utils/numbers';
import { PriceCard } from '../Cards';
import { ITheme } from "../../theme/Interfaces";

const FilterAndSort = styled.div`
    width: 100vw;
    padding: 10px 0 5px 0;
    // background: ${({theme}:{theme:ITheme}) => theme.color.whiteBackground};
    border-bottom: 1px solid ${({theme}:{theme:ITheme}) => theme.color.fadedGray};
    z-index: 99 !important;
    position: relative;
    ul {
        display: flow-root;
        margin: 0;
        li {
            margin-right: 10px;
            &:first-child {
                float: left;
            }
            &:nth-child(2) {
                float: right;
                margin-right: 0;
            }
            &:nth-child(3) {
                float: right;
                margin-right: 0;
                @media (max-width: 767px) {
                    display: none;
                }
            }
            &:nth-child(4) {
                float: right;
                @media (max-width: 767px) {
                    margin-right: 0;
                }
            }
        }
    }
    .switch-field {
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 3px;
        input {
            position: absolute !important;
            clip: rect(0, 0, 0, 0);
            height: 1px;
            width: 1px;
            border: 0;
            overflow: hidden;
            &:checked + label {
                box-shadow: none;
                color: rgba(0, 0, 0, 0.9);
            }
        }   
        label {
            display: inline-block;
            min-width: 65px;
            color: rgba(0, 0, 0, 0.5);
            font-weight: 600;
            font-size: 12px;
            font-size: 0.75rem;
            text-align: center;
            text-shadow: none;
            padding: 10px 8px 8px 8px;
            line-height: 1;
            border-right: 1px solid rgba(0, 0, 0, 0.08);
            transition: all 0.2s ease-in-out;
            margin: 0;
            @media (max-width: 575px) {
                min-width: inherit;
            }
            &:first-of-type {
                border-left: 0;
            }
            &:last-of-type {
                border-right: 0;
            }
            &:hover {
                cursor: pointer;
                color: ${({theme}:{theme:ITheme}) => theme.color.mainForeground};
            }
        }
    }
    a.btn_filt, a.btn_filt_map {
        border-radius: 3px;
        padding: 8px 12px 8px 10px;
        line-height: 1;
        margin-bottom: 5px;
        display: inline-block;
        border: 1px solid rgba(0, 0, 0, 0.08);
        font-weight: 600;
        font-size: 12px;
        font-size: 0.75rem;
        color: rgba(0, 0, 0, 0.5);
        position: relative;
        cursor: pointer;
    }
    a.btn_map {
        border-radius: 3px;
        padding: 8px 12px 8px 10px;
        line-height: 1;
        margin-bottom: 5px;
        display: inline-block;
        border: 1px solid rgba(0, 0, 0, 0.08);
        font-weight: 600;
        font-size: 12px;
        font-size: 0.75rem;
        color: rgba(0, 0, 0, 0.5);
    }
    .MoreFilterLoad{
      display:none;
      @media (max-width: 990px) {
        display:block
      }
    } 
`;

const FiltersDiv = styled.div`
  background-color: ${({theme}:{theme:ITheme}) => theme.color.whiteBackground};
  border-bottom: 1px solid ${({theme}:{theme:ITheme}) => theme.color.fadedGray};
  overflow: hidden;
  .rangeclass{
    padding: 5px 30px;
  }
  h6 {
      margin-bottom: 15px;
      font-size: 16px;
      font-size: 1rem;
      text-align: right
  }
  /* ul li small {
    font-weight: 600;
    float: left;
    position: relative;
    top: 4px;
  } */
  
  /* &:not(.show) {
    display: none;
  } */

`;

// interface ISearchResultFormValues {
//   carCity: number;
//   startDate: any;
//   endDate: any;
// }

export class FilterAndSortBar extends React.Component<{
  t?: any;
  showFilters: boolean;
  toggleToCarBodyType: any;
  toggleShowFilters: any;
  toggleDeliverAtRentersPlace: any;
  togglePriceSort: any;
  setBrandAndGetModels: any;
  setModel: any;
  setPrice: any;
  brand: any;
  model: any;
  brands: any;
  models: any;
  brandLoading: any;
  modelLoading: any;
  price: any;
  priceSort: any;
  deliverAtRentersPlace: any;
  carBodyType: any;
  stats?: any;
}> {
  state = {
    error: '',
  };

  constructor(props) {
    super(props);
  }

  onSlide = (render, handle, value, un, percent) => {
    // console.log("run")
    this.props.setPrice(value);
  };

  render() {
    const { t, showFilters, brands, brand, models, model, deliverAtRentersPlace, price, priceSort,
      brandLoading, modelLoading } = this.props;
    const { setBrandAndGetModels, setModel, toggleShowFilters, togglePriceSort,
      toggleDeliverAtRentersPlace, setPrice, toggleToCarBodyType, carBodyType, stats } = this.props;
    const { brandsEnglish, brandsFarsi } = brands;
    const { modelsEnglish, modelsFarsi } = models;
    const az = <span style={{}}>از</span>;
    const ta = <span style={{}}>تا</span>;
    return (
      <>
          <FilterAndSort className="filters_listing sticky_horizontal ">
            <div className="container">
              <ul className="clearfix">
                <li>
                  <div className="switch-field">
                    <input
                      type="radio"
                      id="all"
                      name="listing_filter"
                      value="all"
                      checked={priceSort == "price"}
                    />
                    <label onClick={(e) => { togglePriceSort("price") }}>قیمت کم به زیاد</label>
                    <input
                      type="radio"
                      id="latest"
                      name="listing_filter"
                      value="latest"
                      checked={priceSort == "-price"}
                    />
                    <label onClick={(e) => { togglePriceSort("-price") }} >قیمت زیاد به کم</label>
                  </div>
                </li>
                <li className="MoreFilterLoad">
                  <a
                    className="btn_filt"
                    data-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="filters"
                    onClick={() => { toggleShowFilters(!showFilters) }}
                  ><Icon name='options' /> {showFilters ? "گزینه‌های کمتر" : "گزینه‌های بیشتر"}</a
                  >
                </li>
                <li>
                  <div className="layout_view">
                    <a href="#0" className="active"><i className="icon-th"></i></a>
                    <a href="/listing-2"><i className="icon-th-list"></i></a>
                    <a href="/list-map"><i className="icon-map"></i></a>
                  </div>
                </li>
                {/* <li>
                    <a
                        className="btn_map"
                        data-toggle="collapse"
                        href="#collapseMap"
                        aria-expanded="false"
                        aria-controls="collapseMap"
                        data-text-swap="Hide map"
                        data-text-original="View on map"
                        >View on map</a
                    >
                    </li> */}
              </ul>
            </div>
          </FilterAndSort>
        <Form>
          {/* ==> sajad */}
          {/* <FilterAndSort className="filters_listing sticky_horizontal hide_on_desktop"> */}
          <Transition visible={showFilters} duration={300}>
            <FiltersDiv className="collapse" id="filters">
              <div className="container margin_16">
                <div className="row">
                  <div className="col-12">
                    <h6>قیمت</h6>
                    <div className="rangeclass">
                      <div className="row" style={{ padding: '20px', paddingTop: '0px' }}>
                        <div className="col-6">
                          <PriceCard number={price[0]} preNumber={az} fontSize={25}>
                            در روز
                          </PriceCard>
                        </div>
                        <div className="col-6">
                          <PriceCard number={price[1]} preNumber={ta} fontSize={25}>
                            در روز
                          </PriceCard>
                        </div>
                      </div>
                      <Nouislider
                        range={{ min: 0, max: 2000000 }}
                        start={price}
                        margin={100000}
                        connect
                        direction={'rtl'}
                        onEnd={this.onSlide}
                        step={100000}
                      />
                    </div>
                  </div>
                </div>
                <div className="row margin_30_5">
                  <div className="col-12">
                    <h6>تحویل در محل</h6>
                    <ul>
                      <li>
                        <label className="container_check"> تحویل در محل <small>{stats.deliver_at_renters_place}</small>
                          <input
                            onClick={() => { toggleDeliverAtRentersPlace(!deliverAtRentersPlace) }}
                            type="checkbox"
                            checked={deliverAtRentersPlace}
                          />
                          <span className="checkmark" />
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <h6 style={{ width: '100%', paddingRight: '15px', paddingLeft: '15px', paddingBottom: '0px', margin: '0 0 .48571429rem 0' }}>نوع شاسی</h6>
                  <div className="col-6">
                    <ul>
                      <li>
                        <label

                          className="container_check" > سواری <small
                          >{stats.body_style_set.find(x => x.id === 1).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(1) }} type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check"
                        > مینی ون <small>{stats.body_style_set.find(x => x.id === 7).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(7) }} type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check"
                        >  هاچ‌بک <small>{stats.body_style_set.find(x => x.id === 1).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(9) }} type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check"
                        > شاسی‌بلند <small>{stats.body_style_set.find(x => x.id === 2).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(2) }}
                            type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check"
                        > کراس‌اور <small>{stats.body_style_set.find(x => x.id === 8).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(8) }}
                            type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>

                    </ul>
                  </div>
                  <div className="col-6" >
                    <ul>
                      <li>
                        <label className="container_check"

                        > کروک <small>{stats.body_style_set.find(x => x.id === 3).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(3) }} type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check"
                        > کوپه <small>{stats.body_style_set.find(x => x.id === 4).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(4) }} type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check"
                        > ون <small>{stats.body_style_set.find(x => x.id === 5).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(5) }} type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                      <li>
                        <label className="container_check"
                        > وانت <small>{stats.body_style_set.find(x => x.id === 6).count}</small>
                          <input onClick={(e) => { toggleToCarBodyType(6) }} type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Form.Dropdown
                      name="carBrand"
                      id="carBrand"
                      label={t('carProperty.brand')}
                      placeholder={t('carProperty.brand')}
                      noResultsMessage={t('forms.error_no_result_found')}
                      search
                      selection
                      clearable
                      loading={brandLoading}
                      options={
                        i18n.language === 'en'
                          ? brandsEnglish
                          : brandsFarsi
                      }
                      // error={Boolean(errors.carBrand && touched.carBrand)}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setBrandAndGetModels(data.value, "");
                          // setFieldValue(data.name, data.value);
                        }
                      }}
                      // onClose={(e, data) => {

                      // }}
                      // defaultValue={brand[0].value}
                      value={brand}
                    />
                    <Form.Dropdown
                      name="carModel"
                      id="carModel"
                      search
                      placeholder={t('carProperty.model')}
                      noResultsMessage={t('forms.error_no_result_found')}
                      // label={t('carProperty.model')}
                      selection
                      clearable
                      loading={modelLoading && !(brand == null || brand == "")}
                      disabled={brand == null || brand == ""}
                      options={
                        i18n.language === 'en'
                          ? modelsEnglish
                          : modelsFarsi
                      }
                      // error={Boolean(errors.carModel && touched.carModel)}
                      onChange={(e, data) => {
                        if (data && data.name) {
                          setModel(data.value, "");
                          // setFieldValue(data.name, data.value);
                        }
                      }}
                      // onClose={(e, data) => {
                      //   if (data && data.name) {
                      //     setFieldTouched(data.name);
                      //   }
                      // }}
                      // defaultValue={model[0].value}
                      value={model}
                    />
                  </div>
                </div>
              </div>
            </FiltersDiv>
          </Transition>
        </Form>

        <aside className="col-lg-3 hide_on_mobile margin_16 " id="sidebar">
          <Form>
            <div id="filters_col">
              <a
                data-toggle="collapse"
                href="#collapseFilters"
                aria-expanded="false"
                aria-controls="collapseFilters"
                id="filters_col_bt"
              >گزینه‌ها
              </a>
              <div className="collapse show" id="collapseFilters">
                <FilterType title='قیمت'>
                  <div className="rangeclass">
                    <div className="row" style={{ padding: '20px', paddingTop: '0px' }}>
                      <div className="col-6">
                        <PriceCard number={price[0]} preNumber={az} fontSize={25}>
                          در روز
                        </PriceCard>
                      </div>
                      <div className="col-6">
                        <PriceCard moreThan={(price[1] >= 2000000)} number={price[1]} preNumber={ta} fontSize={25}>
                          در روز
                        </PriceCard>
                      </div>
                    </div>
                    {/* ==> */}
                    <Nouislider
                      range={{ min: 0, max: 2000000 }}
                      start={price}
                      margin={100000}
                      connect
                      direction={'rtl'}
                      onEnd={this.onSlide}
                      step={100000}
                    />
                  </div>
                  <br /><br />
                  <ul>
                    <li>
                      <label className="container_check">تحویل در محل<small>{stats.deliver_at_renters_place}</small>
                        <input
                          onClick={() => { toggleDeliverAtRentersPlace(!deliverAtRentersPlace) }}
                          type="checkbox"
                          checked={deliverAtRentersPlace}
                        />
                        <span className="checkmark" />
                      </label>
                    </li>
                  </ul>
                </FilterType>
                <FilterType title='نوع شاسی'>
                  <ul>
                    <li>
                      <label

                        className="container_check"
                      > سواری <small>{stats.body_style_set.find(x => x.id === 1).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(1) }} type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"
                      > مینی ون <small>{stats.body_style_set.find(x => x.id === 7).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(7) }} type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"
                      >  هاچ‌بک <small>{stats.body_style_set.find(x => x.id === 9).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(9) }} type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"
                      >شاسی‌بلند<small>{stats.body_style_set.find(x => x.id === 2).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(2) }}
                          type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"
                      >کراس‌اور<small>{stats.body_style_set.find(x => x.id === 8).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(8) }}
                          type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"

                      >کروک<small>{stats.body_style_set.find(x => x.id === 3).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(3) }} type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"
                      >کوپه<small>{stats.body_style_set.find(x => x.id === 4).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(4) }} type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"
                      >ون <small>{stats.body_style_set.find(x => x.id === 5).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(5) }} type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                    <li>
                      <label className="container_check"
                      >وانت<small>{stats.body_style_set.find(x => x.id === 6).count}</small>
                        <input onClick={(e) => { toggleToCarBodyType(6) }} type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  </ul>
                </FilterType>
                <FilterType title='برند'>
                  <Form.Dropdown
                    name="carBrand"
                    id="carBrand"
                    // label={t('carProperty.brand')}
                    placeholder={t('carProperty.brand')}
                    noResultsMessage={t('forms.error_no_result_found')}
                    search
                    selection
                    clearable
                    loading={brandLoading}
                    options={
                      i18n.language === 'en'
                        ? brandsEnglish
                        : brandsFarsi
                    }
                    // error={Boolean(errors.carBrand && touched.carBrand)}
                    onChange={(e, data) => {
                      if (data && data.name) {
                        setBrandAndGetModels(data.value, "");
                        // setFieldValue(data.name, data.value);
                      }
                    }}
                    // onClose={(e, data) => {

                    // }}
                    // defaultValue={brand[0].value}
                    value={brand}
                  />
                  <Form.Dropdown
                    name="carModel"
                    id="carModel"
                    search
                    placeholder={t('carProperty.model')}
                    noResultsMessage={t('forms.error_no_result_found')}
                    // label={t('carProperty.model')}
                    selection
                    clearable
                    loading={modelLoading && !(brand == null || brand == "")}
                    disabled={!brand}
                    options={
                      i18n.language === 'en'
                        ? modelsEnglish
                        : modelsFarsi
                    }
                    // error={Boolean(errors.carModel && touched.carModel)}
                    onChange={(e, data) => {
                      if (data && data.name) {
                        setModel(data.value, "");
                        // setFieldValue(data.name, data.value);
                      }
                    }}
                    // onClose={(e, data) => {
                    //   if (data && data.name) {
                    //     setFieldTouched(data.name);
                    //   }
                    // }}
                    // defaultValue={model[0].value}
                    value={model}
                  />
                </FilterType>
              </div>
            </div>
          </Form>
        </aside>
      </>

    )
  }
}