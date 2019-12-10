import React, { Component } from "react";
import NextSeo from "next-seo";
import Layout from "../src/components/Layout";
import { Section } from "../src/components/row/Sections";

import { REQUEST_getLanding } from "../src/API";

class Rent extends Component {
  // static async getInitialProps(props) {
  //   let res;
  //   // if (props.query.id)
  //   res = await REQUEST_getLanding({
  //     name: props.query.name
  //   });
  //   return {
  //     namespacesRequired: ["common"],
  //     unique_id: props.query.name,
  //     ...res
  //   };
  // }

  static async getInitialProps(props) {
    if (typeof window === "undefined") {
      // console.log('Server Side Router Query', props.query);
    } else {
      // console.log('Client side Router Query', props.query);
    }
    let res;
    // if (props.query.id)
    res = await REQUEST_getLanding({
      name: props.query.name
    });
    return {
      namespacesRequired: ["common"],
      unique_id: props.query.name,
      ...res
    };
  }

  componentDidMount = () => {
    window.document.title = "sest"
    console.log(this.props);
  };

  render() {
    const {title} = this.props
    return (
      <Layout haveSubHeader={true} pageTitle={"Hello World"}>
        {/* <NextSeo
          config={{
            title: title,
            description: `اجاره خودرو`,
            openGraph: {
              title: `اجاره خودرو`,
              description: `اجاره خودرو`
            },
            twitter: {
              handle: "@otoli_net",
              site: "@otoli_net",
              cardType: "summary_large_image"
            }
          }}
        /> */}
        <Section justifyCenter={true}>
          <p>test</p>
        </Section>
      </Layout>
    );
  }
}

export default Rent;
