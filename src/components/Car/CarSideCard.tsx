import * as React from 'react';
import { useState } from "react";
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import StarRatingComponent from 'react-star-rating-component';
import { Icon, Segment, Button, Popup } from 'semantic-ui-react';
import { UserCard } from '../Cards';
import {
    convertDateToMoment,
    convertMomentToDate,
    convertRangeDateToMoment,
    convertMomentsToDateRange,
    getBetweenRange
} from '../../utils/date';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English, getShortVersion } from '../../utils/numbers';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CarDateRange } from './index';
import jsCookie from 'js-cookie';
import axios from 'axios';


import 'otoli-react-persian-calendar-date-picker/lib/DatePicker.css';
import DatePicker from 'otoli-react-persian-calendar-date-picker';

const Card = styled.nav`
    // .DatePicker__calendarContainer {
    //     display: none;
    // }
    .DatePicker__input {
        font-size: 15px;
        font-family: Vazir;
        border: none;
        cursor:pointer
    }
    .price {
        top: -20px;
        position: relative;
        text-align: center;
        width: auto;
        height: 80px;
        padding: 5px;
        margin: 0 auto;
        .number{
            height: 34px;
            line-height: 43px;
            display: block;
            width: 65px;
            margin: 0 auto;
            font-weight: 500;
        }
        .unit{
            padding: 0px;
            display: block;
            .strong{
                font-size: 14px;
                display: block;
                font-weight: 400;
            }
        }
    }
`;

const CarideCard: React.FunctionComponent<{
    date?: any;
    price: any;
    start?:string;
    loading?: boolean;
    allow?:any;
    rentalCarID?:any;
end?:string;
    user: any;
    reserveFunction: any;
}> = ({ date, price, user, reserveFunction,start,end,loading,allow,rentalCarID }) => {
    const [newSI,SetNewSI] = useState(null);
    const [resTrue,SetresTrue] = useState(false);
    const [loader,setLoader] = useState(false)
    const [NewDate, setNewDate] = useState({
        from: null,
        to: null
      });

    console.log("user",price)
    let Randprice= "خطا"
    if(price){
        
        Randprice= convertNumbers2Persian(getShortVersion(price).number);
        let  bo = convertNumbers2Persian(getShortVersion(price).number).indexOf(".") === -1
        let  pos = convertNumbers2Persian(getShortVersion(price).number).indexOf(".")
        if(!bo){
            if(price > 1000000){
                Randprice = convertNumbers2Persian(getShortVersion(price).number).slice(0, pos+2)
            }else{
                Randprice = convertNumbers2Persian(getShortVersion(price).number).slice(0, pos)
            }
        }
    }

    const fetchData = async () =>{
        setLoader(true)
        let token = jsCookie.get("token")
        const DOMAIN = process.env.PRODUCTION_ENDPOINT;
        const GET_SEARCH_FOR_RENT = '/core/rental-car/search-for-rent/list';
        axios
      .post(
        DOMAIN +
          GET_SEARCH_FOR_RENT ,
          {
            rental_car_id:rentalCarID,
            start_date:`${NewDate.from.year}/${NewDate.from.month}/${NewDate.from.day}`,
            end_date:`${NewDate.to.year}/${NewDate.to.month}/${NewDate.to.day}`
          },
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
      )
      .then(response => {
        setLoader(false)
        SetresTrue(true)
        SetNewSI(response.data.items[0].search_id);
      })
      .catch(e=>{
        setLoader(false)

          console.log(e);
      })
    }
    return (
        <Card>
            {(price > 0) &&
                <div className="price">
                    <span className="number" style={{ fontSize: 30 + 'px' }}>
                        <span>
                            {/* {convertNumbers2Persian(getShortVersion(price).number)} */}
                            {Randprice}
                        </span>
                    </span>
                    <span className="unit">
                        <span className="strong">{getShortVersion(price).unit} تومان</span>
                        <span>در روز</span>
                    </span>
                </div>
            }
            {start && end &&<p style={{textAlign:"center", marginBottom:'0px'}}>
                {resTrue ? "" :<>
                 از{" "} 
                <span style={{fontWeight:'500'}}>{convertNumbers2Persian(start).slice(0, start.length-2)}</span>
                {" "} تا {" "}
                <span style={{fontWeight:'500'}}>{convertNumbers2Persian(end).slice(0, end.length-2)}</span>
                </>}
                <DatePicker
                      selectedDayRange={NewDate}
                      onChange={setNewDate}
                      inputPlaceholder="تغییر تاریخ"
                      isDayRange
                      disableBackward
                      colorPrimary={'#00ACC1'}
                      colorPrimaryLight={'#00acc147'}
                    />
                    <Button
                    basic
            onClick={()=>{
                SetresTrue(false)
                SetNewSI(null)
                setNewDate({
                    from: null,
                    to: null
                  });
            }}
                >
                    انصراف 
                </Button>
            <Button
            loading ={loader}
            onClick={()=>{
                fetchData()
            }}
                >
اعمال
                </Button>
                
            </p>
            }
            {/* <CarDateRange from={convertMomentToDate(date.start)} to={convertMomentToDate(date.end)} /> */}
            <UserCard
                id={user.id}
                firstname={user.first_name}
                lastname={user.last_name}
                username={user.username}
                company_name={user.company_name}
                responceTime="میانگین زمان پاسخگویی: نامشخص"
                image={user.image_url}
            />
            {user.id.toString() !== jsCookie.get('user_id') && allow !== "true" ?
            <>
            <Button
            className ="CONTINUE_TO_RENT_CAR"
            loading = {loading}
                style={{ height: '48px' }}
                size='large'
                fluid
                onClick={() => reserveFunction(newSI)}
                >ادامه</Button>
                
            <div
                style={{ marginTop: '8px' }}
                className="text-center"
            >
                <small dir="rtl">هزینه را بعد از پذیرش درخواست توسط مالک خودرو پرداخت
                    خواهید کرد.</small>
            </div>
            </>
            : null}
        </Card>
    )
};

export default CarideCard;

interface IDate {
    year: number;
    month: number;
    day: number;
}

interface IRange {
    from: IDate;
    to: IDate;
}

