import * as React from 'react';
import styled from 'styled-components';
import { Section } from '../src/components/row/Sections';
import IndexForm from '../src/components/Forms/IndexForm';
import Layout from '../src/components/Layout';
import { Box, Flex } from '@rebass/grid';
import * as backgroundImage from '../static/back.jpg';
import * as seoImage from '../static/index-landing.jpg';
import NextSeo from 'next-seo';
import { i18n, Link, withTranslation } from '../src/i18n';
import insurance from '../static/SamanInsurance.png'

const Page = props => (
  // <Layout haveSubHeader={true} pageTitle={'Hello World'} bgImage={backgroundImage}>
  <Layout haveSubHeader={true} pageTitle={'Hello World'}>
    {/* {console.log(`https://otoli.net/${seoImage}`)} */}
     <NextSeo
        config={{
            title: `اتولی | اجاره آسان خودرو`,
            description: `اجاره خودرو`,
            openGraph: {
                title: `اتولی | اجاره آسان خودرو`,
                description: `اجاره خودرو`,
                images: [
                  { url: `https://otoli.net${seoImage}` },
                ],
                site_name: 'اتولی',
            },
            twitter: {
                handle: '@otoli_net',
                site: '@otoli_net',
                cardType: 'summary_large_image',
            },
        }}
    />
    <Section justifyCenter={true} Bimage={backgroundImage} IHeight="90vh">
      <div className="hero_single version_4">
        <Flex justifyContent="space-around" className="wrapper">
          <Box width={2 / 2} px={2}>
            <h3>اتولی | اجاره آسان خودرو</h3>
            <p>
              ماشینی که دوست دارید رو پیدا کنید و در سریع‌ترین زمان اجاره کنید
            </p>
            <IndexForm t={props.t} />
          </Box>
        </Flex>
      </div>
    </Section>
    
    <div style={{background:"#fff"}} >

    <section className="insurance responsive">
      <div>
        <div className="insuranceBox">
          <p>با همکاری </p>
          <img src={insurance} alt ="تصویر بیمه سامان" />
         </div>
         <div>
           <h2>اتولی چه کار می‌کند؟</h2>
           <p>اتولی، سیستم اجاره خودرو به صورت آنلاین، پل ارتباطی است میان اجاره‌دهنده و اجاره‌گیرنده خودرو. از طریق اتولی می‌توانید در هر تاریخی و از بین لیست خودروهای موجود، ماشین مورد نظرتان را اجاره کنید. همچنین سیستم ثبت خودرو جهت اجاره به شما این امکان را می‌دهد که از اجاره‌دادن ماشین خود کسب درآمد کنید.</p>
         </div>
      </div>
    </section>
    <section className="responsive WHITE whyOtoli">
      <h2>
      چرا از اتولی ماشین اجاره کنیم؟
      </h2>
      <div className="WhyOtolicontainer">
        <section className="WhyOtolibox">
          <h3>تضمین بیمه</h3>
          <p>با بیمه خودرو اتولی با خیال راحت رانندگی کنید. بیمه تا .... تومان هزینه خرابی و تصادفات را پرداخت خواهد کرد. با اینکه مراقبت از خودروی اجاره‌ای اولین وظیفه شماست، اما در صورت خرابی، تصادف و مشکلات اینچنینی بیمه جبران خسارت خواهد کرد.</p>
        </section>
        <section className="WhyOtolibox">
          <h3>تنوع در انتخاب</h3>
          <p>
          شما فقط تاریخ و شهر مورد نظرتان را انتخاب کنید و به لیست مدل‌های متنوع ماشین دست پیدا کنید. انتخاب از بین گزینه‌های مختلف، قیمت، مدل و شرایط متنوعی را هم به‌دنبال خواهد داشت.</p>
          </section>
          <section className="WhyOtolibox">
          <h3>پشتیبانی 24 ساعته</h3>
          <p>
          شما فقط تماس بگیرید. در هر ساعتی از شبانه‌روز، اتولی برای حل مشکلات احتمالی آماده پاسخ‌گویی است و در شرایط اضطراری کنار شما خواهد بود
          </p>
          </section> 
      </div>
    </section>
    <section className="responsive WHITE whyOtoli">
      <h2>
      چرا در اتولی ماشین اجاره دهیم؟
      </h2>
      <div className="WhyOtolicontainer">
        <section className="WhyOtolibox">
          <h3>کسب درآمد</h3>
          <p> اطلاعات ماشین‌تان را در اتولی ثبت کنید و منتظر بمانید! با اتولی می‌توانید از اجاره ماشین‌تان درآمد روزانه داشته باشید. فقط کافی‌ست اطلاعات خودرو را درست و دقیق وارد کنید و تصاویر خوب و باکیفیت برای ماشین‌تان انتخاب کنید.</p>
        </section>
        <section className="WhyOtolibox">
          <h3>با شرایط شما</h3>
          <p>
          رایگان و با شرایط مورد نظر خود، ماشین‌تان را در اتولی ثبت کنید. اجاره خودرو به تعداد روزهای تعیین شده از سمت شما، در تاریخ‌های مدنظر شما، قیمت انتخابی شما و با بررسی کامل شخص اجاره‌گیرنده از طرف شما انجام خواهد شد.
</p>
          </section>
          <section className="WhyOtolibox">
          <h3>تضمین بیمه
</h3>
          <p>با خیال راحت کسب درآمد کنید. بیمه خودرو اتولی بابت خسارت‌های احتمالی به شما اطمینان خاطر خواهد داد. این بیمه شامل مواردی همچون تصادف، سرقت و ... خواهد شد و تا .... مبلغ را پوشش می‌دهد.

          </p>
          </section> 
      </div>
    </section>
    <div className="addCarnow">
        <Link href="/add-car">
          <a>ماشین‌تان را اضافه کنید</a>
        </Link>
      </div>
    </div>

  </Layout>
)

Page.getInitialProps = async (props) => {
  return {
      namespacesRequired: ['common']
  };
}

export default withTranslation('common')(Page);
