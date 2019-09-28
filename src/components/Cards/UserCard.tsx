import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Box, Flex } from "@rebass/grid";

import {Link} from '../../../routes'
import jsCookie from "js-cookie";
import { Icon, Input, Button, Grid} from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  REQUEST_setUserImage,
  REQUEST_setUsetNameLastName,
  REQUEST_setUsername
} from "../../API";
import {
  numberWithCommas,
  convertNumbers2Persian,
  convertNumbers2English
} from "../../utils/numbers";
import { Formik, FormikActions, withFormik } from "formik";
import { ITheme } from "../../theme/Interfaces";
import Router from 'next/router';



const Card = styled.figure`
padding: 0;
flex-direction: column !important;

padding-top: 16px;
  margin: 0 !important;
  img {
    height: 70px;
    width: 70px;
    border-radius: 999em;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.13);
  }
  @media (max-width: 768px) {
    /* width: 97vw;
    max-width: 400px; */
  }
  .profilePhotoWithRating-badge {
    position: relative;
    top: -20px;
    z-index: 1;
  }
  .hostDetailCard {
    top: 5px;
    position: relative;
    right: 5px;
    .name {
      line-height: 0;
      display: inline-block;
      font-size: 22px;
      color: #202020;
      font-weight: 700;
      margin-right: 4px;
      transform: translateY(-2px);
    }
    .hostDetailCard-responseTime {
      margin-top: 2px;
    }
  }
  .box {
      display: inline-block;
      vertical-align: middle;
    }
    .boxi {
      display: inline-block;
      width: 70%;
      vertical-align: middle;
    }
  .boxbox{
    width: 100%;
    text-align: center;
    margin-bottom: 6px;
    .icon{
      display: block;
      clear: both;
      width: 10px;
      height: 10px;
      position: absolute;
      bottom: 6px;
      right: 0;
    }
  }
  .G{
    margin-top: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .B{
      @media (max-width: 1200px) {
        font-size: 12px ;
    }
    padding: 6px 13px;
      background: #4BA3CE;
      color: #fff;
      border-radius: 5px;
      font-size: 14px ;
      
  }
  figure.usercard {
    padding: 0;
  }

  .ui.input.firstname,
  .ui.input.lastname {
    /* width: 50%; */
    font-size: 16px;
  }
  .name {
    color: ${({theme}:{theme:ITheme}) => theme.color.textMain};
  }
  .editform {
    width: 100%;
    img {
      height: 100px;
      width: 100px;
    }
    .img-fluid.edit{
      cursor: pointer;
      transition: 0.5s all;
      :hover {
        transform: scale(0.9);
      }
    }
    label {
      display: block;
      margin: 0 0 .28571429rem 0;
      color: rgba(0,0,0,.87);
      font-size: .92857143em;
      font-weight: 700;
      text-transform: none;
    }
    .box {
      margin: 0 auto;
      display: table;
    }
    input {
      &[name="firstname"],
      &[name="lastname"],
      &[name="username"] {
        font-family: Vazir;
        font-family: Vazir;
      }
      &[name="firstname"],
      &[name="lastname"] {
        text-align: right !important;
      }
      margin-bottom: 16px;
    }
    .ui.icon.input>i.icon:after, .ui.icon.input>i.icon:before {
      top: 38%;
      font-size: 20px;  
    }
    .media-body.hostDetailCard.box {
        width: 100%;
    }
  }
.C{display: inline-block;
  vertical-align: sub;
  padding-left: 5px;
  font-size: 17px;}
`;

