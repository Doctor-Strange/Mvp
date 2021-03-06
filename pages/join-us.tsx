import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Section } from "../src/components/row/Sections";
import IndexForm from "../src/components/Forms/IndexForm";
import Layout from "../src/components/Layout";
import { Box, Flex } from "@rebass/grid";
import * as backgroundImage from "../static/parking.jpg";
import * as seoImage from "../static/index-landing.jpg";
import NextSeo from "next-seo";
import { i18n, Link, withTranslation } from "../src/i18n";
import insurance from "../static/SamanInsurance.png";
import Router from "next/router";
import { GlobalStyle } from "../src/theme";
import Calculator from "../src/components/Forms/Calculator";

const Page = props => {
  const [heightSetter, SetHeight] = useState(false);
  // <Layout haveSubHeader={true} pageTitle={'Hello World'} bgImage={backgroundImage}>
  useEffect(() => {
    // console.log(`https://otoli.net${seoImage}`);
    if(Router.query.utm_source){
      localStorage['utm_source'] = Router.query.utm_source
      localStorage['utm_medium'] = Router.query.utm_medium
      localStorage['utm_campaign'] = Router.query.utm_campaign
      localStorage['utm_term'] = Router.query.utm_term
      localStorage['utm_content'] = Router.query.utm_content
      localStorage['utm_landing_url'] = "https://otoli.net/join-us"

    }
    // if (window.innerHeight <= 666) {
    //   SetHeight(true);
    // }
  }, []);
  return (
    <Layout haveSubHeader={true} pageTitle={"Hello World"}>
      {/* {console.log(`https://otoli.net/${seoImage}`)} */}
      <NextSeo
        config={{
          title: `اتولی | اجاره آسان خودرو`,
          description: `اتولی سامانه‌ای است برای اجاره خودرو به‌صورت آنلاین. با اتولی هم می‌توانید ماشین اجاره کنید و هم از اجاره ماشین خود کسب درآمد کنید.    `,
          openGraph: {
            title: `اتولی | اجاره آسان خودرو`,
            description: `اتولی سامانه‌ای است برای اجاره خودرو به‌صورت آنلاین. با اتولی هم می‌توانید ماشین اجاره کنید و هم از اجاره ماشین خود کسب درآمد کنید.    `,
            images: [{ url: `https://otoli.net${seoImage}` }],
            site_name: "اتولی"
          },
          twitter: {
            handle: "@otoli_net",
            site: "@otoli_net",
            cardType: "summary_large_image"
          }
        }}
      />
      <Section
        justifyCenter={true}
        Bimage={backgroundImage}
        className="BannerboxinJoinUsPage"
        //   heightSetter && "SmallHeightControllerinHomepageLanding"
        // ].join(" ")}
      >
        <div className="hero_single">
          <Flex justifyContent="space-around" className="landingWrapper">
            <Box width={2 / 2} px={2}>
              <h1 style={{textShadow:"1px 1px 2px #000"}}>اتولی، برای اوقات فراغت ماشین شما</h1>
              <h2 style={{textShadow:"1px 1px 2px #000"}}>
              به راحتی خودروتان را در اتولی کوتاه مدت اجاره بدهید و درآمد کسب کنید
              </h2>
              <Calculator />
            </Box>
          </Flex>
        </div>
      </Section>

      <div style={{ background: "#fafafa" }}>
        <section className="insurance responsive">
          <div>
            <div className="insuranceBox">
              <p>با همکاری </p>
              <img src={insurance} alt="تصویر بیمه سامان" />
            </div>
            <div>
              <h2>اتولی چه کار می‌کند؟</h2>
              <p>
                اتولی، سیستم اجاره خودرو به صورت آنلاین، پل ارتباطی است میان
                اجاره‌دهنده و اجاره‌گیرنده خودرو. از طریق اتولی می‌توانید در هر
                تاریخی و از بین لیست خودروهای موجود، ماشین مورد نظرتان را اجاره
                کنید. همچنین سیستم ثبت خودرو جهت اجاره به شما این امکان را
                می‌دهد که از اجاره‌دادن ماشین خود کسب درآمد کنید.
              </p>
            </div>
          </div>
        </section>
        <section className="responsive WHITE whyOtoli">
          <h2>چرا در اتولی ماشین اجاره دهیم؟</h2>
          <div className="WhyOtolicontainer">
            <section className="WhyOtolibox">
              <h3>کسب درآمد</h3>
              <p>
                {" "}
                اطلاعات ماشین‌تان را در اتولی ثبت کنید و منتظر بمانید! با اتولی
                می‌توانید از اجاره ماشین‌تان درآمد روزانه داشته باشید. فقط
                کافی‌ست اطلاعات خودرو را درست و دقیق وارد کنید و تصاویر خوب و
                باکیفیت برای ماشین‌تان انتخاب کنید.
              </p>
            </section>
            <section className="WhyOtolibox">
              <h3>با شرایط شما</h3>
              <p>
                رایگان و با شرایط مورد نظر خود، ماشین‌تان را در اتولی ثبت کنید.
                اجاره خودرو به تعداد روزهای تعیین شده از سمت شما، در تاریخ‌های
                مدنظر شما، قیمت انتخابی شما و با بررسی کامل شخص اجاره‌گیرنده از
                طرف شما انجام خواهد شد.
              </p>
            </section>
            <section className="WhyOtolibox">
              <h3>تضمین بیمه</h3>
              <p>
              علاوه بر تضمین‌های معمول مانند چک، سفته و ودیعه نقدی که هنگام اجاره خودرو از اجاره گیرنده اخذ می‌شود اتولی با همکاری بیمه سامان این امکان را فراهم کرده که با خیال راحت‌ از ماشین‌تان کسب درآمد کنید. بیمه اجاره خودرو، خسارت‌های احتمالی از قبیل سرقت و تصادف را پوشش می‌دهد.
              </p>
            </section>
          </div>
          <div className="addCarnow">
            <Link href="/add-car">
              <a className="addCar_bottom_joinus_a">ماشین‌تان را اضافه کنید</a>
            </Link>
            <p style={{ textAlign: "center", marginTop: "16px", direction: "rtl" }}>
              سوالی دارید؟ با ما تماس بگیرید:‌{' '}
              <a className="TellPhone" href="tel:02188567759"> ۰۲۱۸۸۵۶۷۷۵۹ </a>
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

Page.getInitialProps = async props => {
  return {
    namespacesRequired: ["common"]
  };
};

export default withTranslation("common")(Page);
