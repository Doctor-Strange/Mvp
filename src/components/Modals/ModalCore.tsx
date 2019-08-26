import * as React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const ModalDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  max-width: 630px;
  min-width: 320px;
  height: auto;
  z-index: 2000;
  transform: translateX(-50%) translateY(-50%) scale(.7);
  opacity:0;
  transition: all .3s;
  #sign-in-dialog {
    overflow-x: hidden;
    overflow-y: hidden;
    background: #fff;
    padding: 30px;
    padding-top: 0;
    text-align: left;
    max-width: 400px;
    margin: 0px auto;
    position: relative;
    box-sizing: border-box;
    border-radius: 4px;
    transition: all 0.4s ease;

    .mfp-close {
      position: absolute;
      top: 12px;
      right: 20px;
      color: #666;
      border-radius: 50%;
      top: 10px;
      right: 10px;
      width: 26px;
      height: 26px;
      line-height: 26px;
      font-size: 20px;
      border: 0;
      cursor: pointer !important;
      :hover {
        color: #000;
      }
    }
  }
  .rtl {
    .small-dialog-header {
      h3 {
        text-align: right;
        margin-right: 40px;
      }
    }
  }
  .small-dialog-header {
    font-size: 18px;
    width: calc(100% + 60px);
    position: relative;
    left: -30px;
    top: 0;
    border-radius: 4px 4px;
    display: inline-block;
    background-color: #f6f6f6;
    padding: 0px 0px 0px 0px;
    margin-bottom: 44px;
    h3 {
      padding: 0;
      margin: 0;
      font-size: 18px;
      font-size: 1.125rem;
      font-weight: 500;
    }
  }

  &.md-show {
    opacity:1;
    transform: translateX(-50%) translateY(-50%) scale(1);
  }
`;

export const ModalCore = ({
  handleClose,
  animationClass,
  title,
  direction,
  height,
  children
}) => {
  return (
    <ModalDiv className={'md-modal ' + animationClass}>
      <div
        id="sign-in-dialog"
        className={`zoom-anim-dialog ${direction}`}
        style={{ height: height }}
      >
        <div className="small-dialog-header">
          <h3>{title}</h3>
          <span onClick={handleClose}>
            <Icon disabled name="close" className="mfp-close" />
          </span>
        </div>
        {children}
      </div>
    </ModalDiv>
  );
};