export const UserCard: React.FunctionComponent<{
  t: any;
  id: any;
  firstname: string;
  lastname: string;
  username: string;
  responceTime: string;
  image: string;
  own?: boolean;
  onUpdate?: any;
  showexit?: boolean;
}> = ({
  t,
  firstname,
  lastname,
  username,
  responceTime,
  image,
  id,
  own = false,
  // onUpdate,
  showexit
}) => {
  let link;
  own ? 
    link = null 
  : 
    link = (username ? `/@${username}` : `/user/${id}`);
  const [editMode, setEditMode] = useState(false);
  const [makeUsername, setMakeUsername] = useState(false);
  const [img, setImg] = useState("");
  const inputFile = useRef(null) 
  const Cookieuser = jsCookie.get("first_name")
  const Cookielast = jsCookie.get("last_name")
  return (
    <Link route={link}>
    <a>
    <Card className="usercard" >
      {!editMode ? (
        <>
          <div className="media-body hostDetailCard box" 
          // style={{lineHeight: 5}}
          >
                <span className="name">
                  {firstname ? firstname :Cookieuser } {lastname ? lastname : Cookielast }
                </span>
                {own && (
                <span 
                onClick={() => {
                  setEditMode(true);
                  setImg(image)
                }}
                style={{
                  display: 'block',
                  fontSize: '16px',
                cursor: 'pointer'
                  
                }}>ویرایش مشخصات کاربری</span>
          )}
              {/* <div>5,150 trips<span className="hostDetailCard-dotSeparator"></span>
                  <span>Joined May 2016</span>
                </div> */}
              {/* <div className="hostDetailCard-responseTime">{responceTime}</div> */}
          </div>
          <div className="boxi" style={{width: "30%",textAlign: 'left'}}>
              <img src={image} className="img-fluid" alt="" />
          </div>
          <div className="G">
          {own && (
          <Link href="/add-car">
          <a className="B">
            افزودن خودرو 
            <span className="C">+ </span>
          </a>
        </Link>
          )}
          {showexit ? 
           <Icon
              name="sign out"
              size='large'
              style={{
                // position: 'absolute',
                // right: 32,
                // top: 16,
                width: 'auto',
                cursor: 'pointer'
              }}
              onClick={() => {
                jsCookie.remove("user_id")
                jsCookie.remove("token")
                jsCookie.remove("phone")
                jsCookie.remove("last_name")
                jsCookie.remove("first_name")
                localStorage.removeItem("ImageUrl")
                localStorage.removeItem("complete_register")
                window.location.href = process.env.SITE_URL;
                // window.location.href = "http://localhost:8080/";
                }
              }
                >
                <span style={{
                  fontSize: '14px',
                  verticalAlign: 'middle',
                  display: 'inline',
                  fontWeight: '100',
                  float: "left",
                  paddingRight:"8px",
                  paddingTop:"5px",
                  fontFamily: 'Vazir,sans-serif'
                }}>خروج از حساب</span>
                </Icon>
           :null}
           
          </div>
        </>
      ) : (
        <Formik
          initialValues={{
            firstname: firstname,
            lastname: lastname,
            id: id,
            image: null,
            shownImage: image,
            username: username
          }}
          onSubmit={async (values, actions) => {
            if (values.firstname && values.lastname)
              await REQUEST_setUsetNameLastName({
                token: jsCookie.get("token"),
                first_name: values.firstname,
                last_name: values.lastname
              });
            if (values.username)
              await REQUEST_setUsername({
                token: jsCookie.get("token"),
                username: values.username
              });
            if(values.image)
              await REQUEST_setUserImage({
                token: jsCookie.get('token'),
                file: values.image,
              });
            actions.setSubmitting(false);
            toast.success("تغیرات با موفقیت اعمال شد", {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
            });
            setEditMode(false);
            Router.push('/')
            // onUpdate({ id: id, username: values.username }); // call parent passed function so it will reload the page
          }}
          render={({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            values,
            errors,
            isSubmitting,
            setFieldValue
          }) => (
            <form onSubmit={handleSubmit} className="editform">
              {errors.firstname && touched.firstname && (
                <div id="feedback">{errors.firstname}</div>
              )}
              <div className="box boxbox" style={{position:'relative'}}>
                {/* <Icon
                className="icon"
              name="edit"
              size='large'
              
            /> */}
                <img
                  // src={values.shownImage}
                  src={img}
                  className="img-fluid edit"
                  alt="ویرایش نمایه"
                  // onClick={() => inputFile.current.click()}
                />
            <p style={{marginTop:"10px"}}>تغییر تصویر کاربری</p>

                <input
                className ="inputFile"
                  style={{
                    position:'absolute',
    display:'block',
    right:'0',
    bottom:'0px',
    height:'90px',
    opacity:'0',
    margin:0
                  }}
                  type='file'
                  id='file'
                  ref={inputFile}
                  // style={{display: 'none'}}
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    // console.log(e.target.files[0])
                    const types = ['image/png', 'image/jpeg', 'image/png'];
                    if (types.every(type => file.type !== type)) {
                      alert('لطفاً تصویر را با فرمت jpeg بارگذاری کنید.')
                      return false;
                    }
                    setFieldValue('image', file);
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    setImg(URL.createObjectURL(file))
                    // console.log(reader.result)
                    // setFieldValue('shownImage', reader.result);
                    reader.onload = (e) => {
                      console.log('file reading was susceed', e);
                    };
                    return 
                      // #2 Catching wrong file types on the client
                    reader.onabort = () =>{}
                      //console.log('file reading was aborted');
                    reader.onerror = () =>{}
                      //console.log('file reading has failed');
                    // reader.readAsDataURL(event.target.files[0]);
                  }}
                />
              </div>
              <div
                className="media-body hostDetailCard box"
              >
                 <label>{'نام'}</label>
                <Input
                  type="text"
                  className="firstname"
                  placeholder="نام"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstname}
                  name="firstname"
                />
                 <label>{'نام خانوادگی'}</label>
                <Input
                  type="text"
                  className="lastname"
                  placeholder="نام خانوادگی"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                  name="lastname"
                />
                {/* <div>5,150 trips<span className="hostDetailCard-dotSeparator"></span>
                      <span>Joined May 2016</span>
                    </div> */}
                <div className="hostDetailCard-responseTime">
                  {values.responceTime}
                </div>
                {username || makeUsername ?
                  <>
                    <label>{'نام کاربری'}</label>
                    <Input
                      iconPosition="left"
                      placeholder="نام کاربری"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    >
                      <Icon name="at" />
                      <input />
                    </Input>
                  </>
                  : 
                  <span
                    onClick={() => setMakeUsername(true)}
                  >
                    ایجاد لینک اختصاصی
                  </span>
                }
                
              </div>
              <Grid.Row className="buttons" style={{width: `100%`,margin: '0 auto'}}>
                  <Grid.Column width={8} style={{width:`48%`,marginLeft:`2%`}}>
                      <Button
                        style={{ height: "48px", marginTop: "16px" }}
                        size="small"
                        fluid
                        color="teal"
                        type="submit"
                        loading={isSubmitting}
                      >
                        {"ذخیره تغیرات"}
                      </Button>
                  </Grid.Column>
                  <Grid.Column width={8} style={{width:`48%`,marginRight:`2%`}}>
                      <Button
                        style={{ height: "48px", marginTop: "16px" }}
                        size="small"
                        basic
                        fluid
                        color="teal"
                        onClick={() => {
                          setEditMode(false);
                        }}
                      >
                        {"لغو"}
                    </Button>
                  </Grid.Column>
              </Grid.Row>
            </form>
          )}
        />
      )}
    </Card>
    </a>
    </Link>
  );
};
