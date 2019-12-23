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

// Router.events.on("routeChangeStart", url => {});

Router.events.on("hashChangeStart", url => {
  window.scrollTo(0, 0);
});

Router.events.on("routeChangeComplete", () => {
  window.scrollTo(0, 0);
});

Router.events.on("routeChangeError", (err, url) => {
  console.error("_app -> routeChangeError", err);
});

class OtoliApp extends App {
  componentDidMount() {
    // authenticate the user if he is longed in
    actions.auth();
  }

  render() {
    const { props } = this as any;
    const { Component } = props;
    return (
      <Container>
        <GlobalStyle />
        <Provider>
          <Component />
          <ToastContainer />
        </Provider>
      </Container>
    );
  }
}

export default OtoliApp;

// Start with 121 lines of code....
// Ends with 47 lines of code...
