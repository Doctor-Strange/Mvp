import * as React from "react";
import {useState, useEffect } from "react";
import styled from "styled-components";
import { Section } from "../src/components/row/Sections";
import IndexForm from "../src/components/Forms/IndexForm";
import Layout from "../src/components/Layout";
import { Box, Flex } from "@rebass/grid";
import * as backgroundImage from "../static/back.jpg";
import * as seoImage from "../static/index-landing.jpg";
import NextSeo from "next-seo";
import { i18n, Link, withTranslation } from "../src/i18n";
import insurance from "../static/SamanInsurance.png";
import Router from 'next/router';
import { GlobalStyle } from "../src/theme";
import TabCreator from '../src/components/TabCreator/TabCreator.js'

const Page = props => {
  const [heightSetter, SetHeight] = useState(false)
  // <Layout haveSubHeader={true} pageTitle={'Hello World'} bgImage={backgroundImage}>
  useEffect(()=>{
    console.log(`https://otoli.net${seoImage}`);
    
      if(window.innerHeight <= 666){
        SetHeight(true)
      }
  },[])
  return (
    <Layout haveSubHeader={true} pageTitle={"Hello World"}>
      {/* {console.log(`https://otoli.net/${seoImage}`)} */}
      <NextSeo
        config={{
          title: `اتولی | اجاره آسان خودرو`,
          description: `اتولی سامانه‌ای است برای اجاره خودرو به‌صورت آنلاین. با اتولی هم می‌توانید ماشین اجاره کنید و هم از اجاره ماشین خود کسب درآمد کنید.    `,
          canonical: "https://otoli.net/",
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
        className={["heightControl" ,heightSetter && "SmallHeightControllerinHomepage"].join(" ")}
      >
        <div className="hero_single version_4">
          <Flex justifyContent="space-around" className="wrapper">
            <Box width={2 / 2} px={2}>
              <h1>اتولی، اجاره آسان خودرو</h1>
              <h2>
                ماشینی که دوست دارید را پیدا کنید و با خیال راحت اجاره کنید.
              </h2>
              <IndexForm t={props.t} />
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
                با خیال راحت کسب درآمد کنید. بیمه اجاره خودرو بابت خسارت‌های
                احتمالی به شما اطمینان خاطر خواهد داد.
              </p>
            </section>
          </div>
          <div className="addCarnow">
            <Link href="/add-car">
              <a>ماشین‌تان را اضافه کنید</a>
            </Link>
            <Link href="/join-us">
              <a style={{
                    background: 'none',
                    color: '#4ba3ce',
                    fontWeight: '400',
              }}>تخمین درآمد ماهیانه</a>
            </Link>
          </div>
        </section>
        <section className="responsive WHITE whyOtoli" 
        style={{
          marginBottom:"20px",
          paddingBottom:"50px"

        }}>
          <h2>چرا از اتولی ماشین اجاره کنیم؟</h2>
          <div className="WhyOtolicontainer">
            <section className="WhyOtolibox">
              <h3>تضمین بیمه</h3>
              <p>
                با بیمه اجاره خودرو با خیال راحت رانندگی کنید. با اینکه مراقبت
                از خودروی اجاره‌ای اولین وظیفه شماست، اما در صورت خرابی، تصادف و
                مشکلات اینچنینی بیمه جبران خسارت خواهد کرد.
              </p>
            </section>
            <section className="WhyOtolibox">
              <h3>تنوع در انتخاب</h3>
              <p>
                شما فقط تاریخ و شهر مورد نظرتان را انتخاب کنید و به لیست مدل‌های
                متنوع ماشین دست پیدا کنید. انتخاب از بین گزینه‌های مختلف، قیمت،
                مدل و شرایط متنوعی را هم به‌دنبال خواهد داشت.
              </p>
            </section>
            <section className="WhyOtolibox">
              <h3>پشتیبانی 24 ساعته</h3>
              <p>
                شما فقط تماس بگیرید. در هر ساعتی از شبانه‌روز، اتولی برای حل
                مشکلات احتمالی آماده پاسخ‌گویی است و در شرایط اضطراری کنار شما
                خواهد بود
              </p>
            </section>
          </div>
        </section>
       
      </div>
          <TabCreator data_arr={[
            {
              title:"شهرها",
              links:[
              {title:'اجاره ماشین در اهواز',
              link:'https://otoli.net/rent/ahvaz'},
              {title:'اجاره ماشین در بندر انزلی',
              link:'https://otoli.net/rent/Bandar-Anzali'},
              {title:'اجاره ماشین در اصفهان',
              link:'https://otoli.net/rent/isfahan'},
              {title:'اجاره ماشین در چالوس',
              link:'https://otoli.net/rent/Chalus'},
              {title:'اجاره ماشین در تهران',
              link:'https://otoli.net/rent/tehran'},
              {title:'اجاره ماشین در کرمان',
              link:'https://otoli.net/rent/kerman'},
              {title:'اجاره ماشین در کرمانشاه',
              link:'https://otoli.net/rent/Kermanshah'},
              {title:'اجاره ماشین در مشهد',
              link:'https://otoli.net/rent/mashhad'},
              {title:'اجاره ماشین در کیش',
              link:'https://otoli.net/rent/kish'},
              {title:'اجاره ماشن در قشم',
              link:'https://otoli.net/rent/Qeshm'},
              {title:'اجاره ماشین در رامسر',
              link:'https://otoli.net/rent/ramsar'},
              {title:'اجاره ماشین در رشت',
              link:'https://otoli.net/rent/rasht'},
              {title:'اجاره ماشین در شیراز',
              link:'https://otoli.net/rent/shiraz'},
              {title:'اجاره ماشین در تبریز',
              link:'https://otoli.net/rent/tabriz'},
              {title:'اجاره ماشین در یزد',
              link:'https://otoli.net/rent/yazd'},
              {title:'اجاره ماشین در فرودگاه مهرآباد تهران',
              link:'https://otoli.net/rent/Mehrabad-Airport-Car-Rental'},
              {title:'اجاره ماشین در فرودگاه امام خمینی',
              link:'https://otoli.net/rent/Car-rental-at-Tehran-Imam-Khomeini-Airport'},
              ]
            },
            {
              title:"برندها",
              links:[
{title:"اجاره 206",link:"https://otoli.net/rent/206"},
{title:"اجاره ماشین سراتو",link:"https://otoli.net/rent/cerato"},
{title:"اجاره بنز",link:"https://otoli.net/rent/benz"},
{title:"اجاره بی ام وی",link:"https://otoli.net/rent/bmw"},
{title:"اجاره ماشین هیوندای",link:"https://otoli.net/rent/hyundai"},
{title:"اجاره کیا",link:"https://otoli.net/rent/kia"},
{title:"اجاره مازراتی",link:"https://otoli.net/rent/maserati"},
{title:"لیست اجاره ماشین مزدا",link:"https://otoli.net/rent/Mazda"},
{title:"اجاره پورشه ",link:"https://otoli.net/rent/porsche"},
{title:"اجاره رنو",link:"https://otoli.net/rent/Renault"},
{title:"اجاره تویوتا ",link:"https://otoli.net/rent/toyota"},
{title:"اجاره وانت ",link:"https://otoli.net/rent/Pickup"},
{title:"اجاره ون",link:"https://otoli.net/rent/van"}
]
            },
            {
              title:"دسته‌بندی",
              links:[
                {title:"همه ماشین های لوکس تهران اینجاست",
              link:"https://otoli.net/rent/luxury-tehran"},
                {title:"اجاره ماشین عروس",
              link:"https://otoli.net/rent/Bride-car-rental"}, 
                {title:"اجاره ماشین برای مسافرت",
              link:"https://otoli.net/rent/Car-rental-for-travel"},
                {title:"اجاره ماشین با راننده",
              link:"https://otoli.net/rent/Car-rental-with-driver"},
                {title:"اجاره ماشین کلاسیک",
              link:"https://otoli.net/rent/Classic"},
                {title:"اجاره ماشین برای کویر",
              link:"https://otoli.net/rent/desert"}, 
                {title:"اجاره ماشن بدون راننده",
              link:"https://otoli.net/rent/Rent-a-car-without-a-driver"}
              ]
            }
          ]}></TabCreator>
    </Layout>
  );
};

Page.getInitialProps = async props => {
  return {
    namespacesRequired: ["common"]
  };
};

export default withTranslation("common")(Page);
