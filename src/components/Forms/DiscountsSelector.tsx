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
import { daysFarsi } from '../../constants/options';

function clearNumber(x) {
  return convertNumbers2English(x.toString())
    .replace(/,/g, '')
    .replace(/\./g, '')
    .replace(/\D/g, '');
}

const Component = styled.div`
  .percent.icon{
    height: 48px !important;
  }
`;

const DiscountsSelector: React.FC<{
  t: any;
  carDiscounts: any;
  modifyCarDiscounts: any;
}> = ({
  t,
  carDiscounts = [],
  modifyCarDiscounts
}) => {
  const [percent, setPercent] = useState(null);
  const [duration, setDuration] = useState(null);
  const [showNewEntery, setShowNewEntery] = useState(false);
  const [openEditFor, setOpenEditFor] = useState(null);
  // console.log("Car discounts: ", carDiscounts);
  return (
    <Component style={{ maxWidth: '370px' }}>
      <Segment.Group style={{ marginBottom: '12px',border: 'none',boxShadow: '0px 0px 1px #000' }}>
        {carDiscounts.map((val, index) => {
          if (val == undefined) {
            return <></>;
          }
          if (openEditFor == index) {
            // console.log('percent is: ', percent);
            // console.log('duration is: ', duration);
            if (percent === null && duration === null) {
                setDuration(val.duration);
                setPercent(val.percent);
            }
            return (
              <Segment key={index} style={{ textAlign: 'right' }}>
                <Form.Group>
                  <Form.Field
                    style={{ margin: 0, maxWidth: '47%' }}
                  >
                    <label>{t('carTiming.from')}</label>
                  </Form.Field>
                </Form.Group>
                {/* duration picker */}
                <Form.Dropdown
                    label={'تعداد روزها'}
                    placeholder={'تعداد روزها'}
                    selection
                    options={daysFarsi}
                    loading={duration === null}
                    onChange={(e, data) => {
                      if (data && data.name) {
                        setDuration(data.value);
                      }
                    }}
                    defaultValue={duration}
                  />
                {/* percent picker */}
                <Form.Input
                  style={{ width: '47%',
                  //  direction: 'ltr'
                   }}
                  placeholder="درصد"
                  label="درصد"
                  icon='percent'
                  onChange={(e, data) => {
                    if (data) {
                        setPercent(clearNumber(data.value));
                    }
                  }}
                  value={
                    percent
                      ? convertNumbers2Persian(percent)
                      : percent
                  }
                >
                  <Icon name='percent' />
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
                      setDuration(null);
                      setPercent(null);
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
                      let data = carDiscounts;
                      if (duration && percent) {
                        data.splice(index, 1, {
                          duration,
                          percent
                        });
                        modifyCarDiscounts(data);
                        setDuration(null);
                        setPercent(null);
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
                  <label>برای اجاره‌ بیشتر از </label>{' '} {convertNumbers2Persian(val.duration)} روز
                  <br />
                  {' '} {convertNumbers2Persian(val.percent)}{' '}
                  درصد تخفیف
                </span>
                <Icon
                  name="close"
                  onClick={e => {
                    
                    let data = carDiscounts;
                    data.splice(index, 1);
                    // console.log("E ===> ",data);
                    setOpenEditFor(null);
                    modifyCarDiscounts([]);
                    setShowNewEntery(false);
                    setPercent(null);
                    setDuration(null);
                  }}
                />
                <Icon
                  name="edit outline"
                  onClick={e => {
                    // console.log("E ===> ",e);
                    setShowNewEntery(false);
                    setOpenEditFor(index);
                    setPercent(null);
                    setDuration(null);
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
                {/* <label>بیشتر از n روز، n% تخفیف.</label> */}
                {/* duration picker */}
                <Form.Dropdown
                    label={'بیشتر از '}
                    placeholder={'تعداد روز'}
                    selection
                    options={daysFarsi}
                    onChange={(e, data) => {
                      if (data && data.value) {
                        setDuration(data.value);
                      }
                    }}
                    value={(duration || {}).value}
                  />
              </Form.Field>
            </Form.Group>
            <Form.Input
              style={{ width: '47%', direction: 'ltr'  }}
              name="percent"
              placeholder="درصد تخفیف"
              label="درصد تخفیف"
              icon='percent'
              onChange={(e, data) => {
                if (data && data.name) {
                  setPercent(clearNumber(data.value));
                }
              }}
              value={
                percent
                  ? convertNumbers2Persian(percent)
                  : percent
              }
            >
              <Icon name='percent' />
              <input inputMode="numeric" />
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
                  let data = carDiscounts;
                  // console.log("Data is ", data);
                  if (duration && percent) {
                    data.push({
                      duration,
                      percent
                    });
                    modifyCarDiscounts(data);
                    setDuration(null);
                    setPercent(null);
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
       {!showNewEntery && <Button
          icon
          labelPosition="right"
          type="button"
          basic
          color="blue"
          onClick={e => {
            setDuration(null);
            setPercent(null);
            setShowNewEntery(true);
            setOpenEditFor(null);
          }}
        >
          افزودن تخفیف
          <Icon name="plus" />
        </Button>
       }
      </div>
    </Component>
  );
}

export default withTranslation('common')(DiscountsSelector);
