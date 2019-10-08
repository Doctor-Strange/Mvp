import * as React from 'react';
import Layout from "../src/components/Layout";
import { Section } from "../src/components/row/Sections";

const guidePicture = () => {
    return (
        <Layout haveSubHeader={true} pageTitle={"Hello World"}>
            <Section justifyCenter={true} >
                <div className="AboutUsPage">

                    <h1>
                        راهنمای عکاسی برای ثبت خودرو در اتولی
                </h1>
                    <p>
                        از آنجایی که عکس‌ها به اجاره سریع‌تر خودروی شما کمک می‎کنند، بهتر است برای تهیه عکس‌ها زمان بگذارید. همچنین در صورت تمایل و تماس با پشتیبانی اتولی، می‌توانید از عکاسان اتولی برای تهیه عکس از خودروتان استفاده کنید.
                </p>
                    <h2>چطور از خودرو عکاسی کنیم؟
</h2>
                    <ul>
                        <li>پیش از عکاسی از کافی بودن نور مطمئن شوید. سعی کنید عکس را در محیط خارجی و در روز تهیه کنید.</li>
                        <li>عکس‌ها با فاصله مناسب از خودرو و کادربندی خوب گرفته شوند. </li>
                        <li>از زاویه‌های مختلف خودرو عکس تهیه کنید.</li>
                        <li>به‌جز زوایای بیرونی ماشین، از درون خودرو هم عکاسی کنید.</li>
                        <li>در زمان عکاسی مطمئن باشید که خودرو تمیز است.</li>
                        <li>برای امنیت بیشتر، پلاک خودرو را در زمان عکاسی با یک کاغذ یا مقوا بپوشانید.</li>
                        <li>عکس‌ها باید در اندازه 16 در 9 و عکاسی و بارگذاری شوند.</li>
                        <li>از دوربین با کیفیت برای عکاسی استفاده کنید؛ برای مثال گوشی‌های هوشمند با دوربین قوی یا یک دوربین دیجیتال خوب.</li>

                    </ul>
                    <h2>چطور از خودرو عکاسی نکنیم؟
</h2>
                    <ul>
                        <li>برروی عکس‌ها نوشته یا خط خوردگی نچسبانید.</li>
                        <li>عکس‌ها را از نظر رنگی فوتوشاپ نکنید و بررویشان فیلتر رنگی نگذارید.</li>
                        <li>بهتر است فرد یا افراد دیگری در تصویر حضور نداشته باشند.</li>
                        <li>برای حفظ مسائل امنیتی بهتر است خانه یا محل کار شما در پشت خودرو وجود نداشته باشد.</li>
                        <li>عکس‌های متنوع تهیه کنید و اگر چند ماشین با یک مدل و رنگ دارید، از عکس‌های مشابه برای ثبت خودرو استفاده نکنید.</li>
                        <li>لوگو و نشانی از شرکت‌ها و کسب‌وکارهای دیگر را روی تصویر نچسبانید.</li>
                        <li>اگر خودرو حاوی نشان یا نوشته‌ای خلاف عرف و قوانین است، پیش از عکاسی آن را پاک کنید. در صورت بارگذاری تصویر با این نشانه‌ها، اتولی حق پیگیری و مسدودکردن حساب شما را دارد.</li>

                    </ul>
                </div>
            </Section>
        </Layout>
    );
}


export default guidePicture;

