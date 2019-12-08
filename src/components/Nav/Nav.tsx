import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ITheme } from "../../theme/Interfaces";
import jsCookie from 'js-cookie';

const Navigation = styled.div`
  nav#menu.main-menu {
    display: block !important;
  }

  /* Menu */
  .main-menu {
    position: relative;
    z-index: 9;
    width: auto;
    top: 8px;
    right: 0px;
    float: right;
    transition: all 0.3s ease-in-out;
    ul, ul li {
      position: relative;
      display: inline-block;
      margin: 0;
      padding: 0;
      a {
        position: relative;
        margin: 0;
        padding: 0;
        display: block;
        padding: 5px 10px;
        white-space: nowrap;
      }
      ul {
        position: absolute;
        z-index: 1;
        visibility: hidden;
        right: -16px;
        top: 30px;
        margin: 0;
        display: block;
        padding: 0;
        background: ${({ theme }: { theme: ITheme }) => theme.color.whiteBackground};
        min-width: 200px;
        box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.175);
        transform: scale(0.4);
        transform-origin: 90% top;
        transition: 0.15s linear, 0.1s opacity cubic-bezier(0.39, 0.575, 0.565, 1),
          0.15s transform cubic-bezier(0.1, 1.26, 0.83, 1);
        opacity: 0;
        transition: all 0.2s ease;
        border-radius: 3px;
        :before {
          bottom: 100%;
          right: 15%;
          border: solid transparent;
          content: '';
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
          border-bottom-color: ${({ theme }: { theme: ITheme }) => theme.color.whiteBackground};
          border-width: 7px;
          margin-left: -7px;
        }
        li {
          display: block;
          height: auto;
          padding: 0;
          :first-child a:hover {
            border-radius: 3px 3px 0 0;
          }
          :last-child a {
            border-bottom: none;
          }
          :last-child a:hover {
            border-radius: 0 0 3px 3px;
          }
          :hover > a {
            background-color: ${({ theme }: { theme: ITheme }) => theme.color.lightBackground};
            color: ${({ theme }: { theme: ITheme }) => theme.color.mainForeground};
            padding-left: 15px;
          }
          a {
            font-size: 13px;
            font-size: 0.8125rem;
            color: ${({ theme }: { theme: ITheme }) => theme.color.textMain};
            border-bottom: 1px solid ${({ theme }: { theme: ITheme }) => theme.color.textMainAlter};
            display: block;
            padding: 15px 10px;
            line-height: 1;
          }
        }
      }
      li {
        :hover > ul {
          padding: 0;
          visibility: visible;
          opacity: 1;
          transform: scale(1);
          transition-delay: 0.2s;
          transition-duration: 0s, 0.2s, 0.2s;
        }
      }
      /*First level styles */
      &>li span {
        &>a {
          color: ${({ theme }: { theme: ITheme }) => theme.color.textMainAlter};
          :hover {
            color: ${({ theme }: { theme: ITheme }) => theme.color.textSecondAlter};

          }
          padding: 0 8px 16px 24px;
          font-size: 14px;
          font-weight: 500;
          :first-child {
            padding-right: 0px;
          } 
          @media (max-width:480px){
            font-size: 11px;
            padding: 0 8px 16px 8px;
          }
        }
        :hover > a {
          opacity: 0.7;
        }
      }
    }
  }
`;

export const Nav: React.FunctionComponent = ({ children, isMobile = false }) => (
  <Navigation>
    <nav id="menu" className="main-menu">
      <ul>
        {/* commented by sajad bug fix */}
        {/* {!isMobile && */}
        <li className= "CLICK_ON_GUID">
          <span>
            <a href="#">راهنما</a>
          </span>
          <ul>
            <li>
              <Link href="/otoli"><a>اتولی چگونه کار می‌کند؟</a></Link>
            </li>
            {/* {
              jsCookie.get('token') ?
                <li>
                  <Link href="/add-car">
                    <a>افزودن خودرو</a>
                  </Link>
                </li>
                :
                null} */}
            <li>
              <Link href="/faq">
                <a>سوالات پرتکرار</a>
              </Link>
            </li>
            <li>
              <Link href="/guide-for-rent"><a>راهنمای اجاره گیرنده</a></Link>
            </li>
            <li>
              <Link href="/guide-renter"><a>راهنمای اجاره دهنده</a></Link>
            </li>
            <li>
              <Link href="/guide-picture"><a>راهنمای عکس گرفتن</a></Link>
            </li>
          </ul>
        </li>
        {
          jsCookie.get('first_name') ?
            <li className="CLICK_ON_MY_REQUESTS">
              <span>
                <Link href="/requests">
                  <a>رزروهای من</a>
                </Link>
              </span>
            </li>
            : null
        }
        {children}
      </ul>
    </nav>
  </Navigation>
);
