import * as React from "react";
import App, { Container } from "next/app";
import Router from "next/router";
import { GlobalStyle } from "../src/theme";
import "otoli-react-persian-calendar-date-picker/lib/DatePicker.css";
import { ToastContainer } from "react-toastify";
import { Provider, actions } from "../src/store";
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://5457324b508844abba775737bc14838e@sentry.io/1547488"
});

Router.events.on("routeChangeStart", url => {});

Router.events.on("hashChangeStart", url => {
  window.scrollTo(0, 0);
});

Router.events.on("routeChangeComplete", () => {
  window.scrollTo(0, 0);

  if (process.env.NODE_ENV !== "production") {
    const els = document.querySelectorAll(
      'link[href*="/_next/static/css/styles.chunk.css"]'
    );
    const timestamp = new Date().valueOf();
    els[0].href = "/_next/static/css/styles.chunk.css?v=" + timestamp;
  }
});

Router.events.on("routeChangeError", (err, url) => {
  console.error(err);
});

class OtoliApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    const server = !!ctx.req;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    // authenticate the user if he is longed in
    actions.auth();
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { props } = this as any;
    const { Component, pageProps } = props;
    return (
      // <Container>
      <>
        <GlobalStyle />
        <Provider>
          <Component {...pageProps} />
          <ToastContainer />
        </Provider>
      </>
      // </Container>
    );
  }
}

export default OtoliApp;

// Start with 121 lines of code....
// Ends with 79 lines of code...
