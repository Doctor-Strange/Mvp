import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import Router from 'next/router';
import {Link} from '../../../routes'
import { Button, Icon, Form, Label, Grid, Segment, Rating, TextArea } from 'semantic-ui-react'
import 'react-toastify/dist/ReactToastify.css';
import swal from '@sweetalert/with-react'
import { Pelak, DateGrid } from './index';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English, getShortVersion } from '../../utils/numbers';
import jsCookie from 'js-cookie';
import { REQUEST_setOrderStatus } from '../../API';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern' });
import { ITheme } from "../../theme/Interfaces";
import { ToastContainer, toast } from "react-toastify";



const Card = styled.div`
    direction: rtl;
    margin-top: 16px;
    margin-bottom: 16px;
    .label{
        background: ${({theme}:{theme:ITheme}) => theme.color.cardLabels};
    }
    .maincolor { 
        color: ${({theme}:{theme:ITheme}) => theme.color.mainForeground};
    }
    .ui.padded.segment {
        padding: 8px 8px 16px 8px;
    }
    .margintop8 {
        margin-top: 8px !important;
        top: -20px;
        position: relative;
        padding: 0 16px;
    }
    h3 {
        margin-bottom: 16px;
        margin-top: 8px;
        font-size: 17px;
    }
    #Text_wrapper{
        @media (max-width:557px){
            font-size:12px;
        } 
    }
    // #img_wrapper{
    //     @media (max-width:720px){
    //         display:block !important;
    //         width:100% !important
    //     }
    // }
    .img_wrapper{
        padding: 0 !important;
        text-align:center;
        img {
            /* width: 150px; */
            height: auto;
            border-radius: .28571429rem;
            max-height: 105px;
        }
    }
    .DD {
        margin-top:14px !important;
        *{
            font-size: 14px;
font-weight: 400;
        }
    }
    @media (max-width:575px){
        .DD{
            margin-top:25px !important;
            *{
                padding:0;
                font-size: 12px;
    font-weight: 400;
            }
        }
    }
    .property {
        padding: 0 !important;
        margin-top: 8px;
        .column {
            font-size: 1.2em;
            &.right{
                text-align: right !important;
            }
            &.left {
                text-align: left !important;
            }
        }
        .date {
            width: 80px;
            text-align: center;
        }
    }
    .buttons{
        padding-bottom: 0px !important;
        margin: 0 !important;
        button {
            height: 40px;
            margin: 0;
            font-weight: 500;
            &.left{
            }
            &.right{
            }
        }
        .column {
            padding: 0 !important;
        }
    }
    .pelak {
        margin-top: 16px;
        .four.column.row {
            width: 170px !important;
            left: 0 !important;
        }
        @media (max-width:557px){
            .flrt{
                width: 100%;
            }
            .four.column.row {
                width: 108% !important;
                margin: 0;
                padding: 0;
                div , span{
                    font-size: 12px;
                    line-height: 2;
                }
            }
        }
    }
`;

interface IRequestCard {
    id: any;
    status: 'new' | 'rejected' | 'approved' | 'paid' | 'cancelled' | 'not_delivered' | 'delivered' | 'returned',
    statusOwner: 'owner' | 'renter',
    carName: string;
    start: any;
    end: any;
    price: number;
    ownerInfo:any;
    ownerName: string;
    ownerPhone: string;
    pelak: any;
    picture?: any;
    style?: any;
    refresh?: any;
    reviewStatus?: any;
    no_of_days?:Number;
    company_name?:string
//     coupon?:number,
// insurance_total_price?:number
}

interface IdoAction {
    id: string;
    action:
    | 'approve'
    | 'reject'
    | 'pay'
    | 'cancel'
    | 'deliver'
    | 'return'
    | 'rate';
    payload?: {
        toRate: 'owner' | 'renter'; // only in rate action
        type: 'user' | 'rent-order'; // only in rate action
        user_profile_id?: string; // only in rate action
        rate?: number; // only in rate action
        review?: string; // only in rate action
    };
}

