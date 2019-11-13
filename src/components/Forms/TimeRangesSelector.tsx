import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Icon, Image, Item, Label, Segment, Form} from 'semantic-ui-react';
import 'otoli-react-persian-calendar-date-picker/lib/DatePicker.css';
import DatePicker from 'otoli-react-persian-calendar-date-picker';
import { i18n, withTranslation } from '../../i18n';
import { Box, Flex } from '@rebass/grid';
import jsCookie from 'js-cookie';
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
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });

function clearNumber(x) {
  return convertNumbers2English(x.toString())
    .replace(/,/g, '')
    .replace(/\./g, '')
    .replace(/\D/g, '');
}

const Page = styled.div`
`;

const TimeRangesSelector: React.FC<{
  t: any;
  carTimings: any;
  disabledDays: any;
  modifyCarTimings: any;
  error?:any
}> = ({
  t,
  carTimings = [],
  disabledDays, 
  modifyCarTimings,
  error
}) => {
  const empetyDate = {
    from: null,
    to: null
  };
  const [price, setPrice] = useState(null);
  const [date, setDate] = useState(empetyDate);
  const [showNewEntery, setShowNewEntery] = useState(false);
  const [openEditFor, setOpenEditFor] = useState(null);
  // console.log("Car timings: ", carTimings);
  return (
      <div style={{ maxWidth: '370px' }} className="DOOOOOD">
      <Segment.Group style={{ marginBottom: '12px', boxShadow:'0px 0px 1px #000 ', border:'none' }}>
        {carTimings.map((val, index) => {
          if (val == undefined) {
            return <></>;
          }
          if (openEditFor == index) {
            // console.log('date is: ', date);
            // console.log('price is: ', price);
            if (
              date.to === null &&
              date.from === null &&
              price === null
            ) {
              setDate({ from: val.date.from, to: val.date.to });
              setPrice(val.price);
              // console.log(
              //   'date and price setted from carTiming: ',
              //   date
              // );
            }
            return (
              <Segment key={index} style={{ textAlign: 'right' }} >
                <Form.Group>
                  <Form.Field
                    style={{ margin: 0, maxWidth: '47%' }}
                  >
                    <label>{t('carTiming.from')}</label>
                  </Form.Field>
                </Form.Group>
                <DatePicker
                  selectedDayRange={date}
                  onChange={value => {
                    // console.log('val ', value);
                    setDate({ from: value.from, to: value.to });
                    // console.log('date ', date);
                  }}
                  inputPlaceholder="انتخاب روزهای نمایش"
                  isDayRange
                  disableBackward
                  disabledDays={disabledDays}
                  colorPrimary={'#00ACC1'}
                  colorPrimaryLight={'#00acc147'}
                />
                <Form.Input
                  style={{ width: '47%', direction: 'ltr' }}
                  placeholder="قیمت"
                  label={t('carTiming.price')}
                  onChange={(e, data) => {
                    if (data) {
                      setPrice(clearNumber(data.value));
                    }
                  }}
                  value={
                    price
                      ? convertNumbers2Persian(
                        numberWithCommas(price)
                      )
                      : price
                  }
                >
                  <input inputMode="numeric" />
                  <span
                    style={{
                      float: 'right',
                      lineHeight: '48px',
                      marginRight: '8px'
                    }}
                  >
                    {t('carTiming.toman')}
                  </span>
                </Form.Input>
                <Button.Group
                  size="tiny"
                  style={{
                    flexDirection: 'row-reverse',
                    position: 'relative',
                    bottom: '-5px',
                    left: '-70px'
                  }}
                >
                  <Button
                    type="button"
                    className="pos_bott"
                    onClick={e => {
                      setDate(empetyDate);
                      setPrice('');
                      setShowNewEntery(false);
                      setOpenEditFor(null);
                    }}
                  >
                    لغو
                  </Button>
                  <Button
                    color="blue"
                    basic
                    type="button"
                    id="pos_bott2"
                    className="pos_bott"
                    onClick={e => {
                      // console.log(e);
                      let data = carTimings;
                      if (date.from && date.to && price) {
                        data.splice(index, 1, {
                          date,
                          price
                        });
                        modifyCarTimings(data);
                        setDate(empetyDate);
                        setPrice('');
                        setShowNewEntery(false);
                        setOpenEditFor(null);
                      }
                    }}
                  >
                    ثبت
                  </Button>
                </Button.Group>
              </Segment>
            );
          } else {
            return (
              <Segment key={index} style={{ textAlign: 'right' }}>
                <span>
                  <label>از</label>{' '}
                  {convertNumbers2Persian(
                    convertDateToMoment(val.date.from).format(
                      'jDD jMMMM jYY'
                    )
                  )}{' '}
                  <label>تا</label>{' '}
                  {convertNumbers2Persian(
                    convertDateToMoment(val.date.to).format(
                      'jDD jMMMM jYY'
                    )
                  )}{' '}
                  <br />
                  <label>با قیمت</label>{' '}
                  {convertNumbers2Persian(
                    numberWithCommas(val.price)
                  )}{' '}
                  تومان
                </span>
                <Icon
                  name="close"
                  onClick={e => {
                    let data = carTimings;
                    data.splice(index, 1);
                    // console.log(data);
                    modifyCarTimings(data);
                    setShowNewEntery(false);
                    setPrice(null);
                    setDate(empetyDate);
                  }}
                />
                <Icon
                  name="edit outline"
                  onClick={e => {
                    setShowNewEntery(false);
                    setOpenEditFor(index);
                    setPrice(null);
                    setDate(empetyDate);
                  }}
                />
              </Segment>
            );
          }
        })}

        {/* ======================  new form ========================= */}
        {showNewEntery && (
          <Segment className="timingEntery">
            <Form.Group>
              <Form.Field style={{ margin: 0, maxWidth: '100%' }}>
                <label>{t('carTiming.from')}</label>
                <DatePicker
                  selectedDayRange={date}
                  onChange={setDate}
                  inputPlaceholder="انتخاب روزهای نمایش"
                  isDayRange
                  disableBackward
                  disabledDays={disabledDays}
                  colorPrimary={'#00ACC1'}
                  colorPrimaryLight={'#00acc147'}
                />
              </Form.Field>
            </Form.Group>
            <Form.Input
            error={error}
              style={{ width: '47%',
              //  direction: 'ltr' 
               }}
              name="price"
              placeholder="قیمت"
              label={t('carTiming.price')}
              onChange={(e, data) => {
                if (data && data.name) {
                  setPrice(clearNumber(data.value));
                }
              }}
              value={
                price
                  ? convertNumbers2Persian(
                    numberWithCommas(price)
                  )
                  : price
              }
            >
              <input inputMode="numeric" />
              <span
                style={{
                  float: 'right',
                  lineHeight: '48px',
                  marginRight: '8px'
                }}
              >
                تومان
              </span>
            </Form.Input>
            <Button.Group
              size="tiny"
              className ="BUTTONSINSTEP2"

              style={{
                flexDirection: 'row-reverse',
                position: 'relative',
                bottom: '-20px',
                left: '-75px'
              }}
            >
              <Button
                basic
                type="button"
                className="pos_bott"
                onClick={e => {
                  setShowNewEntery(false);
                }}
              >
                حذف
              </Button>
              <Button
                color="blue"
                basic
                type="button"
                className="pos_bott"
                id="pos_bott"
                onClick={e => {
                  // console.log(e);
                  let data = carTimings;
                  // console.log("Data is ", data);
                  if (date.from && date.to && price) {
                    data.push({
                      date,
                      price
                    });
                    modifyCarTimings(data);
                    setDate(empetyDate);
                    setPrice('');
                    setShowNewEntery(false);
                  }
                }}
              >
                ثبت
              </Button>
            </Button.Group>
          </Segment>
        )}
      </Segment.Group>
      <div
        style={{
          textAlign: 'right',
          marginBottom: '24px'
        }}
      >
      {!showNewEntery &&  <Button
          icon
          labelPosition="right"
          type="button"
          basic
          color="blue"
          onClick={e => {
            setDate(empetyDate);
            setPrice('');
            setShowNewEntery(true);
            setOpenEditFor(null);
          }}
        >
          افزودن بازه زمانی
          <Icon name="plus" />
        </Button>
      }
      </div>
    </div>
  );
}

export default withTranslation('common')(TimeRangesSelector);
