import * as React from "react";
import NextSeo from "next-seo";
import { Section } from "../src/components/row/Sections";
import Layout from "../src/components/Layout";
import AddCarForm from "../src/components/Forms/AddCarForm";
import { Box, Flex } from "@rebass/grid";

export default class extends React.Component<{
  t: any;
  openModal?: any;
  edit_mode: any;
  car_id: any;
}> {
  static async getInitialProps(props) {
    return {
      edit_mode: props.query.edit === "true" ? true : false,
      car_id: props.query.edit === "true" ? props.query.car_id : false
    };
  }
  state = {
    openModal: () => null
  };

  doRef = ref => {
    if (ref) {
      this.header = ref;
      this.setState({ openModal: this.header.onClick });
    }
  };

  render() {
    const { edit_mode, car_id } = this.props;
    return (
      <Layout onRef={this.doRef}>
        <NextSeo
          config={{
            title: `افزودن خودرو | اتولی`,
            description: `افزودن خودرو | اتولی`,
            openGraph: {
              title: `افزودن خودرو | اتولی`,
              description: `افزودن خودرو | اتولی`
            },
            twitter: {
              handle: "@otoli_net",
              site: "@otoli_net",
              cardType: "summary_large_image"
            }
          }}
        />
        <Section justifyCenter={true}>
          <Flex justifyContent="space-around">
            <Box width={1 / 1} px={2}>
              <AddCarForm
                edit_mode={edit_mode}
                car_id={car_id}
                openModal={this.state.openModal}
              />
            </Box>
          </Flex>
        </Section>
      </Layout>
    );
  }
}