export const RequestCard: React.SFC<IRequestCard> = ({
    id,
    status,
    statusOwner,
    carName,
    start,
    end,
    price = 10,
    ownerName,
    ownerInfo,
    ownerPhone,
    userID,
    pelak = { first: "", second: "", third: "", forth: "" },
    picture,
    style = {},
    avatarImage,
    refresh,
    reviewStatus,
    no_of_days,
    renterInfo,
    company_name,
//     coupon,
// insurance_total_price
}) => {
    const [star1, setStar1] = useState();
    const [star2, setStar2] = useState();
    const [text, setText] = useState();
    const [loader , setLoader] = useState(false)
    const [canRate, setCanRate] = useState(false);
    const doAction = async (data: IdoAction) => {
        const res = await REQUEST_setOrderStatus({ ...data, token: jsCookie.get('token') });
        setLoader(false)
        if (data.action == 'pay') {
            Router.push(res.redirect_to, res.redirect_to, { shallow: false });
        }
        else {
            refresh();
        }
    }

    // useEffect(() =>{
    //         console.log("===>",insurance_total_price, price , coupon);
            
    //         ()=>{
    //             if(insurance_total_price){
    //             if(coupon){
    //                 price = coupon + insurance_total_price
    //             }else{
    //                 price = price + insurance_total_price
    //             }
    //         }else if(coupon){
    //             price = coupon
    //         } 
    //         console.log(price)
    //     } 
    // },[])


    const openPhoneModal = (id) => {
        swal(
            <div>
                <h1>شماره تلفن اجاره‌گیرنده</h1>
                <span>{convertNumbers2Persian("0" + ownerPhone)}</span>
            </div>,
            {
                button: {
                    text: "بستن",
                    closeModal: true,
                },
            }
        );
    }

    const openRatingModal = (id) => {
        // toast.success(
        //     statusOwner === 'renter'
        //     ?"امیدواریم سفر خوبی را تجربه کرده باشید. لطفا نظرتان در مورد ماشین و اجاره دهنده را با سایر کاربران در میان بگذارید."
        //     : "لطفا نظرتان را در مورد اجاره گیرنده با ما به اشتراک بگذارید"
        //     , {
        //     position: "bottom-center",
        //     autoClose: false,
        //     hideProgressBar: true,
        //     closeOnClick: false,
        //     pauseOnHover: true,
        //     draggable: true
        //   });
        // console.log(id,
        //     status,
        //     statusOwner,
        //     carName,
        //     start,
        //     end,
        //     price = 10,
        //     ownerName,
        //     ownerInfo,
        //     ownerPhone,
        //     userID,
        //     pelak = { first: "", second: "", third: "", forth: "" },
        //     picture,
        //     style = {},
        //     refresh,
        //     reviewStatus,
        //     no_of_days)
        let localStar1 = 0;
        let localStar2 = 0;
        let localText = null;
        const settingStar1 = (e, data) => {
            localStar1 = data.rating;
        }

        const settingStar2 = (e, data) => {
            localStar2 = data.rating;
        }

        const settingText = (e, data) => {
            localText = data.value;
        }
        swal(
            <div>
                {/* <h3>اامتیاز دهید</h3> */}
                <Form>
                    <Form.Field>
                    {statusOwner === 'renter' &&
                        <Form.Field>
                        <img src={picture} alt="تصویر خودرو" className="RATE_CAR_IMAGE"/>
                        <h4 className="CarName-RATE">{carName}</h4>
                            <label style={{fontWeight: '100'}}>امتیاز شما به خودرو</label>
                            <Rating
                                maxRating={5}
                                defaultRating={star2}
                                icon='star'
                                size='huge'
                                onRate={settingStar2}
                            />
                        </Form.Field>
                    }
                        <img src={avatarImage} alt="تصویر کاربر" className="RATE_CAR_IMAGE"/>
                        <h4 className="CarName-RATE">{statusOwner === 'renter' ?
                            company_name? company_name: ownerInfo.first_name+" "+ownerInfo.last_name
                        : renterInfo.first_name +""+renterInfo.last_name
                        }</h4>
                        <label style={{fontWeight: '100'}}>امتیاز به
                            {statusOwner === 'renter' ? ' اجاره‌دهنده ' : ' اجاره‌گیرنده '}
                        </label>
                        <Rating
                            maxRating={5}
                            defaultRating={star1}
                            icon='star'
                            size='huge'
                            onRate={settingStar1}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label style={{fontWeight: '100', textAlign: 'right'}}>:توضیح
                        {/* {statusOwner === 'renter' ? ' خودرو '  : ' اجاره‌گیرنده '} */}
                        </label>
                        <TextArea
                            placeholder='(با به اشتراک‌گذاری تجربه‌تان، به کاربران دیگر در انتخاب کمک می‌کنید.)'
                            value={text}
                            onChange={settingText}
                        />
                    </Form.Field>
                </Form>
            </div>, {
                buttons: {
                    cancel: "لغو",
                    catch: {
                        text: "ثبت امتیاز",
                        value: "done",
                    }
                },
            })
            .then((value) => {
                
                trigerDoAction(statusOwner,id,{localStar1,localStar2,localText});
            });
    }

    const trigerDoAction = async (value,id,localData) => {
        setLoader(true)

        // console.log("value,id,localData",value,id,localData)
        const {localStar1,localStar2,localText} = localData;
        setStar1(localStar1);
        setStar2(localStar2);
        setText(localText);
        // switch (value) {
        //     case "done":
                // try {
                    if(value !== "owner" )doAction({
                        id,
                        action: 'rate',
                        payload: {
                            toRate: statusOwner,
                            type: 'rent-order',
                            user_profile_id: userID,
                            rate: localStar2,
                            review: localText,
                        }
                    }).then(()=>{})
                    doAction({
                        id,
                        action: 'rate',
                        payload: {
                            type: 'user',
                            toRate: statusOwner,
                            user_profile_id: userID,
                            rate: localStar1,
                        }
                    }).then(()=>{})

                    // toast.success('نظر شما با موفقیت ثبت شد', {
                    //     position: "bottom-center",
                    //     autoClose: 5000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true
                    // });
                // }
                // catch(error) {
                //     toast.error("خطایی رخ داده است", {
                //         position: "bottom-center",
                //         autoClose: 5000,
                //         hideProgressBar: false,
                //         closeOnClick: true,
                //         pauseOnHover: true,
                //         draggable: true
                //     });
                // }
                setStar1(null);
                setStar2(null);
                setText(null);
        //         break;
        //     default:
        //         //console.log('canceled');
        // }
    }

    if(!canRate){
        if(statusOwner === "owner" && 
            (reviewStatus.has_owner_reviewed_rent_order || reviewStatus.has_owner_reviewed_renter)
        ) {
            setCanRate(true);
        }
        else if(statusOwner === "renter" && 
            (reviewStatus.has_renter_reviewed_owner || reviewStatus.has_renter_reviewed_rent_order)
        ) {
            setCanRate(true);
        }
    }
    

    let title;
    let actions;
    
    switch (status) {
        case 'new':
            statusOwner === "owner"
                ? title = <span><Icon name="calendar check" /> درخواست اجاره</span>
                : title = <span><Icon name="calendar check" />  درخواست اجاره (در انتظار تایید)</span>
            actions = <>
                {statusOwner === "owner" &&
                    <Grid.Row className="buttons">
                        <Grid.Column width={8}>
                            <div style={{ marginLeft: '8px' }}>
                                <Button
                                    onClick={() => doAction({ id, action: 'approve' })}
                                    // onClick= {()=>{
                                    //     setTimeout(() => {
                                            
                                    //     }, 10000);
                                    // }}
                                    primary
                                    fluid
                                    className="left ACCEPTED_INCOMMING_REQUEST">
                                    قبول
                            </Button>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div style={{ marginRight: '8px' }}>
                                <Button
                                    onClick={() => doAction({ id, action: 'reject' })}
                                    basic
                                    fluid
                                    className="right REJECT_INCOMMING_REQUEST">
                                    رد
                                </Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                }
            </>;
            break;
        case 'approved':
            title = <span><Icon name="credit card outline" /> در انتظار پرداخت</span>;
            actions = <>
                {statusOwner === "renter" &&
                    <Grid.Row className="buttons">
                        <Grid.Column width={16}>
                            <div style={{ marginLeft: '8px' }}>
                                <Button
                                    onClick={() => doAction({ id, action: 'pay' })}
                                    primary
                                    fluid
                                    className="left GO_TO_BANK">
                                    پرداخت
                                </Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                }
            </>;
            break;
        case 'rejected':
            title = <span><Icon name="calendar times" /> رد شد</span>;
            break;
        case 'cancelled':
            title = <span><Icon name="calendar times" /> لغو شد</span>;
            break;
        case 'paid':
            title = <span><Icon name="map marker alternate" /> در انتظار تحویل خودرو</span>;
            actions = <>
                {statusOwner === "renter" &&
                    <Grid.Row className="buttons">
                        <Grid.Column width={16}>
                            <div style={{ marginLeft: '8px' }}>
                                <Button
                                    primary
                                    fluid
                                    onClick={() => doAction({ id, action: 'deliver' })}
                                >
                                    خودرو را تحویل گرفتم
                                </Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                }
            </>
            break;
        case 'not_delivered':
            title = <span>
                <Icon.Group>
                    <Icon name='calendar times' />
                    <Icon corner='bottom right' name='car' />
                </Icon.Group> سفر به شکل دستی لغو شد </span>;
            break;
        case 'delivered':
            title = <span>
                <Icon.Group>
                    <Icon name='road' />
                    <Icon corner='bottom right' name='car' />
                </Icon.Group> در حال سفر</span>;
            actions = <>
                {statusOwner === "owner" &&
                    <Grid.Row className="buttons">
                        <Grid.Column width={16}>
                            <div style={{ marginLeft: '8px' }}>
                                <Button
                                    primary
                                    fluid
                                    onClick={() => doAction({ id, action: 'return' })}
                                >
                                    خودرو را بازتحویل گرفتم
                                </Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                }
            </>;
            break;
        case 'returned':
            title = <span><Icon name="flag checkered" /> پایان اجاره</span>;
            actions = <>
            {/* commented by sajad ====> */}
                {/* {canRate && */}
                    <Grid.Row className="buttons">
                        <Grid.Column width={16}>
                            <div style={{ marginLeft: '8px' }}>
                                <Button
                                loading={loader}
                                    primary
                                    fluid
                                    className="left WRITE_A_COMMENT"
                                    onClick={() => openRatingModal(id)}
                                >
                                    ثبت نظر
                                </Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
            {/* commented by sajad ====> */}
                {/* } */}
            </>;
            break;
        default:
    }

    return (
        <Card className="request_card">
            <Segment padded>
                <Label attached='top right' style={{boxShadow: '-1px 1px 2px 0px #cbcbcb'}}>{title}</Label>
                <Grid className="margintop8">
                    <Grid.Row columns={2} style={{ margin: '0 auto', marginTop: '8px', paddingBottom: 0 }}>
                        <Grid.Column width={11} style={{ 
                            paddingLeft: '24px',
                             paddingRight: '0',
                             height: "150px" }}
                             id="Text_wrapper">
                            <h3>{carName}</h3>
                            <DateGrid start={start} end={end} />
                            <Grid className="property-row">
                            <Grid.Row columns={2} centered className="property">
                                    <Grid.Column width={8} className="right">
                                    مدت زمان
                                </Grid.Column>
                                    <Grid.Column width={7} className="left">
                                        <div style={{ float: 'right', textAlign: 'right' }}>
                                            <strong style={{ fontSize: '14px' }}>
                                                {convertNumbers2Persian(no_of_days)}{" "}
                                                 روز 
                                            </strong>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2} centered className="property">
                                    <Grid.Column width={8} className="right">
                                        هزینه اجاره
                                </Grid.Column>
                                    <Grid.Column width={7} className="left">
                                        <div style={{ float: 'right', textAlign: 'right' }}>
                                            <strong style={{ fontSize: '14px' }}>
                                                {convertNumbers2Persian(numberWithCommas(price))}{' '}
                                                تومان
                                            </strong>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                        <Grid.Column width={5} className="img_wrapper" id="img_wrapper">
                            <img src={picture} alt={carName} />
                            <Pelak
                                first={pelak.first}
                                second={pelak.second}
                                third={pelak.third}
                                forth={pelak.fourth}
                                type={1}
                                size={"small"}
                                style={{}}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ margin: '0 auto' }}>
                        <Grid.Column>
                            <Grid className="property-row">
                                <Grid.Row columns={2} centered className="property DD">
                                    <Grid.Column width={10} className="right" style={{ paddingRight: '0' }}>
                                    {statusOwner === "owner" ?
                                    <Link route={(renterInfo.username ? `/@${renterInfo.username}` : `/user/${renterInfo.id}`)}>
                                        <strong style={{color: '#4ba3ce',cursor: 'pointer'}}><Icon name="user circle" /> {company_name? company_name:`${renterInfo.first_name +renterInfo.last_name}` } </strong>
                                        </Link>

:<Link route={(ownerInfo.username ? `/@${ownerInfo.username}` : `/user/${ownerInfo.id}`)}>
                                        <strong style={{color: '#4ba3ce',cursor: 'pointer'}}><Icon name="user circle" /> {company_name? company_name:ownerName} </strong>
                                        </Link>
}
                                    </Grid.Column>
                                    <Grid.Column width={6} className="left" style={{ padding: 0, }}>
                                        {statusOwner === "owner" &&
                                            <>
                                                {isMobile &&
                                                    <a href={`tel:${ownerPhone}`} className="maincolor">
                                                        تماس با  درخواست‌دهنده
                                                </a>
                                                }
                                                {isBrowser &&
                                                    <Button
                                                        basic
                                                        className="maincolor"
                                                        style={{ boxShadow: 'none' }}
                                                        onClick={() => openPhoneModal()}
                                                    >
                                                        تماس با  درخواست‌دهنده
                                                    </Button>
                                                }
                                            </>
                                        }
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid.Row>
                    {actions}
                </Grid>
            </Segment>
        </Card>
    )
};
