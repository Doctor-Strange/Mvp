import * as React from "react";
import { useState, useEffect } from "react";
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
import Router from "next/router";
import { GlobalStyle } from "../src/theme";

const Rent = props => {
  const [heightSetter, SetHeight] = useState(false);
  // <Layout haveSubHeader={true} pageTitle={'Hello World'} bgImage={backgroundImage}>
  useEffect(() => {
    if (window.innerHeight <= 666) {
      SetHeight(true);
    }
  }, []);
  return (
    <Layout haveSubHeader={true} pageTitle={"Hello World"}>
      {/* {console.log(`https://otoli.net/${seoImage}`)} */}
      <NextSeo
        config={{
          title: `اجاره ماشین، اجاره خودرو، لیست قیمت کرایه ماشین | اتولی`,
          description: `در اتولی می‌توانید انواع خودرو را ارزان اجاره کنید و یا ماشین خود را کرایه و رنت دهید.`,
          openGraph: {
            title: `اجاره ماشین، اجاره خودرو، لیست قیمت کرایه ماشین | اتولی`,
            description: `در اتولی می‌توانید انواع خودرو را ارزان اجاره کنید و یا ماشین خود را کرایه و رنت دهید.`,
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
        className={[
          "heightControl",
          heightSetter && "SmallHeightControllerinHomepage"
        ].join(" ")}
      >
        <div className="hero_single version_4">
          <Flex justifyContent="space-around" className="wrapper">
            <Box width={2 / 2} px={2}>
              <h1
                onClick={() => {
                  // console.log(`/rent/'اجاره-اتومبیل'`);
                  // return
                  Router.push({
                    pathname: `/rent/${decodeURIComponent(
                      "اجاره-اتومبیل-در-تهران"
                    )}`
                  });
                }}
              >
                لیست قیمت اجاره ماشین در اتولی
              </h1>
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
          </div>
          <div
            dir="rtl"
            style={{
              background: "#fff",
              // paddingBottom: "50px",
              marginBottom: "20px",
              marginTop: "50px"
            }}
          >
            <h2 style={{ textAlign: "right" }}>اجاره ماشین</h2>
            <p>
              تردد داخل شهری و بین‌شهری هم می‌تواند به کمک وسایل حمل و نقل عمومی
              و هم با ماشین شخصی صورت گیرد. اما اجاره ماشین پدیده‌ای تازه است که
              در بسیاری از شهرهای بزرگ و کوچک ایران رایج شده‌ است.
            </p>
            <p>
              اجاره ماشین مزایای دوجانبه‌ای برای اجاره‌دهنده و اجاره‌گیرنده به
              وجود آورده‌ است. از آنجایی که تردد در شهرهای بزرگ به کمک وسایل حمل
              و نقل عمومی نیازمند صرف زمان زیادی برای رسیدن به مقصد است و همچنین
              ترافیک خود عامل مهمی در اتلاف وقت است، ماشین شخصی در بسیاری موارد
              می‌تواند راهگشای مناسبی باشد. از طرفی اجاره خودرو باعث می‌شود تا
              نگرانی بابت هزینه‌های تعمیر و نگهداری، پرداخت بیمه و دیگر
              هزینه‌های جانبی وجود نداشته باشد.
            </p>
            <p>
              شما به عنوان اجاره‌گیرنده می‌توانید بدون پرداخت هزینه‌ای بابت
              خریداری خودرو، از چند ساعت تا چند روز، برای انجام کارهای روزمره،
              برگزاری مراسم‌های خاص، گشت درون شهری یا سفر بدون دغدغه از زمان خود
              لذت ببرید. اجاره ماشین این امتیاز را به شما می‌دهد تا با توجه به
              بودجه معین‌شده، ماشین مورد نظر خود را برای مدت معین در اختیار
              داشته باشید.
            </p>
            <p>
              <strong>
                علاوه بر موارد اشاره شده، اجاره ماشین مزایای زیر را در بردارد:
              </strong>
            </p>
            <p>
              کرایه ماشین سفری بدون دغدغه را به شما هدیه می‌دهد، زیرا با
              دراختیار داشتن ماشین اجاره‌ای دیگر لازم نیست نگران برنامه زمانی
              وسایل نقلیه عمومی، تغییر برنامه، اتلاف وقت تا رسیدن اتوبوس یا قطار
              به ایستگاه مورد نظر یا همراه شدن با افراد ناشناس باشید.
            </p>
            <p>
              اجاره ماشین همچنین باعث می‌شود تا در هزینه‌های سفر خود صرفه‌جویی
              کنید، زمان کمتری را برای رسیدن به مقصد بعدی در نظر بگیرید، به این
              ترتیب می‌توانید در طول سفر خود از جاذبه‌های بیشتری بازدید کنید.
            </p>
            <p>
              حتی اگر دارای ماشین شخصی هستید، می‌توانید با یک انتخاب هوشمندانه
              ماشین مناسبی برای سفر خود اجاره کنید. به این ترتیب، علاوه بر آنکه
              از استهلاک خودروی خود جلوگیری می‌کنید، می‌توانید ماشینی را انتخاب
              کنید که به نسبت ماشین خود دارای مصرف سوخت بهینه‌تر یا به عبارتی
              کمتر است و یا فضای بیشتری برای سرنشینان و چمدانها دارد.
            </p>
            <p>
              اجاره ماشین درون شهر به شما این امکان را می‌دهد که بدون نگرانی از
              نبود تاکسی و یا دیر رسیدن به ایستگاه مورد نظر، یک روز عالی کاری را
              فارغ از صف‌های طولانی اتوبوس و تاکسی و یا انتظار برای قبول درخواست
              شما از سوی سامانه‌های آنلاین رزرو تاکسی را داشته باشید.
            </p>
            <p>
              فارغ از بودجه‌ای که برای مراسم عروسی خود در نظر گرفته‌اید، شما
              می‌توانید ماشین ایده‌آل خود را برای یک شب رویارویی اجاره کنید.
              فراموش نکنید که تنها قرار است هزینه رنت ماشین را پرداخت کنید و نه
              هزینه خرید آن را.
            </p>
            <p>
              هر یک از موارد فوق می‌تواند دلیل خوبی برای اجاره ماشین باشد، که
              اجاره ماشین از سامانه اتولی به شما این اطمینان را می‌دهد که ماشین
              به دلخواه خود را برای مدت معین با رعایت قوانین و مقررات مشخص شده،
              در اختیار داشته باشید و از آن لذت ببرید.{" "}
            </p>
          </div>
          <div className="URLsInRent">
            <ul>
              <li>
                <a href="https://otoli.net/rent/206">اجاره ۲۰۶</a>
              </li>
              <li>
                <a href="https://otoli.net/rent/tehran">اجاره ماشین در تهران</a>
              </li>
              <li>
                <a href="https://otoli.net/rent/luxury-tehran">
                  همهٔ ماشین‌های لوکس تهران اینجاست
                </a>
              </li>
              <li>
                <a href="https://otoli.net/rent/benz">اجاره بنز</a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Rent;
