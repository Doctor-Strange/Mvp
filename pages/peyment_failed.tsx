import * as React from "react";
import styled from "styled-components";
import { Section } from "../src/components/row/Sections";
import Layout from "../src/components/Layout";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

const ThePage = styled.div`
  margin-top: 24px;
  width: 100%;
  svg {
    width: 100px;
    display: block;
    margin: 0px auto 24px;
  }

  .path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
    &.circle {
      -webkit-animation: dash 0.9s ease-in-out;
      animation: dash 0.9s ease-in-out;
    }
    &.line {
      stroke-dashoffset: 1000;
      -webkit-animation: dash 0.9s 0.35s ease-in-out forwards;
      animation: dash 0.9s 0.35s ease-in-out forwards;
    }
    &.check {
      stroke-dashoffset: -100;
      -webkit-animation: dash-check 0.9s 0.35s ease-in-out forwards;
      animation: dash-check 0.9s 0.35s ease-in-out forwards;
    }
  }

  p {
    text-align: center;
    margin: 20px 0 60px;
    font-size: 1.25em;
    &.success {
      color: #73af55;
    }
    &.error {
      color: #d06079;
    }
  }

  @-webkit-keyframes dash {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes dash {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @-webkit-keyframes dash-check {
    0% {
      stroke-dashoffset: -100;
    }
    100% {
      stroke-dashoffset: 900;
    }
  }

  @keyframes dash-check {
    0% {
      stroke-dashoffset: -100;
    }
    100% {
      stroke-dashoffset: 900;
    }
  }

  .booking {
    margin-top: 32px;
    max-width: 100%;
    width: 375px;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 32px;
  }

  h3 {
    margin-top: 8px;
  }

  .center {
    text-align: center;
  }

  img {
    max-width: 100%;
    width: 260px;
    border-radius: 4px;
    margin-bottom: 8px;
  }
`;

const Page = () => {
  return (
    <Layout>
      <Section justifyCenter={true} style={{ minHeight: "400px" }}>
        <ThePage>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 130.2 130.2"
          >
            <circle
              className="path circle"
              fill="none"
              stroke="#D06079"
              stroke-width="6"
              stroke-miterlimit="10"
              cx="65.1"
              cy="65.1"
              r="62.1"
            />
            <line
              className="path line"
              fill="none"
              stroke="#D06079"
              stroke-width="6"
              stroke-linecap="round"
              stroke-miterlimit="10"
              x1="34.4"
              y1="37.9"
              x2="95.8"
              y2="92.3"
            />
            <line
              className="path line"
              fill="none"
              stroke="#D06079"
              stroke-width="6"
              stroke-linecap="round"
              stroke-miterlimit="10"
              x1="95.8"
              y1="38"
              x2="34.4"
              y2="92.2"
            />
          </svg>
          <p>انصراف از پرداخت</p>
        </ThePage>
      </Section>
    </Layout>
  );
};

export default Page;

// start 171
// end 163
