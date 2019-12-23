import * as React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import * as Sentry from "@sentry/browser";

process.on("unhandledRejection", err => {
  Sentry.captureException(err);
});

process.on("uncaughtException", err => {
  Sentry.captureException(err);
});

export default class extends Document<{ props: any }> {
  static async getInitialProps(...args) {
    const { req, renderPage } = args[0];
    // Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();
    const styleTags = sheet.getStyleElement();

    return { styleTags };
  }

  render() {
    return (
      <html lang="fa">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `<!-- Hotjar Tracking Code for http://otoli.net/ -->
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:1564760,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
            }}
          ></script>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-147651642-1"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'UA-147651642-1');`
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `<!-- Google Tag Manager -->
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TN3MV4L');
        <!-- End Google Tag Manager -->`
            }}
          ></script>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0"
          />
          <link rel="apple-touch-icon" href="/static/icon.png" />
          <meta name="apple-mobile-web-app-title" content="Otoli Alpha!" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="format-detection"
            content="telephone=no, address=no, email=no"
          />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link
            rel="mask-icon"
            href="/static/safari-pinned-tab.svg"
            color="#4ba3ce"
          />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="google-site-verification"
            content="gFOWi46Gsw04kYqo8vIxO1JUlm0KUJjBzDpQRA9Bnto"
          />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.find,Array.prototype.includes,String.prototype.includes,Array.prototype.findIndex,Object.entries" />
          {this.props.styleTags}
        </Head>
        <body>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TN3MV4L"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
          <div id="page">
            <Main />
          </div>
          <NextScript />
        </body>
      </html>
    );
  }
}

// starts with 214
// Ends with 114
