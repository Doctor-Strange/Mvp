import * as React from "react";
import Layout from "../src/components/Layout";
import { Section } from "../src/components/row/Sections";
import NextSeo from "next-seo";
import Link from "next/link";

const guideRenter = () => {
  return (
    <Layout haveSubHeader={true} pageTitle={"Hello World"}>
      <NextSeo
        config={{
          title: `راهنمای اجاره دهنده | اتولی`,
          description: `راهنمای کامل اتولی برای اجاره‌دهنده`,
          openGraph: {
            title: `راهنمای اجاره دهنده | اتولی`,
            description: `راهنمای کامل اتولی برای اجاره‌دهنده`,
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
          <h1>راهنمای کامل اتولی برای اجاره‌دهنده</h1>
          <h2>قوانینی که باید قبل از ثبت خودرو بدانید</h2>
          <ul>
            <li>
              خودرویی که برای اجاره در اتولی قرار می‌دهید باید از نظر فنی سالم
              باشد.
            </li>
            <li>خودرو نباید بیش از اندازه کثیف باشد.</li>
            <li>
              برای اجاره خودرو باید سند ماشین یا وکالت اجاره خودرو داشته باشید.
            </li>
            <li>
              در زمان تحویل ماشین باید سند یا وکالت‌نامه اجاره خودرو را همراه
              داشته باشید.
            </li>
          </ul>
          <h2>ماشین را ثبت کنید</h2>
          <ul>
            <li>
              شما می‌توانید در اتولی به تعداد دل‌خواه ماشین برای اجاره ثبت کنید.
            </li>
            <li>در اتولی هر ماشین فقط از سمت یک شخص می‌تواند ثبت شود.</li>
            <li>
              بهتر است عکس خودرو را در زوایای مختلف درونی و بیرونی بارگذاری
              کنید.
            </li>
            <li>مشخصات خودرو را با دقت و مطابق سند وارد کنید.</li>
            <li>تاریخ‌هایی که خودرو در دسترس است را انتخاب کنید.</li>
            <li>برای جذب بیشتر مشتری، توضیحات خودرو را جذاب و کامل بنویسید.</li>
            {/* <li>
              در زمان ثبت خودرو، تمام شرایط موردنظر خود از جمله مبلغ ودیعه، مبلغ
              سفته و قوانین کنسلی رزرو را کامل شرح دهید.
            </li> */}
            <li>
              اگر خودروی شما امکانات ویژه‌ای دارد حتما در توضیحات به آن اشاره
              کنید.
            </li>
            <li>
              اعلام تخفیف در تاریخ‌های مختلف به اجاره سریع‌تر خودروی شما کمک
              خواهد کرد.
            </li>
            {/* <li>
              از آنجایی که خرید بیمه از سمت اجاره‌گیرنده هزینه خسارات را کمتر
              خواهد کرد، بهتر است برای اجاره‌گیرنده‌هایی که بیمه می‌خرند، ودیعه
              کمتری درنظر بگیرید تا شانس اجاره خودرو شما بیشتر شود.
            </li>
            <li>
              بهتر است شما شرایط اجاره خودرو را در دو حالت «با خرید بیمه» و
              «بدون خرید بیمه» شرح دهید.
            </li> */}
            <li>شما باید تعیین کنید که خودرو کجا تحویل داده می‌شود.</li>
            <li>
              در زمان ثبت خودرو، تمام شرایط موردنظر خود از جمله مبلغ ودیعه، مبلغ
              سفته و قوانین کنسلی رزرو را کامل شرح دهید.
            </li>
            <li>
              از آنجایی که خرید بیمه از سمت اجاره‌گیرنده هزینه خسارات را کمتر
              خواهد کرد، بهتر است برای اجاره‌گیرنده‌هایی که بیمه می‌خرند، ودیعه
              کمتری درنظر بگیرید تا شانس اجاره خودرو شما بیشتر شود.
            </li>
            <li>
              بهتر است شما شرایط اجاره خودرو را در دو حالت «با خرید بیمه» و
              «بدون خرید بیمه» شرح دهید.
            </li>
          </ul>
          <h2>شرایطتان را برای اجاره تعیین کنید</h2>
          <p className="TextIndenter">
            شما به عنوان اجاره‌دهنده خودرو با رعایت چند اصل ساده می‌توانید با
            خیالی راحت وسیله نقیله خود را در اختیار اجاره‌گیرنده قرار دهید.{" "}
          </p>
          <p className="TextIndenter">
            می‌توانید مدارکی به عنوان ضمانت از اجاره‌گیرنده دریافت کنید. این
            مدارک شامل قرارداد، مدارک ضمانت و شناسایی است. بهتر است از فرم
            قراردادهای ایجاد شده توسط اتولی استفاده کنید. این فرم‌ها بعد از
            تایید نهایی رزرو در اختیار شما قرار داده می‌شود. قرارداد به هر دو
            طرف این اطمینان را می‌دهد که اجاره ماشین به صورت قانونی انجام
            می‌شود.
          </p>
          <p className="TextIndenter">
            خرید بیمه توسط اجاره گیرنده می‌تواند بخش بزرگی از دغدغه‌های شما را
            رفع کند، علاوه بر آن می‌توانید به میزان مبلغ ماشینتان چک یا سفته از
            اجاره‌گیرنده درخواست کنید، البته شما می‌توانید بنا بر تصمیم خود مبلغ
            بیشتر یا کمتری را برای ضمانت درخواست کنید.
          </p>
          <p className="TextIndenter">
            همواره مبلغی را به عنوان ودیعه نقدی از اجاره گیرنده نزد خود داشته
            باشید تا در صورت بروز تصادف و خلافی بتوانید آن را جبران کنید. بعد از
            تحویل ماشین مبلغی از این ودیعه را نزد خود نگه دارید تا بتوانید خلافی
            ماشین که ممکن است در زمان اجاره ایجاد شده را، پرداخت کنید. اصولا تا
            دو هفته بعد از دریافت ماشین خلافی میزان و دلیل خلافی ماشین مشخص
            می‌شود.
          </p>
          <p className="TextIndenter">
            می‌توانید برای اطمینان بیشتر بر روی خودروی خود ردیاب ماشین نصب کنید.
            نصب ردیاب این امکان را به شما می‌دهد تا در هر زمانی خودروی خود را
            ردیابی کنید. در بخش{" "}
            <u>
              <Link href="/gps">
                <a href="">راهنمای انتخاب ردیاب</a>
              </Link>
            </u>{" "}
            ویژگی‌های یک ردیاب مناسب را شرح داده‌ایم.
          </p>
          <h2>درخواست‌های رزرو را مدیریت کنید</h2>
          <ul>
            <li>
              بعد از ثبت خودرو، درخواست‌های رزرو از سمت اجاره‌گیرندگان برای شما
              ارسال خواهد شد.
            </li>
            <li>
              لازم است بعد از ثبت خودرو در طول روز و ساعات اداری در دسترس باشید
              تا به درخواست‌ها به‌موقع پاسخ دهید.
            </li>
            <li>
              زمان پاسخگویی به درخواست‌ها از ساعت ۱۰:۳۰ صبح تا ۹ شب، حداکثر ۲
              ساعت است و برای درخواست‌های بعد از ساعت ۹ شب، تا ۱۰:۳۰ روز بعد
              فرصت پاسخگویی دارید.
            </li>
            <li>
              درصورتی که در زمان تعیین شده به درخواست‌ها پاسخ ندهید، درخواست
              رزرو کنسل خواهد شد.
            </li>
            <li>
              بعد از قبول درخواست یک رزرو، درصورت نیاز می‌توانید با اجاره‌گیرنده
              تماس بگیرید و سوالات خود را بپرسید.
            </li>
            <li>
              درصورتی که اجاره‌گیرنده بیمه خریداری کند، یک نماینده بیمه بعد از
              هماهنگی‌های لازم، از خودروی شما بازدید خواهد کرد. لازم است با
              مامور بیمه همکاری کنید.
            </li>
            <li>
              حتما لیست خودروهایتان را به‌روز نگه‌ دارید و در صورتی که خودرو در
              دسترس نیست، در صفحه کاربری‌تان، نمایش خودرو را متوقف کنید.
            </li>
            <li>
              بعد از قبول درخواست اجاره‌گیرنده، لازم است با او تماس بگیرید تا
              محل تحویل خودرو را هماهنگ کنید.
            </li>
          </ul>
          <h2>خودرو را تحویل دهید</h2>
          <ul>
            <li>خودرو را در محل تعیین شده به اجاره‌گیرنده تحویل دهید.</li>
            <li>
              اجاره‌گیرنده باید پیش از تحویل گرفتن خودرو از ماشین عکس‌برداری و
              فیلم‌برداری کند تا خودرو را همان‌طور که تحویل گرفته، تحویل دهد.
              بنابراین در این کار با اجاره‌گیرنده همراهی و همکاری لازم را داشته
              باشید.
            </li>
            <li>
              شما باید پیش از تحویل خودرو قرارداد امضا کنید و یک نسخه از قرارداد
              را به اجاره‌گیرنده تحویل دهید.
            </li>
            <li>
              شما باید گواهینامه و کارت شناسایی اجاره‌گیرنده را بررسی کنید و
              درصورت کافی نبودن یا ناقص بودن مدارک شناسایی از تحویل خودرو به او
              خودداری کنید.
            </li>
            <li>
              شما موظف هستید خودرو را تمیز و سالم به اجاره‌گیرنده تحویل دهید. در
              صورتی که خودرو تمیز یا سالم نباشد یا از توصیفات و عکس‌های منتشر
              شده دور باشد، اجاره‌گیرنده می‌تواند رزروش را کنسل کند.
            </li>
            <li>
              اتولی بعد از تحویل خودرو و کسر کمیسیون مبلغ اجاره خودرو را برای
              شما واریز خواهد کرد.
            </li>
          </ul>
          <h2>خودرو را بازتحویل بگیرید</h2>
          <ul>
            <li>در ساعت و محل توافق شده خودرو را از اجاره‌گیرنده پس بگیرید.</li>
            <li>
              در زمان تحویل خودرو بررسی‌های لازم را انجام دهید و از خودرو عکس و
              فیلم تهیه کنید.
            </li>
            <li>در صورت سلامت کامل خودرو مدارک اجاره‌گیرنده را تحویل دهید.</li>
            <li>
              می‌توانید مبلغ یک میلیون تومان از هزینه ودیعه را جهت جریمه‌های
              راهنمایی و رانندگی نزد خود نگه دارید و بعد از بررسی‌های لازم طی دو
              هفته کل یا بخشی از مبلغ را به اجاره‌گیرنده بازپس دهید.
            </li>
            <li>
              در صورت وجود هر مشکلی در طول مدت اجاره خودرو و بعد از آن با
              پشتیبانی اتولی تماس بگیرید.
            </li>
          </ul>
        </div>
      </Section>
    </Layout>
  );
};

export default guideRenter;
