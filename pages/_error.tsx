import * as React from "react";
import NextSeo from "next-seo";
import Link from "next/link";
import Layout from "../src/components/Layout";
import four04 from "../static/404.png";

class Error extends React.Component {
  render() {
    return (
      <Layout>
        <NextSeo
          config={{
            title: `صفحه مورد نظر پیدا نشد. | اتولی`,
            description: `صفحه مورد نظر پیدا نشد. | اتولی`,
            openGraph: {
              title: `صفحه مورد نظر پیدا نشد. | اتولی`,
              description: `صفحه مورد نظر پیدا نشد. | اتولی`
            },
            twitter: {
              handle: "@otoli_net",
              site: "@otoli_net",
              cardType: "summary_large_image"
            }
          }}
        />
        <div>
          <img src={four04} alt="404" className="_404PageImage" />
          <Link href={process.env.SITE_URL}>
            <a className="_404PageAnchor">بازگشت به صفحه اصلی</a>
          </Link>
        </div>
      </Layout>
    );
  }
}

export default Error;

// start => 50
// end => 35
