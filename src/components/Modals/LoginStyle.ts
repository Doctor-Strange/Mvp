import styled from 'styled-components';

export const PhoneRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  /* .input {
    width: 80%;
    float: right;
  } */
  /* #country {
    width: 20%;
    min-width: 68px;
    float: left;
    .menu {
      position: absolute;
      width: 100px;
    }
  } */
`;

export const LoginForm = styled.div`
  .form-group {
    position: relative;

    /* input.form-control {
      padding-left: 40px;
    } */

    .box {
      font-size: 21px;
      font-size: 1.3125rem;
      position: absolute;
      left: 12px;
      top: 25px;
      color: #ccc;
      width: 25px;
      height: 25px;
      display: block;
      font-weight: 400 !important;
    }

    .my-toggle {
      background: transparent;
      border: 0;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      -ms-border-radius: 3px;
      border-radius: 3px;
      color: #888;
      cursor: pointer;
      font-size: 10px;
      font-size: 10px;
      font-size: 0.625rem;
      font-weight: bold;
      margin-right: 5px;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      text-transform: uppercase;
      -moz-appearance: none;
      -webkit-appearance: none;
      background-color: #fff;
      :hover,
      :focus {
        background-color: #eee;
        color: #555;
        outline: transparent;
      }
    }
  }

  .hideShowPassword-wrapper {
    width: 100% !important;
  }

  .checkboxes label {
    color: #999;
    margin-top: 5px;
  }

  a.small {
    color: #999;
    font-weight: 500;
    font-size: 13px;
    font-size: 0.8125rem;
  }

  .sign-in-wrapper {
    position: relative;
    height: 100%;
  }

  /* a.social_bt {
    border-radius: 3px;
    text-align: center;
    color: #fff;
    min-width: 200px;
    margin-bottom: 15px;
    display: block;
    padding: 12px;
    line-height: 1;
    position: relative;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    :hover {
      filter: brightness(115%);
    }
  }
  
  a.social_bt.facebook,
  a.social_bt.google,
  a.social_bt.linkedin {
    :before {
      position: absolute;
      left: 12px;
      top: 10px;
      font-size: 1rem;
      color: #fff;
    }
  } 
  
  a.social_bt.facebook {
    background-color: #3b5998;
    :before {
      content: 'f';
    }
  }

  a.social_bt.google {
    background-color: #dc4e41;
    :before {
      content: 'g';
    }
  } */

  .divider {
    text-align: center;
    height: 1px;
    margin: 30px 0 20px 0;
    background-color: #e1e8ed;
    span {
      position: relative;
      top: -20px;
      background-color: #fff;
      display: inline-block;
      padding: 10px;
      font-style: italic;
    }
  }
  .flow-root {
    display: flow-root;
  }
`;
