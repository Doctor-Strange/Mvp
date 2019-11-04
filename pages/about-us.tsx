import * as React from "react";
import Layout from "../src/components/Layout";
import NextSeo from "next-seo";

import { Section } from "../src/components/row/Sections";

const AboutUs = () => {
  return (
    <Layout haveSubHeader={true} pageTitle={"Hello World"}>
      <NextSeo
        config={{
          title: `درباره اتولی`,
          description: `اتولی سامانه‌ای است برای اجاره خودرو به‌صورت آنلاین. با اتولی هم می‌توانید ماشین اجاره کنید و هم از اجاره ماشین خود کسب درآمد کنید.    `,
          openGraph: {
            title: `درباره اتولی`,
            description: `درباره اتولی`,
            site_name: "اتولی"
          },
          twitter: {
            handle: "@otoli_net",
            site: "@otoli_net",
            cardType: "summary_large_image"
          }
        }}
      />
      <Section justifyCenter={true}>
        <div className="AboutUsPage">
          <h1>درباره اتولی</h1>
          <p>
            اتولی، سامانه اجاره آنلاین خودرو، پل ارتباطی است بین اجاره‌دهنده و
            اجاره‌گیرنده؛ جایی که اجاره‌گیرنده می‌تواند ماشین دل‌خواهش را در هر
            زمانی از بین صدها خودروی پیشنهادی پیدا کند و اجاره‌دهنده از اجاره
            خودروی خود کسب درآمد کند. اتولی سعی دارد برای معاملات اجاره خودرو
            بستری امن فراهم کند تا اجاره‌دهنده و اجاره‌گیرنده، با اطمینان بیشتر
            ماشین اجاره دهند یا اجاره بگیرند. هدف ما این است که قیمت‌های اجاره
            خودرو شفاف‌تر شوند، خسارت‌های احتمالی کاهش پیدا کند و معاملات با
            اطمینان خاطر بیشتری انجام شوند. ما برای رسیدن به هدف‌هایمان
            فعالیتمان را از شهر تهران شروع کرده‌ایم و قصد داریم در ادامه راه با
            حمایت شما امکان اجاره آنلاین خودرو را به شهرهای دیگر ایران هم اضافه
            کنیم.
          </p>
        </div>
      </Section>
    </Layout>
  );
};

export default AboutUs;
