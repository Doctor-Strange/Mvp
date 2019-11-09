import { createGlobalStyle } from "styled-components";
import { ITheme } from "./Interfaces";

const GlobalStyle = createGlobalStyle`
@font-face {
	font-family: IRANSans;
	font-style: normal;
	font-weight: 500;
	src: url('./static/fonts/irans/IRANSansWeb(FaNum)_Medium.eot');
	src: url('./static/fonts/irans/IRANSansWeb(FaNum)_Medium.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
		 url('./static/fonts/irans/IRANSansWeb(FaNum)_Medium.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
		 url('./static/fonts/irans/IRANSansWeb(FaNum)_Medium.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
		 url('./static/fonts/irans/IRANSansWeb(FaNum)_Medium.ttf') format('truetype');
}
  @font-face {
    font-family: Vazir;
    src: url('https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir.eot');
    src: url('https://otoli.net/static/fonts/Vazir.eot?#iefix') format('embedded-opentype'),
        // url('https://otoli.net/static/fonts/Vazir.woff2') format('woff2'),
        url('https://otoli.net/static/fonts/Vazir.woff') format('woff'),
        url('https://otoli.net/static/fonts/Vazir.ttf') format('truetype');
    font-weight: normal;
    font-display: swap
  }

  @font-face {
    font-family: Vazir;
    src: url('https://otoli.net/static/fonts/Vazir-Bold.eot');
    src: url('https://otoli.net/static/fonts/Vazir-Bold.eot?#iefix') format('embedded-opentype'),
        // url('https://otoli.net/static/fonts/Vazir-Bold.woff2') format('woff2'),
        url('https://otoli.net/static/fonts/Vazir-Bold.woff') format('woff'),
        url('https://otoli.net/static/fonts/Vazir-Bold.ttf') format('truetype');
    font-weight: bold;
    font-display: swap
  }

  @font-face {
    font-family: Vazir;
    src: url('https://otoli.net/static/fonts/Vazir-Light.eot');
    src: url('https://otoli.net/static/fonts/Vazir-Light.eot?#iefix') format('embedded-opentype'),
        // url('https://otoli.net/static/fonts/Vazir-Light.woff2') format('woff2'),
        url('https://otoli.net/static/fonts/Vazir-Light.woff') format('woff'),
        url('https://otoli.net/static/fonts/Vazir-Light.ttf') format('truetype');
    font-weight: 300;
    font-display: swap
  }

  @font-face {
    font-family: Vazir;
    src: url('https://otoli.net/static/fonts/Vazir-Medium.eot');
    src: url('https://otoli.net/static/fonts/Vazir-Medium.eot?#iefix') format('embedded-opentype'),
        // url('https://otoli.net/static/fonts/Vazir-Medium.woff2') format('woff2'),
        url('https://otoli.net/static/fonts/Vazir-Medium.woff') format('woff'),
        url('https://otoli.net/static/fonts/Vazir-Medium.ttf') format('truetype');
    font-weight: 500;
    font-display: swap
  }

  // @font-face {
  //   font-family: Vazir;
  //   src: url('https://otoli.net/static/fonts/Vazir-Thin.eot');
  //   src: url('https://otoli.net/static/fonts/Vazir-Thin.eot?#iefix') format('embedded-opentype'),
  //       // url('https://otoli.net/static/fonts/Vazir-Thin.woff2') format('woff2'),
  //       url('https://otoli.net/static/fonts/Vazir-Thin.woff') format('woff'),
  //       url('https://otoli.net/static/fonts/Vazir-Thin.ttf') format('truetype');
  //   font-weight: 100;
  //   font-display: swap
  // }

  // @font-face {
  //   font-family: Vazir;
  //   src: url('https://otoli.net/static/fonts/Vazir-Black.eot');
  //   src: url('https://otoli.net/static/fonts/Vazir-Black.eot?#iefix') format('embedded-opentype'),
  //       // url('https://otoli.net/static/fonts/Vazir-Black.woff2') format('woff2'),
  //       url('https://otoli.net/static/fonts/Vazir-Black.woff') format('woff'),
  //       url('https://otoli.net/static/fonts/Vazir-Black.ttf') format('truetype');
  //   font-weight: 900;
  //   font-display: swap
  // }

  @import url('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700');

  *, ::after, ::before {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    background: ${({ theme }: { theme: ITheme }) =>
      theme.color.lightBackground};
    font-size: 1rem;
    line-height: ${({ theme }: { theme: ITheme }) => theme.spacing.lineHeight};
    font-family: ${({ theme }: { theme: ITheme }) => theme.direction.font};
    color: ${({ theme }: { theme: ITheme }) => theme.color.textMain};
    font-weight: ${({ theme }: { theme: ITheme }) =>
      theme.spacing.fontWeightNormal};
    text-align: left;
    display: block;
    padding: 0;
    margin: 0;
  }
  a {
    color: ${({ theme }: { theme: ITheme }) => theme.color.mainForeground};
    text-decoration: none;
    outline: none;
  }
  ul, ol {
    list-style: none;
    margin: 0 0 25px 0;
    padding: 0;
  }
  img {
      vertical-align: middle;
      border-style: none;
  }

  .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    color: ${(props: { theme: ITheme }) => props.theme.color.textMain};
    margin-bottom: .5rem;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.2;
  }
  .box_account .activefield{
    border:1px solid #4ba3ce !important;
    border-bottom: 2px solid #4ba3ce !important;
  }
  .Calendar {
    margin-top: 7px;
  }
  .DOOOOOD .Calendar {
    margin-top: 31px;
  }
  @media (max-width:768px){
    .responsiveFeildcontrol div{
      padding:0 !important;
    }
    .responsiveFeildcontrol .ui.button:not(.circular).full-width{
      margin:0;
    }
    .responsiveFeildcontrol div:nth-of-type(2){
      width: 50%;
    }
    .responsiveFeildcontrol div:nth-of-type(2) input{
      border-left:0 !important;
      border-top-left-radius:0px !important;
      border-bottom-left-radius:0px !important;
    }
    .responsiveFeildcontrol div:nth-of-type(3){
      width: 50%;
    }
    .responsiveFeildcontrol div:nth-of-type(3) input{
      border-top-right-radius:0px !important;
      border-bottom-right-radius:0px !important;
    }
  }
  #alertShow{
    position: fixed;
     display:none;
    z-index: 900;
    top: 100px;
    left: 0;
    right: 0;
    margin: auto;
    color: #161616;
    border-radius: 4px;
    padding: 10px 40px;
    background: #fff;
    width: 280px;
    text-shadow: none;
    @media (max-width:768px){
      display:block
    }
  }
  .heightControl{
    height:90vh
    @media (max-width:768px){
      height:105vh
    }
    @media (max-width:480px){
      height:74vh
    }
  }
  .WHITE{
    background : #fff;
  }
  .insurance{
    background:#fff;
    position:relative;
    padding-top: 6em;
    padding-bottom:50px;

  }
  .insurance h2{
    margin-bottom:20px;
  }
  .insuranceBox{
    left:0;
    right:0;
    position:absolute;
    width: 220px;
    border-radius: 41px;
    background: #fff;
    text-align: center;
    border-bottom-left-radius: 0;
    font-size: 12px;
    border-bottom-right-radius: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    margin: auto;
    top: -42px;
  }
  .whyOtoli{
    padding-top:70px;
  }
  .whyOtoli h2{
    margin-bottom:20px;
    text-align: center;
  }
  .WhyOtolicontainer{
    display:flex;
    justify-content:center;
    align-items:start;
    direction: rtl; 
  }


  .WhyOtolibox{
    width: 30%;
    margin: 2%;
    text-align: justify;
  }
  .addCarnow{
    background:#fff;
    padding-bottom:50px;
    margin-bottom:20px;
    margin-top: 50px;
  }
  .addCarnow a {
    display: block;
    width:220px;
    margin:auto;
    text-align:center;
    background: #A3678B none;
    padding: .78571429em 1.5em .78571429em;
    color:#fff;
    min-height: 1em;
    outline: 0;
    border: none;
    border-radius: .28571429rem;
    text-shadow: none;
    font-weight: 700;
    line-height: 1em;
  }
  .addCarnow a:hover{
    background-color: #bf669c;
  }
  @media (max-width:767px){
    .WhyOtolicontainer{
      flex-direction: column;
    }
    .WhyOtolibox{
      width: 100%;
    margin-bottom: 10px;
  }
}
@media (max-width:580px){
  .WhyOtolibox{
    margin-bottom: 20px;
    margin-right: 0;
    // text-align: center;
  }
}
  /**============================== Bootstrap Styles ==============================**/
  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    @media (min-width: 576px){
      max-width: 540px;
    }
    @media (min-width: 768px){
      max-width: 720px;
    }
    @media (min-width: 992px){
      max-width: 960px;
    }
     @media (min-width: 1200px){
      max-width: 1140px;
    }
  }
  .container_on_desktop{
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    @media (min-width: 992px){
      max-width: 960px;
      padding-right: 15px;
      padding-left: 15px;
    }
     @media (min-width: 1200px){
      max-width: 1140px;
      padding-right: 15px;
      padding-left: 15px;
    }
  }

  @media (min-width: 768px){
    .justInMobile {
      display: none;
    }
  }
  @media (max-width: 992px){
    .profile_page,#checkout{
      flex-direction: column-reverse;
    }
    .hero_single .wrapper {
      flex-direction: unset !important;
    }
  }
  
  .row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }

  .container {
    @media (min-width: 576px){
      .carcard{
      }
    }
    @media (min-width: 768px){
      .carcard{
      }
    }
    @media (min-width: 992px){
      .carcard{
        width: 300px;
      }
    }
      @media (min-width: 1200px){
      .carcard{
        width: 375px;
      }
    }
  }

  /** col **/
  .col,.col-10,.col-12,.col-2,.col-3,.col-4,.col-6,.col-8,.col-9,
  .col-lg-1,.col-lg-10,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,
  .col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-8,.col-sm-6,.col-xl-4,.col-xl-5,.col-xl-6,
  .col-xl-7{
    position:relative;
    width:100%;
    min-height:1px;
    padding-right:15px;
    padding-left:15px
  }
  .col{
      flex-basis:0;
      flex-grow:1;
      max-width:100%
  }
  .col-2{
      flex:0 0 16.666667%;
      max-width:16.666667%
  }
  .col-3{
      flex:0 0 25%;
      max-width:25%
  }
  .col-4{
      flex:0 0 33.333333%;
      max-width:33.333333%
  }
  .col-6{
      flex:0 0 50%;
      max-width:50%
  }
  .col-8{
      flex:0 0 66.666667%;
      max-width:66.666667%
  }
  .col-9{
      flex:0 0 75%;
      max-width:75%
  }
  .col-10{
      flex:0 0 83.333333%;
      max-width:83.333333%
  }
  .col-12{
      flex:0 0 100%;
      max-width:100%
  }
  .order-last{
      order:13
  }
  @media (min-width:1200px){
      .col-xl-4{
          flex:0 0 33.333333%;
          max-width:33.333333%
      }
      .col-xl-5{
          flex:0 0 41.666667%;
          max-width:41.666667%
      }
      .col-xl-6{
          flex:0 0 50%;
          max-width:50%
      }
      .col-xl-7{
          flex:0 0 58.333333%;
          max-width:58.333333%
      }
  }
  @media (min-width:992px){
      .col-lg-1{
          flex:0 0 8.333333%;
          max-width:8.333333%
      }
      .col-lg-2{
          flex:0 0 16.666667%;
          max-width:16.666667%
      }
      .col-lg-3{
          flex:0 0 25%;
          max-width:25%
      }
      .col-lg-4{
          flex:0 0 33.333333%;
          max-width:33.333333%
      }
      .col-lg-5{
          flex:0 0 41.666667%;
          max-width:41.666667%
      }
      .col-lg-6{
          flex:0 0 50%;
          max-width:50%
      }
      .col-lg-7{
          flex:0 0 58.333333%;
          max-width:58.333333%
      }
      .col-lg-8{
          flex:0 0 66.666667%;
          max-width:66.666667%
      }
      .col-lg-9{
          flex:0 0 75%;
          max-width:75%
      }
      .col-lg-10{
          flex:0 0 83.333333%;
          max-width:83.333333%
      }
      .col-lg-12{
          flex:0 0 100%;
          max-width:100%
      }
  }
  @media (min-width:768px){
      .col-md-2{
          flex:0 0 16.666667%;
          max-width:16.666667%
      }
      .col-md-3{
          flex:0 0 25%;
          max-width:25%
      }
      .col-md-4{
          flex:0 0 33.333333%;
          max-width:33.333333%
      }
      .col-md-5{
          flex:0 0 41.666667%;
          max-width:41.666667%
      }
      .col-md-6{
          flex:0 0 50%;
          max-width:50%
      }
      .col-md-8{
          flex:0 0 66.666667%;
          max-width:66.666667%
      }
      .col-md-12{
          flex:0 0 100%;
          max-width:100%
      }
      .order-md-last{
          order:13
      }
  }
  @media (min-width:576px){
      .col-sm-6{
          flex:0 0 50%;
          max-width:50%
      }
      .order-sm-last{
          order:13
      }
  }

  .mt-1 {
    margin-top: .25rem!important;
  }
  .pt-2{
    padding-top:.5rem!important
  }
  .float-right {
      float: right!important;
  }
  .float-left {
      float: left!important;
  }
  .justify-content-center {
    justify-content: center!important;
  }
  .h1, h1 {
    font-size: 2.5rem;
  }
  .form-control {
    display: block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  
  .text-center {
      text-align: center!important;
  }
  .small, small {
    font-size: 80%;
    font-weight: 400;
  }
  hr {
    margin: 30px 0 30px 0;
    border-color: #ddd;
    box-sizing: content-box;
    height: 0;
    overflow: visible;
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
  }

/*============================== Modal Styles ==============================*/
  .md-overlay{
    text-align: center;
    position: fixed;
    visibility: visible;
    background: hsla(0, 0%, 0%, 0.0);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: 0 18px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 99999999999;
    transition: all .3s;
    &.md-show {
      background: hsla(0, 0%, 0%, 0.8);
    }
  }
    /*============================== btn Styles ==============================*/
  .ui.button:not(.circular) {
    font-family: ${(props: { theme: ITheme }) => props.theme.direction.font};
    border: none;
    background:${(props: { theme: ITheme }) =>
      props.theme.color.mainForeground};
    outline: none;
    cursor: pointer;
    color: ${(props: { theme: ITheme }) => props.theme.color.whiteBackground};
    font-weight: ${(props: { theme: ITheme }) =>
      props.theme.spacing.fontWeightBold};
    transition: all 0.3s ease-in-out;
    border-radius: ${(props: { theme: ITheme }) =>
      props.theme.spacing.smallBorderRadus};
    :hover {
      background-color: ${(props: { theme: ITheme }) =>
        props.theme.color.secondForeground};
    }
    &.full-width {
      display: block;
      width: 100%;
      text-align: center;
      height: ${(props: { theme: ITheme }) =>
        props.theme.spacing.massivePadding};
    }
  }

  /**============================== 3.4 Spacing ==============================*/

  .add_top_8 {
    margin-top: 8px;
  }


  .margin_16 {
    padding-top: 16px;
  }

  .margin_30 {
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .margin_30_5 {
    padding-top: 30px;
    padding-bottom: 5px;
  }

  @media (max-width: 991px) {
    .hidden_tablet {
      display: none !important;
    }
  }

  @media (max-width: 767px) {
    .hidden_mobile {
      display: none !important;
    }
  }

  @media (max-width: 767px){
      .paddingInMobile {
        padding-top: 16px;
        padding-bottom: 16px;
      }
      .wrapper {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column !important;
        .indexFullOnMobile{
          width:100%;
          margin: 0 auto;
          margin-bottom:10px;
        }
      }
  }

  @media (max-width: 991px) {
    .hide_on_mobile {
        display: none !important;
    }
  }
  @media (min-width: 991px) {
    .hide_on_desktop {
        display: none !important;
    }
  }

  .react-phone-number-input__country-select{
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    width: 70px;
  }
  /**============================== Styles based on semantic UI==============================*/

  .sidebar.menu {
      min-height: 100vh;
  }

  .ui.form input:not([type]), .ui.form input[type=date], .ui.form input[type=datetime-local],
  .ui.form input[type=email], .ui.form input[type=file], .ui.form input[type=number],
  .ui.form input[type=password], .ui.form input[type=search], .ui.form input[type=tel],
  .ui.form input[type=text], .ui.form input[type=time], .ui.form input[type=url] {
    font-family: Vazir !important;
  }

  .button {
    margin: 0 0 0 0;
  }
  .input {
    display: block;
    width: 100%;
    input{
      height: 48px;
      width: 100%;
    }
  }
  .segment {
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding: 25px;
    position: relative;
    .form-group {
      margin-bottom: 10px;
    }
    hr {
      margin: 0 0 10px 0;
    }
  }
  form {
    .dropdown {
      &.icon {
        top: 1.4em !important;
      }
      .text {
        line-height: 24px;
      }
    }
  }

  input[inputmode="numeric"],  div[inputMode='numeric'] input {
      direction: ltr !important;
      text-align: left;
  }
  .field {
    margin-bottom:18px !important;
  }
  .fields:not(.inline) { 
    margin-bottom:0px !important;
    .field {
      width: 100%;
      margin-bottom:18px !important;
    }
  }
  .fields.inline, *[inputmode='numeric'] { 
      margin-bottom:18px !important;
  }
  &.no_margin{
    margin-bottom:0px !important;
  }
  .rtl {
    text-align:right;

    .column.row.property {
      direction:rtl;
    }
    .carcard {
      text-align:right;
      direction:rtl;
    }
    .message {
      text-align: right;
    }
    h3.new_client {
      background-position: right !important;
    }
    .attached.label {
      text-align: right;
    }
    .icon.message {
      direction: rtl;
      text-align: right;
      .icon{
        margin: 0 0 0 .6em;
        margin-right: 0 !important;
      }
    }    
      form {
        direction:rtl;
        .field {
          label {
            direction: rtl;
            text-align: right;
          }
          &:not(.ltr) {
            text-align: right;
            .dropdown {
              text-align:right;
              &.icon {
                left: 1em;
                right: unset !important;
              }
              .menu>.item {
                text-align: right;
              }
              &.colorpicker{
                &.icon {
                left: 0em !important;
                }
              }
            }
          }
        }
        input{
          height: 48px;
          ::placeholder {
            text-align: right;
            direction: rtl;
            font-family: Vazir !important;
          }
          &[name="firstName"] {
              text-align: right;
          }
          &[name="lastName"]{
            text-align: right;
          }
        }
        .checkbox .box, .checkbox label {
            :before,:after {
          right: 0 !important;
        }
        }
        .checkbox label {
            padding-right: 1.85714em;
            padding-left: unset !important;
          }
      }
    .sign-in-wrapper {
      direction: rtl;
      text-align: right;
    }
    .ui.items>.item>.image+.content {
      padding-right: 1.5em;
      padding-left: 0;
      margin-right: 0;
      direction:rtl;
      text-align:right;
    }
    .ui.header {
      margin-left: 0.75rem;
      .icon:only-child {
        margin-left: .25rem;
      }
    }
    .ui.labeled.input:not([class*="corner labeled"]) .label:first-child+input {
      width: 87% !important;
    }
    .ui.input {
      flex-direction: row-reverse;
    }
    

  }
  /** end of RTL **/
  input {
    &#field_input_phone,&#field_input_code,&[name="nationalid"] {
      text-align: left;
      direction: ltr;
      ::placeholder {
        text-align: right;
        direction: rtl;
        font-family: Vazir;
      }
    }
  }
  .ui.loading.form {
    :before {
    content: none;
    }
    :after {
    content: none;
    }
  }
  .sui-error-message {
    display: block;
    text-align:initial;
    color: #e81123;
    font-size: 13px;
    font-weight: 300;
    margin-top: 8px;
    &.sui-padd{
      margin-top: -10px;
      margin-bottom: 10px;
    }
  }
  .notShowErrors .sui-error-message {
    display: none;
  }
  .ui.form .field.error input[type=tell]{
    background: #fff6f6;
    border-color: #e0b4b4;
    color: #9f3a38;
    border-radius: '';
    box-shadow: none;
  }
  .ui .segment {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 30px 0px;
    padding: 25px;
  }

  /**============================== Forms Style ==============================**/
  input{
      width: 100% !important;
  }
  .visible.menu {
      height: 50vh !important;
      /* max-height: 250px !important; */
      max-height: fit-content !important;
  }
  #kmdriven {
    direction: ltr;
    .visible.menu {
      max-height: fit-content !important;
      text-align: left;
      direction: ltr;
    }
  }
  .form-control {
      font-size: 14px;
      font-size: 14px;
      border-radius: 3px;
      border: 1px solid #d2d8dd;
  }

  /* Checkbox style */
  .container_check {
    display: block;
    position: relative;
    font-size: 14px;
    font-size: 14px;
    padding-right: 25px;
    line-height: 1.4;
    margin-bottom: 10px;
    text-align: right;
    cursor: pointer;
    user-select: none;
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }
    input:checked ~ .checkmark {
      background-color: ${({ theme }: { theme: ITheme }) =>
        theme.color.mainForeground};
      border: 1px solid transparent;
    }
    .checkmark {
      position: absolute;
      top: 0;
      right: 0;
      height: 20px;
      width: 20px;
      border: 1px solid #d2d8dd;
      border-radius: 3px;
      transition: all 0.3s ease-in-out;
      :after {
        content: "";
        position: absolute;
        display: none;
        left: 7px;
        top: 3px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
    input:checked ~ .checkmark:after {
      display: block;
    }
  }

  /* Radio buttons */
  .container_radio {
    display: block;
    position: relative;
    font-size: 15px;
    font-size: 0.9375rem;
    padding-right: 30px;
    line-height: 1.3;
    margin-bottom: 10px;
    cursor: pointer;
    user-select: none;
    input {
      position: absolute;
      opacity: 0;
    }
    input:checked ~ .checkmark:after {
      opacity: 1;
    }
    .checkmark {
      position: absolute;
      top: 0;
      right: 0;
      height: 20px;
      width: 20px;
      border: 1px solid #ccc;
      border-radius: 50%;
      :after {
        display: block;
        content: "";
        position: absolute;
        opacity: 0;
        transition: all 0.3s ease-in-out;
        top: 3px;
        left: 3px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: ${({ theme }: { theme: ITheme }) =>
          theme.color.mainForeground};
        transition: all 0.3s ease-in-out;
      }
    }
  }

  input[type='number'] {
    -moz-appearance: textfield;/*For FireFox*/
    direction:ltr !important;
    text-align:left !important;

    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
      /*For Webkits like Chrome and Safari*/
      -webkit-appearance: none;
      margin: 0;
    }
  }

  input[type="email"] {
      text-align: left;
      direction: ltr;
  }

  .colorpicker {
    &.dropdown.icon{
      top: 0 !important;
    }
    background: #fff !important;
    border: 1px solid rgba(34,36,38,.15) !important;

    &.visible{
      .menu {
          width: 222px !important;
          display: flex !important;
          flex-direction: row-reverse;
          flex-wrap: wrap;
          align-content: flex-start;
          align-items: flex-start;
          >.item {
            border-top: none;
            display: inline-block;
            width: auto;
            padding: 5px 0px 0px 13px;
          }
        .circular.label {
          width: 2.5em;
          height: 2.5em;
          border: solid 2px;
        }
      }
    }
  }

  .item[color~="#FFFFFF"],.colorFFFFFF {
    .label, i {
      background-color: #FFFFFF !important;
    }
  }
  .item[color~="#000000"], .color000000 {
    .label, i{
      background-color: #000000 !important;
      color: white;
    }
  }
  .item[color~="#C0C0C0"], .colorC0C0C0 {
    .label, i{
      background-color: #C0C0C0 !important;
    }
  }
  .item[color~="#808080"], .color808080{
    .label, i{
      background-color: #808080 !important;
    }
  }
  .item[color~="#FF0000"], .colorFF0000{
    .label, i{
      background-color: #FF0000 !important;
      color: white;
    }
  }
  .item[color~="#0000FF"], .color0000FF {
    .label, i{
      background-color: #0000FF !important;
      color: white;
    }
  }
  .item[color~="#CD853F"], .colorCD853F  {
    .label, i {
      background-color: #CD853F !important;
    }
  }
  .item[color~="#008000"], .color008000  {
    .label, i{ 
      background-color: #008000 !important;
      color: white;
    }
  }
  .item[color~="#FFFF00"], .colorFFFF00  {
    .label, i {
      background-color: #FFFF00 !important;
    }
  }

  .error input {
      background: #fff6f6 !important;
      border-color: #e0b4b4 !important;
      color: #9f3a38 !important;
  }


  .form .disabled.field, .ui.form .disabled.fields .field, .ui.form .field :disabled {
    opacity: 1 !important;
  }

  .form .field>.selection.dropdown {
    min-height: 48px;
  }


input[type="color"],
input[type="date"],
input[type="datetime"],
input[type="datetime-local"],
input[type="email"],
input[type="month"],
input[type="number"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="text"],
input[type="time"],
input[type="url"],
input[type="week"],
select:focus,
textarea {
  /* font-size: 16px !important; */
}

textarea {
  direction:rtl;
}

  /**============================== Colors of semantic UI==============================*/

  /** focus colors **/
  .ui.checkbox input:checked~.box:after, .ui.checkbox input:checked~label:after,
  .ui.checkbox input:focus~.box:after, .ui.checkbox input:focus~label:after  {
      color: rgb(51, 172, 193) !important;
      background: rgba(51, 172, 193, 0.05) !important;
      border-color: rgb(51, 172, 193) !important;
  }

  .ui.radio.checkbox input:checked~.box:after, .ui.radio.checkbox input:checked~label:after {
      background-color: rgb(51,172,193) !important;
  }

  .ui.checkbox input:focus~.box:before, .ui.checkbox input:focus~label:before {
      background: rgba(51, 172, 193, 0.05);
  }

  .ui.dropdown .menu>.item:hover, .ui.dropdown .menu>.item:focus {
      background: rgba(51, 172, 193, 0.05);
  }

  .ui.dropdown .menu .selected.item, .ui.dropdown.selected {
    background: rgba(51, 172, 193, 0.05);
  }
  .ui.input input:focus {
    background: rgba(51, 172, 193, 0.05) !important;
  }

  /** end of focus colors **/
  .ui{
    .basic.button, .basic.buttons .button {
      box-shadow: 0 0 0 1px ${({ theme }: { theme: ITheme }) =>
        theme.color.mainForeground} inset;
      color: ${({ theme }: { theme: ITheme }) =>
        theme.color.mainForeground} !important;
    }
    .primary{
      &.button{
        background-color: ${({ theme }: { theme: ITheme }) =>
          theme.color.mainForeground};
        :hover{
          background-color: ${({ theme }: { theme: ITheme }) =>
            theme.color.secondForeground};
          color: #fff !important;
        }
        :focus{
          background-color: ${({ theme }: { theme: ITheme }) =>
            theme.color.secondForeground};
        }
      }
    }
  }

/**============================== Date Picker ==============================*/
.DatePicker__calendarContainer {
  opacity: 1;
  z-index:99;
}

.DatePicker__calendarContainer.fadein {
  opacity: 0;
  animation: fadeIn 0.1s ease-in;
  transition: all 0.1s ease-in;
}

.DatePicker__calendarContainer.fadeout {
  opacity: 0;
  animation: fadeOut 0.4s ease-in;
  transition: all 0.4s ease-in;
  transform: translateX(-50%);
}

.DatePicker__calendarContainer {
  top: calc(94% + -2em);
  transition: all .5s;
  transform: translateX(-50%);
}
.Calendar {
    /* box-shadow: 0 1em 4em 3px rgba(0, 0, 0, 0.38); */
}
.Calendar::after {
  display:none !important;
  border-color:transparent transparent transparent transparent;
}
@media (max-width: 767px) {
  .DatePicker__calendarContainer{
    position: fixed;
    top: 0;
    left: 0;
    transform: none !important;
    height: 100vh;
    width: 100vw;
    background: #0000005e;
    .Calendar{
      margin: 0 auto;
      transform: translateY(50%);
    }
  }
}


  /**============================== Other ==============================*/
  ul.slider-list {
    max-height: 550px;
  }

  @media (max-width: 768px){
    .slider-control-centerleft,.slider-control-centerright {
        display: none;
    }
    .carcards_section{
      padding-right: 0px !important;
      padding-left: 0px !important;
    }
    .carcard {
      width: 97vw !important;
      max-width: 400px !important;
    }
  }

  .hero_single {
    direction: rtl;
    width: 100%;
    position: relative;
    text-align: center;
    margin: 15px auto;
    .wrapper {
      flex-direction: column;
      justify-content: center;
      height: 100%;
      h1 {
        font-size: 52px;
        color: #fff;
        font-size: 3.25rem;
        margin: 0;
        text-transform: uppercase;
        font-weight: 700;
        @media (max-width: 767px) {
          font-size: 21px;
          font-size: 1.3125rem;
        }
        @media (max-width: 575px) {
            font-size: 23px;
            font-size: 1.4375rem;
        }
      }
      h2 {
        font-weight: 300;
        margin: 10px 0 0 0;
        padding: 0 20%;
        font-size: 24px;
        color: #fff;
        margin-bottom: 26px;
        font-size: 1.5rem;
        line-height: 1.4;
        @media (max-width: 767px) {
          padding: 0;
          font-size: 18px;
          font-size: 1.125rem;
        }
        strong {
          font-weight: 600;
        }
      }
    }
    &.short {
      height: 600px;
    }
    &.version_4 {
      height: 450px;
      .wrapper {
        h3 {
          font-size: 42px;
          font-size: 2.625rem;
          color:White;
          text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
          @media (max-width: 767px) {
            font-size: 26px;
            font-size: 1.625rem;
            margin-top: 30px;
          }
          @media (max-width: 575px) {
            font-size: 22px;
            font-size: 1.375rem;
          }
        }
        p {
          color: white;
          font-weight: 400;
          margin: 5px 0 20px 0;
          padding: 0;
          font-size: 21px;
          font-size: 1.3125rem;
          text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3);
          @media (max-width: 767px) {
            padding: 0;
            font-size: 14px;
            font-size: 14px;
          }
          strong {
            font-weight: 600;
          } 
        }
        input[type='submit'] {
          color: #222;
          background-color: #FFC107;
          @media (max-width: 991px) {
            margin: 20px 0 0 0;
            border-radius: 3px;
          }
          &:hover {
            background-color: #32a067;
            color: #fff;
          }
        }
      }
    }
  }
  div#filters{
    min-height: 0px;
    height: 0px;
    transition: all .3s;
    overflow: initial;
  }
  div#filters.in {
    min-height: 190px;
    height: auto;
    transition: all .3s;
    overflow: hidden;
  }
  div#filters.visible{
    min-height: 190px;
    height: auto;
    transition: all 1s;
  }
  div#filters.out {
    min-height: 0px;
    height: 0px !important;
    transition: all .3s;
    overflow: hidden;
  }
  div#filters.hidden {
    min-height: 0px;
    height: 0px;
    visibility: hidden;
    overflow: hidden;
  }

  #filters_col {
    margin-top: 10px;
    box-shadow: 1px -1px 11px 3px #0000000f;
    width: 260px;
    background-color: #fff;
    padding: 20px 20px 15px 20px;
    margin-bottom: 25px;
    border: 1px solid #ededed;
    label {
      color: #333;
      font-weight: normal;
    }
  }
  a#filters_col_bt {
    display: block;
    color: #333;
    position: relative;
    font-size: 16px;
    font-size: 1rem;
    font-weight: 600;
    direction: rtl;
    text-align: start;
  }


  label.dv-star-rating-star {
      float: left !important;
  }
  .dv-star-rating {
      top: -10px;
      right: -7px;
  }




  .DateInput_input{
  text-align:center;
}

.swal-overlay--show-modal .swal-modal {
    animation: none !important;
}

.swal-footer {
    text-align: center;
}

.swal-button {
    color: #fff;
    border: none;
    font-weight: 600;
    font-size: 14px;
    padding: 10px 24px;
    margin: 0;
    cursor: pointer;
    background-color: ${({ theme }: { theme: ITheme }) =>
      theme.color.mainForeground};
    display: block;
    width: 100%;
    text-align: center;
    margin-bottom: 5px;
    box-shadow: 0 0 0 0 rgba(34,36,38,.15) inset;
    border-radius: .28571429rem;
    font-family: Vazir;
    :focus {
      background-color: #0097A7;
    }
    :focus {
      outline: none;
      box-shadow: none;
    }
}

.ui.horizontal.divider {
  &:before, &:after{
    display:none;
  }
}

.marg8 {
  margin-bottom: 8px !important;
}


.hero_mother {
  @media (max-width: 767px) {
    height: 190px;
  }
}

.hero_in {
  width: 100%;
  height: 450px;
  position: relative;
  overflow: hidden;
  max-width: 1170px;
  margin: 0 auto;
  @media (max-width: 767px) {
    height: 350px;
  }
}

.hero_in.shop_detail {
  height: 550px;
}
@media (max-width: 767px) {
  .hero_in.shop_detail {
    height: 350px;
  }
}
.hero_in.shop_detail:before {
  background-size: cover;
}
.hero_in.shop_detail .wrapper {
  background-color: black;
  background-color: rgba(0, 0, 0, 0.2);
}
.hero_in.hotels_detail {
  height: 550px;
  @media (max-width: 767px) {
    /* height: 350px; */
    height: 100%;
  }
}
.hero_in.hotels_detail:before {
  background-size: cover;
}
.hero_in.hotels_detail .wrapper {
  background-color: black;
  background-color: rgba(0, 0, 0, 0.2);
}
.hero_in.restaurant_detail {
  height: 550px;
}
@media (max-width: 767px) {
  .hero_in.restaurant_detail {
    height: 350px;
  }
}
.hero_in.restaurant_detail:before {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.hero_in.restaurant_detail .wrapper {
  background-color: black;
  background-color: rgba(0, 0, 0, 0.2);
}
.hero_in:before {
  animation: pop-in 5s 0.1s cubic-bezier(0, 0.5, 0, 1) forwards;
  content: "";
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}
.hero_in .wrapper {
  height: 100%;
}
.hero_in a.btn_photos {
  position: absolute;
  left: 20px;
  bottom: 20px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
  line-height: 1;
  padding: 10px 15px;
  color: #444;
  font-weight: 500;
}
.hero_in a.btn_photos:hover {
  color: ${({ theme }: { theme: ITheme }) => theme.color.mainForeground};
}

/* Animations */
@keyframes pop-in {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: scale(1.1);
  }
}
.carousel_detail {
  margin-bottom: 40px;
}
.carousel_detail .item {
  border-radius: 3px;
  overflow: hidden;
}
.carousel_detail .owl-nav {
  position: absolute;
  bottom: 5px;
  right: 5px;
}
.carousel_detail .owl-nav [class*='owl-'] {
  border-radius: 3px !important;
  padding: 4px 5px 2px 5px !important;
  background: #222 !important;
  transition: all 0.3s ease;
}
.carousel_detail .owl-nav [class*='owl-'] i {
  font-size: 24px;
  line-height: 1;
  margin: 0;
}
.carousel_detail .owl-nav [class*='owl-']:hover {
  background: ${({ theme }: { theme: ITheme }) =>
    theme.color.mainForeground} !important;
}

ul.bullets {
  line-height: 1.8;
  margin: 0;
  padding: 0;
}
ul.bullets li {
  position: relative;
  padding-left: 23px;
}

.h5, h5 {
    font-size: 1.25rem;
}

.slider {
  height: 100% !important;
}


















/**============================== noUi Slider ==============================*/
.noUi-target,
  .noUi-target * {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-user-select: none;
    -ms-touch-action: none;
    touch-action: none;
    -ms-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .noUi-target {
    position: relative;
    direction: ltr;
  }
  .noUi-base,
  .noUi-connects {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }
  /* Wrapper for all connect elements. */
  .noUi-connects {
    overflow: hidden;
    z-index: 0;
  }
  .noUi-connect,
  .noUi-origin {
    will-change: transform;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    -ms-transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    -webkit-transform-style: preserve-3d;
    transform-origin: 0 0;
    transform-style: flat;
    background: ${({ theme }: { theme: ITheme }) =>
      theme.color.mainForeground} !important;
  }
  /* Offset direction
  */
  html:not([dir="rtl"]) .noUi-horizontal .noUi-origin {
    left: auto;
    right: 0;
  }
  /* Give origins 0 height/width so they don't interfere with clicking the
  * connect elements.
  */
  .noUi-vertical .noUi-origin {
    width: 0;
  }
  .noUi-horizontal .noUi-origin {
    height: 0;
  }
  .noUi-handle {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    position: absolute;
  }
  .noUi-touch-area {
    height: 100%;
    width: 100%;
  }
  .noUi-state-tap .noUi-connect,
  .noUi-state-tap .noUi-origin {
    -webkit-transition: transform 0.3s;
    transition: transform 0.3s;
  }
  .noUi-state-drag * {
    cursor: inherit !important;
  }
  /* Slider size and handle placement;
  */
  .noUi-horizontal {
    height: 18px;
  }
  .noUi-horizontal .noUi-handle {
    width: 34px;
    height: 28px;
    left: -17px;
    top: -6px;
  }
  .noUi-vertical {
    width: 18px;
  }
  .noUi-vertical .noUi-handle {
    width: 28px;
    height: 34px;
    left: -6px;
    top: -17px;
  }
  html:not([dir="rtl"]) .noUi-horizontal .noUi-handle {
    right: -17px;
    left: auto;
  }
  /* Styling;
  * Giving the connect element a border radius causes issues with using transform: scale
  */
  .noUi-target {
    background: #FAFAFA;
    border-radius: 4px;
    border: 1px solid #D3D3D3;
    box-shadow: inset 0 1px 1px #F0F0F0, 0 3px 6px -5px #BBB;
  }
  .noUi-connects {
    border-radius: 3px;
  }
  .noUi-connect {
    background: #3FB8AF;
  }
  /* Handles and cursors;
  */
  .noUi-draggable {
    cursor: ew-resize;
  }
  .noUi-vertical .noUi-draggable {
    cursor: ns-resize;
  }
  .noUi-handle {
    border: 1px solid #D9D9D9;
    border-radius: 3px;
    background: #FFF;
    cursor: default;
    box-shadow: inset 0 0 1px #FFF, inset 0 1px 7px #EBEBEB, 0 3px 6px -3px #BBB;
  }
  .noUi-active {
    box-shadow: inset 0 0 1px #FFF, inset 0 1px 7px #DDD, 0 3px 6px -3px #BBB;
  }
  /* Handle stripes;
  */
  .noUi-handle:before,
  .noUi-handle:after {
    content: none;
    display: none;
  }
  .noUi-handle:after {
    left: 17px;
  }
  .noUi-vertical .noUi-handle:before,
  .noUi-vertical .noUi-handle:after {
    width: 14px;
    height: 1px;
    left: 6px;
    top: 14px;
  }
  .noUi-vertical .noUi-handle:after {
    top: 17px;
  }
  /* Disabled state;
  */
  [disabled] .noUi-connect {
    background: #B8B8B8;
  }
  [disabled].noUi-target,
  [disabled].noUi-handle,
  [disabled] .noUi-handle {
    cursor: not-allowed;
  }
  /* Base;
  *
  */
  .noUi-pips,
  .noUi-pips * {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .noUi-pips {
    position: absolute;
    color: #999;
  }
  /* Values;
  *
  */
  .noUi-value {
    position: absolute;
    white-space: nowrap;
    text-align: center;
  }
  .noUi-value-sub {
    color: #ccc;
    font-size: 10px;
  }
  /* Markings;
  *
  */
  .noUi-marker {
    position: absolute;
    background: #CCC;
  }
  .noUi-marker-sub {
    background: #AAA;
  }
  .noUi-marker-large {
    background: #AAA;
  }
  /* Horizontal layout;
  *
  */
  .noUi-pips-horizontal {
    padding: 10px 0;
    height: 80px;
    top: 100%;
    left: 0;
    width: 100%;
  }
  .noUi-value-horizontal {
    transform: translate(-50%, 50%);
  }
  .noUi-rtl .noUi-value-horizontal {
    transform: translate(50%, 50%);
  }
  .noUi-marker-horizontal.noUi-marker {
    margin-left: -1px;
    width: 2px;
    height: 5px;
  }
  .noUi-marker-horizontal.noUi-marker-sub {
    height: 10px;
  }
  .noUi-marker-horizontal.noUi-marker-large {
    height: 15px;
  }
  /* Vertical layout;
  *
  */
  .noUi-pips-vertical {
    padding: 0 10px;
    height: 100%;
    top: 0;
    left: 100%;
  }
  .noUi-value-vertical {
    transform: translate(0, -50%);
    padding-left: 25px;
  }
  .noUi-rtl .noUi-value-vertical {
    transform: translate(0, 50%);
  }
  .noUi-marker-vertical.noUi-marker {
    width: 5px;
    height: 2px;
    margin-top: -1px;
  }
  .noUi-marker-vertical.noUi-marker-sub {
    width: 10px;
  }
  .noUi-marker-vertical.noUi-marker-large {
    width: 15px;
  }
  .noUi-tooltip {
    display: block;
    position: absolute;
    border: 1px solid #D9D9D9;
    border-radius: 3px;
    background: #fff;
    color: #000;
    padding: 5px;
    text-align: center;
    white-space: nowrap;
  }
  .noUi-horizontal .noUi-tooltip {
    transform: translate(-50%, 0);
    left: 50%;
    bottom: 120%;
  }
  .noUi-vertical .noUi-tooltip {
    transform: translate(0, -50%);
    top: 50%;
    right: 120%;
  }


  .noUi-horizontal {
    height: 8px !important;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.14);
    border-image: initial;
    background: none !important;
  }
  .noUi-connects {
      border-radius: 3px;
  }

  .noUi-handle {
    cursor: default;
    box-shadow: rgb(255, 255, 255) 0px 0px 1px inset, rgb(235, 235, 235) 0px 1px 7px inset, rgb(187, 187, 187) 0px 3px 6px -3px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(217, 217, 217);
    border-image: initial;
    border-radius: 3px;
    background: rgb(255, 255, 255);
    top: -8px !important;
    width: 25px !important;
    height: 25px !important;
    box-shadow: none !important;
    border-radius: 50% !important;
  }
  button {
    background-color:#1678c2
  }
  button:hover {
    background-color: #1e7cab !important
  }
  
.responsive {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px){
  .responsive {
    max-width: 540px;
  }
}
          @media (min-width: 768px){
          
            .responsive {
              max-width: 720px;
            }
          }
          @media (min-width: 992px){
          
            .responsive {
              max-width: 960px;
            }
          }
@media (min-width: 1200px){
  .responsive {
    max-width: 1140px;
  }
}
button:focus{
  background: #4BA3CE !important;
}
@media (max-width:768px){
.carcards_section {
  // overflow-x: hidden;
}
.filters_listing {
  overflow-x: hidden;

}
.DOOOOOD  .DatePicker__calendarContainer{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 20vh;
}
.DOOOOOD .Calendar {
  top: -177px;
}
  .DatePicker__calendarContainer {
    top: 10px;
    left: 0;
    right: 0;
    margin: auto;
    transform: none !important;
    position: absolute;
    background: none;
    width: 100%;
    height:0;
  }
}
.loader {
  position: absolute;
    left: 23px;
    right: auto;
    top: 39px;
    border: .2em solid rgba(0,0,0,.1);
    border-radius: 50%;
    border-top: .2em solid #949494;
    width: 20px;
    height: 20px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin .6s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
#nprogress .spinner{
  display:none;
}

.searchBoxContainer{
  position:relative
}

.resultList{
  z-index: 10;
  max-height: 200px;
  background: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid #85b7d9;
  border-top: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: 68px;
  margin: auto;
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.resultList p {
  position: relative;
    cursor: pointer;
    display: block;
    border: none;
    height: auto;
    text-align: right;
    line-height: 1em;
    color: rgba(0,0,0,.87);
    padding: .78571429rem 1.14285714rem!important;
    font-size: 1rem;
    text-transform: none;
    font-weight: 400;
    -webkit-box-shadow: none;
    box-shadow: none;
    -webkit-touch-callout: none;
    border-top: 1px solid #fafafa;
    white-space: normal;
    word-wrap: normal;
}
.ErrorINPUT input{
  background: #fff6f6 !important;
  border-color: #e0b4b4 !important;
  color: #9f3a38 !important;
}
#Skeletonloader{
  background: #f7f7f7;
  border-color: #fff;
  animation : anim 1s linear infinite
}
@keyframes anim{
  0%{
    background: #f7f7f7;
  }
  50%{
    background: #efeeee;
  }
  100%{
    background: #f7f7f7;
  }
}

.diz{
  opacity:0.3
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield !important;;
}
.radio.checkbox label{
  font-weight: 100;
}
.ownerInCheckOut{
  position: absolute;
    bottom: 17px;
    right: 0;
}
.ownerInCheckOut img{
  width: 40px;
    border-radius: 50%;
    height: 40px;
    margin-left: 10px;
}
.ownerInCheckOut div{
  display:inline-block;
  vertical-align:middle;
}
.checkOutPartoneFather{
  display: flex;
  position: relative;
  border-bottom: 1px solid #d7d7d7;
  padding-bottom: 19px;
}
.box_detail li{
  border-bottom: 1px solid transparent !important;  
}
.dateFatherCheckout{
  display: flex;
    justify-content: space-around;
    align-items: center;


}
.Nadarim{
  display:none;
}
@media (max-width:768px){
  #sidebar{
    padding: 0 !important;
  }
  .Nadarim{
  display:block;
  border-radius: 3px;
  box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.1);
    position: relative;
    width: 100%;
    min-height: 1px;
    background: #fff;
    padding-top: 10px;
    margin-bottom: 10px;
  }
  .DesignReally{
    background-color: #fff;
              padding: 25px 25px 15px 25px;
              box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.1);
              border-radius: 3px;
              margin-bottom: 10px;
            }
  #sidebar .dateFatherCheckout, .DayCounter_Checkout{
    display:none;
  }
}
@media (max-width:991px){
  .di_couner_checkout{
     margin-bottom: 0px !important;
  }
  .DatesinCheckOutpage, .di_couner_checkout {
    font-weight: 400 !important;
    font-size: 13px;
}
}

.DatesinCheckOutpage{
  font-weight: bold;
  direction: rtl;
}
.TaInCheckout{
  text-align:center;
  display: inline-block;
  width: 55%;
  @media (max-width:991px){
    width: 00%;
    
  }
}
.mobileView{
  display:none;
}
.DIvIN_Checkout{
  direction: rtl;
  padding-right: 15px;
    padding-left: 15px;
}
.innerDiv_DIvIN_Checkout{
  background-color: #fff;
  width: 65.5%;
  direction: rtl;
  padding: 25px 25px 15px 25px;
  box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.1);
  border-radius: 3px;
  margin-bottom: 10px;
}

@media (max-width:991px){
  .DeskView{
    display: none;
  }
  .mobileView{
    display:block;
  }
  .mobileView  .innerDiv_DIvIN_Checkout{
    width: 100%;
  }
}

@media (max-width:768px){
  .mobileView .DIvIN_Checkout{
    padding-right: 0px;
      padding-left: 0px;
  }
}

.AboutUsPage{
  direction: rtl;
  text-align: right;
  margin: 50px auto;
  min-height: 400px;
}
.AboutUsPage h1{
  font-size:30px;
  line-height:2;
}
.AboutUsPage p{
  line-height:2;
  text-align:justify;
  direction: rtl;
}
.AboutUsPage ul{
  list-style-type: disc;
  padding-right: 15px;
  text-align: justify;
  direction: rtl;
  list-style-position: inside;
}
.intends{
  padding-right:50px !important;
}
@media (max-width: 768px)
.AboutUsPage {
    padding: 0px 15px;
}

/* The container */
.RadioButtonContainer {
  display: block;
  position: relative;
  padding-right: 40px;
  margin-bottom: 12px;
  cursor: pointer;
  color:#2A2A2A;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.RadioButtonContainer input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 2px;
  right: 5px;
  height: 22px;
  width: 22px;
  border: 1px solid #ccc;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.RadioButtonContainer:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.activeOne .checkmark {
  background-color: #fff;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.activeOne .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.activeOne .checkmark:after {
  top: 5px;
  left: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #4BA3CE;
}
.fadeItem{
  color:#ddd;
}

// ****************OTILI
OTILI

.OTILI{
  direction: rtl;
  text-align: right;
  margin: 50px auto;
  min-height: 400px;
}
.OTILI h1{
  text-align:center;
  font-size:30px;
  margin:20px auto 60px;
  line-height:2;
}
.OTILI h2{
  color: #A3678B;
  font-weight: bold;
  text-align: center;
  font-size: 28px;
}
.OTILI p{
  line-height:2;
  text-align:justify;
  direction: rtl;
}

.PartOne_OTOLI {
  position: relative;
}
.PartOne_OTOLI:after {
  position: absolute;
  content: "";
  display: block;
  clear: both;
  right: 0;
  left: 0;
  margin: auto;
  width: 14px;
  top: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
}

.partOne_OTOLI_D1{
  display:inline-block;
  vertical-align:top;
  width:50%;
  padding: 24px;
}
.D1_Left div{
  direction: rtl;
  position:relative;
  padding: 15px;
  border-radius:4px;
  border:1px solid #4BA3CE;
    margin-bottom: 60px;
}
.D1_Left div:nth-of-type(1){
  margin-top: 30px;
    margin-bottom: 66px;
}
.D1_Left div:nth-of-type(1):before{
  content: " ";
  position: absolute;
  top: 21px;
  right: -31px;
  z-index: 3;
  margin-top: -5px;
  border-width: 6px;
  border-style: solid;
  border-color: #4ba3ce;
}
.D1_Left div:nth-of-type(1):after{
  content: " ";
  position: absolute;
  top: 19px;
  left: 100%;
  margin-top: -5px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent transparent #4ba3ce;
}
// ************div:nth-of-type(2)
.D1_Left div:nth-of-type(2):before{
  content: " ";
  position: absolute;
  top: 53px;
  right: -31px;
  z-index: 3;
  margin-top: -5px;
  border-width: 6px;
  border-style: solid;
  border-color: #4ba3ce;
}
.D1_Left div:nth-of-type(2):after{
  content: " ";
  position: absolute;
  top: 50px;
  left: 100%;
  margin-top: -5px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent transparent #4ba3ce;
}

// ************div:nth-of-type(3)
.D1_Left div:nth-of-type(3):before{
  content: " ";
  position: absolute;
  top: 83px;
  right: -31px;
  z-index: 3;
  margin-top: -5px;
  border-width: 6px;
  border-style: solid;
  border-color: #4ba3ce;
}
.D1_Left div:nth-of-type(3):after{
  content: " ";
  position: absolute;
  top: 80px;
  left: 100%;
  margin-top: -5px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent transparent #4ba3ce;
}

// ************div:nth-of-type(4)
.D1_Left div:nth-of-type(4):before{
  content: " ";
  position: absolute;
  top: 23px;
  right: -31px;
  z-index: 3;
  margin-top: -5px;
  border-width: 6px;
  border-style: solid;
  border-color: #4ba3ce;
}
.D1_Left div:nth-of-type(4):after{
  content: " ";
  position: absolute;
  top: 20px;
  left: 100%;
  margin-top: -5px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent transparent #4ba3ce;
}

// ************div:nth-of-type(5)
.D1_Left div:nth-of-type(5):before{
  content: " ";
  position: absolute;
  top: 53px;
  right: -31px;
  z-index: 3;
  margin-top: -5px;
  border-width: 6px;
  border-style: solid;
  border-color: #4ba3ce;
}
.D1_Left div:nth-of-type(5):after{
  content: " ";
  position: absolute;
  top: 50px;
  left: 100%;
  margin-top: -5px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent transparent #4ba3ce;
}

// ************div:nth-of-type(6)
.D1_Left div:nth-of-type(6):before{
  content: " ";
  position: absolute;
  top: 83px;
  right: -31px;
  z-index: 3;
  margin-top: -5px;
  border-width: 6px;
  border-style: solid;
  border-color: #4ba3ce;
}
.D1_Left div:nth-of-type(6):after{
  content: " ";
  position: absolute;
  top: 80px;
  left: 100%;
  margin-top: -5px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent transparent #4ba3ce;
}



// **********RIGHT
.D1_Right div{
  direction: rtl;
  position:relative;
  padding: 15px;
  border-radius:4px;
  border:1px solid #A3678B;
  margin-bottom: 59px;
  margin-top: 15px;
}
.PartOne_OTOLI:nth-of-type(1) .D1_Right div:nth-of-type(2){
  margin-top: 60px;
  margin-bottom: 221px;
}
.PartOne_OTOLI:nth-of-type(2) .D1_Right div:nth-of-type(1){
  margin-top: 80px;
  margin-bottom: 60px;
}
.PartOne_OTOLI:nth-of-type(3) .D1_Left div:nth-of-type(1){
  margin-top: 30px;
  margin-bottom: 60px;
}
.PartOne_OTOLI:nth-of-type(4) .D1_Left div:nth-of-type(1){
  margin-top: 10px;
  margin-bottom: 60px;
}
.PartOne_OTOLI:nth-of-type(4) .D1_Right div:nth-of-type(1){
  margin-top: 40px;
  margin-bottom: 60px;
}
.D1_Right div:nth-of-type(1):before{
  content: " ";
  position: absolute;
  top: 20px;
  left: -31px;
  z-index: 3;
  margin-top: -5px;
  border-width: 6px;
  border-style: solid;
  border-color: #A3678B;
}
.D1_Right div:nth-of-type(1):after{
  content: " ";
  position: absolute;
  top: 19px;
  right: 100%;
  margin-top: -5px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent #A3678B transparent transparent;
}

// ************div:nth-of-type(2)

.D1_Right div:nth-of-type(2):before{
  content: " ";
  position: absolute;
  top: 52px;
  left: -31px;
  z-index: 3;
  margin-top: -5px;
  border-width: 6px;
  border-style: solid;
  border-color: #A3678B;
}
.D1_Right div:nth-of-type(2):after{
  content: " ";
  position: absolute;
  top: 50px;
  right: 100%;
  margin-top: -5px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent #A3678B transparent transparent;
}


// ************div:nth-of-type(3)

.D1_Right div:nth-of-type(3):before{
  content: " ";
  position: absolute;
  top: 72px;
  left: -31px;
  z-index: 3;
  margin-top: -5px;
  border-width: 6px;
  border-style: solid;
  border-color: #A3678B;
}
.D1_Right div:nth-of-type(3):after{
  content: " ";
  position: absolute;
  top: 70px;
  right: 100%;
  margin-top: -5px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent #A3678B transparent transparent;
}

// ************div:nth-of-type(4)

.D1_Right div:nth-of-type(4):before{
  content: " ";
  position: absolute;
  top: 12px;
  left: -31px;
  z-index: 3;
  margin-top: -5px;
  border-width: 6px;
  border-style: solid;
  border-color: #A3678B;
}
.D1_Right div:nth-of-type(4):after{
  content: " ";
  position: absolute;
  top: 10px;
  right: 100%;
  margin-top: -5px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent #A3678B transparent transparent;
}

// ************div:nth-of-type(5)

.D1_Right div:nth-of-type(5):before{
  content: " ";
  position: absolute;
  top: 72px;
  left: -31px;
  z-index: 3;
  margin-top: -5px;
  border-width: 6px;
  border-style: solid;
  border-color: #A3678B;
}
.D1_Right div:nth-of-type(5):after{
  content: " ";
  position: absolute;
  top: 70px;
  right: 100%;
  margin-top: -5px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent #A3678B transparent transparent;
}

.OTOLI_MIDDLE_Dif{
  font-size:22px !important;
  width: 179px;
  margin: auto;
  padding: 10px;
  border: 2px solid #e1e1e1;
  color: #bfbfbf !important;
}

@media (max-width: 768px)
.OTILI {
    padding: 0px 15px;
}


@media (max-width: 575px){
  .PartOne_OTOLI:nth-of-type(1) .D1_Right div:nth-of-type(2){
    margin-top: 60px;
    margin-bottom: 60px;
  }
  .partOne_OTOLI_D1 {
      display: block;
      vertical-align: top;
      width: 100%;
      padding: 24px;
  }
  .PartOne_OTOLI:after {
    display:none;
  }
  .D1_Left div:nth-of-type(1) {
    margin-bottom: 18px;
}
.D1_Left div {
  margin-bottom: 18px;
}
.D1_Left div:before {
  display:none;
}
.D1_Left div:after {
  top: auto !important;
  bottom: -16px;
  left: 50%;
  right: 50%;
  margin: auto;
  margin-top: -5px;
  border-color: #4ba3ce transparent transparent transparent !important;

}
.D1_Left div:last-child:after,
.D1_Right div:last-child:after{
  display:none
}

.D1_Right div:nth-of-type(1) {
  margin-top: 30px;
  margin-bottom: 18px;
}
.D1_Right div {
  margin-bottom: 18px;
}
.D1_Right div:before {
  display:none;
}
.D1_Right div:after {
  top: auto !important;
  bottom: -16px;
  left: 50%;
  right: 50% !important;
  margin: auto;
  margin-top: -5px;
  border-color: #A3678B transparent transparent transparent !important;

}
}
// *****************RATE
.RATE_CAR_IMAGE{
  width: 64px;
  height: 64px;
  border-radius: 50px;
}
.CarName-RATE{
  font-weight: 100;
  margin: 10px auto;
}

// *********F&Q
.FQ_WRAPPER{
  margin-bottom: 50px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background: #fff;
}
.FQ_WRAPPER h2{
  font-size:22px;
  padding: 15px;

}
.ICON_CHevron{
  transition:0.25s;
    position: absolute;
    left: 9px;
    top: 20px;
}
.ACTIVE_CHEVRON{
 transform:rotate(180deg)
}
.QuestionPart{
  display:none;
  font-size: 1rem;
    line-height: 1.6;
    font-family: Vazir, sans-serif;
    color: rgb(42, 42, 42);
}
.activeQA{
  display:block;
  color: rgba(0,0,0,.95) !important

}
.FQ_BOX{
  cursor:pointer;
  border-top: 1px solid #ccc;
  padding: 15px;
  direction:rtl;
  position: relative;

}
.FQ_BOX h3{
  font-family:  Vazir, sans-serif;
  color: rgba(0,0,0,0.6);
  font-size: 1em;
}
.FQ_BOX a {
  color:#0099ff !important;
}

// input.KESAFAT_KARI::selection {
//   background: transparent;
//   color:transparent
// }
// input.KESAFAT_KARI::-moz-selection {
//   background: #ffb7b7;
// }
pre{
  font-size: 1rem !important;
    line-height: 1.6 !important;
    font-family: Vazir,sans-serif !important;
    color: #2A2A2A !important;
}
.COMEOOON{
  position:relative
}

.marginni{
  margin: 0px 0px 7px;

}
button.Calendar__day.-selectedBetween {
  background: #fff;
  color:#444;
}

.pelak .field {
  position: absolute !important;
}
.pelak .field:nth-of-type(4){
left: 39px !important;
top: 9px !important;
width: 40px !important;
}

.pelak .field:nth-of-type(2){
  left: 87px !important;
  top: 9px !important;
  width: 70px !important;
  }

.pelak .field:nth-of-type(3){
  left: 164px !important;
  top: 9px !important;
  width: 55px !important;
  }

  .pelak .field:nth-of-type(1){
    left: 238px !important;
    top: 20px !important;
    width: 55px !important;
    }
    .pelak .field:nth-of-type(1) input{
      height:39px !important;
      padding: 8px;
  }
  .pelak .field input{
    padding: 8px !important;
  }
// SLIDER CAROUSEL 
.carousel_container{
  position:relative;
  width:100%;
  height:550px;
  background-color:#e6e6e6;
  overflow:hidden
}
.carousel_container .carousel_FrontImage{
  max-width: auto;
  height: 100%;
  box-shadow:0px 0px 105px #3c3c3c;
  display: block;
  margin: auto;
  right:0;
  left:0;
  position: absolute;
  z-index: 2;
  max-width: 100%;
}
.carousel_BackImage{
  transform: scale(1.7);
  right: 0;
  top: 0;
    z-index: 1 !important;
    position: absolute !important;
    width: 100% !important;
    height: auto !important;
    filter: blur(20px);
}
// .Slider_Part .carousel_FrontImage{
//   width: auto;
//   height: 100%;
//   display: block;
//   margin: auto;
//   position: relative;
//   z-index: 2;
// }
.HiddenSlide{
  display:none !important;
}
.NAVIGA{
  transition:0.2s;
  opacity:0.3;
  position: absolute;
  top: 246px;
  z-index: 10;
  cursor: pointer;
  background: transparent;
  border: none;
  margin-right: 10px;
  font-size: 12px;
  color: #7d7d7d;
  border-radius: 50px;
  margin-left: 10px;
  background: #fff;
  height: 40px;
  width: 40px;
}
.NAVIGA:hover,.NAVIGA:focus,.NAVIGA:active{
  background-color: #fff !important;
  outline:none;
  opacity:.8
}
.NAVIGA.arrow-right{
  right:10px;
  position: absolute;
}
.NAVIGA.arrow-left{
  left:10px;
  position: absolute;
}
.FullScreen{
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 16px;
  color: #fff;
  z-index: 3;
}

@media (max-width:768px){
.carousel_container{  
    height: 230px;
  }
  .NAVIGA {
    top: 38%;
    display: block;
  }
  .G_R,
  .G_L{
    top:26%
  }
  .G_R{
right:0;
  }
  .G_L{
    left:0
  }
}

@media (max-width:991px){
  .NavBotton {
    bottom: 44px !important;
  }
}
@media (max-width:768px){
  .deactiveDot, .activeDot{
    margin: 4px !important;
  }
  .NavBotton {
    bottom: 0px !important;
}
}

// GALLERY STYLES
.Gallery_Container{
  overflow:hidden;
  overflow-y:scroll;
  padding-top: 30px;
  position:fixed;
  top:0;
  right:0;
  width:100%;
  z-index: 999;
  height: 100%;
    background: rgba(0,0,0,0.89);
}
.closeButton{
  z-index: 1000;
    color: #fff;
    cursor:pointer;
    position: absolute;
    right: 40px;  
}
.show_part{
  width: 80%;
  height: 70vh;
    margin: auto;
}
.show_part img{
  height: 100%;
  display: block;
  margin: auto;
}
.thumbnail_part{
  width: 80%;
    margin: auto;
    display: flex;
    justify-content: center;
    overflow-x: scroll;
    height:100px;
    margin-top:20px;
    padding-bottom: 6px;
  }

  /* width */
  .thumbnail_part::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.thumbnail_part::-webkit-scrollbar-track {
  background: transparent; 
}
 
/* Handle */
.thumbnail_part::-webkit-scrollbar-thumb {
  background:  #555; 
}

/* Handle on hover */
.thumbnail_part::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

  .thumbnail_part img{
    cursor:pointer;
    border: 1px solid #fff;
    border-radius: 4px;
    margin: 0 10px;
  display:inline-block;
  vertical-align:top;
  height:100%;
}

@media (max-width:960px){
  .show_part {
  position:relative;
    height: 360px;
    margin-bottom: 80px;
  }
  .show_part img{
position:absolute;
margin:auto;
left:0;
right:0;
height:100%;
  }
  .closeButton {
    right: 10px;
  }
}

.NavBotton {
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 0;
  left: 0;
  margin: auto;
  z-index: 4;
  text-align: center;
}

.activeDot{
  width: 10px;
  height: 10px;
  border-radius:50px;
  background: #fff;
  margin: 6px;
  display: inline-block;
  vertical-align: middle;
}

.deactiveDot{
  width: 10px;
  height: 10px;
  border-radius:50px;
  background: #fff;
  margin: 6px;
  display: inline-block;
  vertical-align: middle;
  opacity:0.3;
}

@media (max-width:660px){
  .show_part {
    margin-top: 40px;
    margin-bottom: 20px;
    width: 96%;
    height: auto;
}
.thumbnail_part {
  position: fixed;
    bottom: 0;
    width: 100%;
}
.show_part img {
  height: auto;
    width: 100%;
}
  .closeButton {
    right: 10px;
  }
}
.rightSlide{
  opacity:0;
  // transition:opacity 0.3s,
  animation: fadeIN 0.25s linear 0.1s  forwards 
}

@keyframe fadeIN{
  0%{
    opacity:0;

  }
  100%{
    opacity:1

  }
}

.Toastify__toast-container.Toastify__toast-container--bottom-center{
  width: 50%;
    right: 0;
    left: 0;
    margin: auto;
    bottom: 0;
    padding: 0;
    box-shadow: -1px -1px 2px 0px rgba(197, 197, 197, 0.75);
}
@media (max-width:768px){
  .Toastify__toast-container.Toastify__toast-container--bottom-center{
    width: 100%;
  }
}
.Toastify__toast.Toastify__toast--success,.Toastify__toast.Toastify__toast--error  {
  margin: 0;
}

.Toastify__toast-body {
  text-align: center;
  color: #fff;
  font-family: vazir;
  direction: rtl;
}
.Toastify__toast--success {
  background: #03a596;
}

button.Toastify__close-button.Toastify__close-button--success {
  color: #fff;
  padding-left: 11px;
  display: block;
}

button.Toastify__close-button.Toastify__close-button--success:hover {
  background-color: transparent !important;
}

.Toastify__toast-container {
  z-index: 999999999;
}


/*** iPhone and iOS Form Input Zoom Fixes ***/
/* Fix Input Zoom on devices older than iPhone 5: */
@media screen and (device-aspect-ratio: 2/3) {
    select, textarea, input[type="text"], input[type="password"],
    input[type="datetime"], input[type="datetime-local"],
    input[type="date"], input[type="month"], input[type="time"],
    input[type="week"], input[type="number"], input[type="email"],
    input[type="url"]{ font-size: 16px; }
}

/* Fix Input Zoom on iPhone 5, 5C, 5S, iPod Touch 5g */
@media screen and (device-aspect-ratio: 40/71) {
    select, textarea, input[type="text"], input[type="password"],
    input[type="datetime"], input[type="datetime-local"],
    input[type="date"], input[type="month"], input[type="time"],
    input[type="week"], input[type="number"], input[type="email"],
    input[type="url"]{ font-size: 16px; }
}

/* Fix Input Zoom on iPhone 6, iPhone 6s, iPhone 7  */
@media screen and (device-aspect-ratio: 375/667) {
    select, textarea, input[type="text"], input[type="password"],
    input[type="datetime"], input[type="datetime-local"],
    input[type="date"], input[type="month"], input[type="time"],
    input[type="week"], input[type="number"], input[type="email"],
    input[type="url"]{ font-size: 16px; }
}

/* Fix Input Zoom on iPhone 6 Plus, iPhone 6s Plus, iPhone 7 Plus, iPhone 8, iPhone X, XS, XS Max  */
@media screen and (device-aspect-ratio: 9/16) {
    select, textarea, input[type="text"], input[type="password"],
    input[type="datetime"], input[type="datetime-local"],
    input[type="date"], input[type="month"], input[type="time"],
    input[type="week"], input[type="number"], input[type="email"],
    input[type="url"]{ font-size: 16px; }
}

// 404 page
._404PageImage{
  display:block;
  margin-top: 80px;
  margin:auto;
  @media (max-width:720px){
    width:100%
  }
}
._404PageAnchor{
  text-align: center;
    display: block;
    font-weight: 600;
    margin-bottom: 100px;
}

#sign-in-dialog .JustThisone {
  width: 100%;
}

#JustPersian{
  font-family: IRANSans !important;
}

#cancelBTN{
  box-shadow: none !important;
    border: 1px solid #4ba3ce;
    color: #4ba3ce !important;
    font-weight: 500;
}
.editform {
  width: 100%;
  .editBox{
    width: 100%;
  }
}
div#pelak_container {
  margin-bottom: 0px !important;
}
`;

enum Margin {
  Normal = "margin_60",
  Bitter = "margin_60_35"
}

export { GlobalStyle, Margin };
