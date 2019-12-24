import * as React from "react";

import { Section } from "../src/components/row/Sections";
import Layout from "../src/components/Layout";
import CompleteRegisterForm from "../src/components/Forms/CompleteRegisterForm";
import { Box, Flex } from "@rebass/grid";
import { withRouter } from "next/router";

export default withRouter(
  class extends React.Component<{ t: any; router: any }> {
    render() {
      const { t, router } = this.props;
      return (
        <Layout>
          <Section justifyCenter={true}>
            <Flex justifyContent="space-around" style={{ width: "675px" }}>
              <Box width={1 / 1} px={2}>
                <CompleteRegisterForm
                  strings={{
                    $required_fields: "فیلدهای ضروری",
                    $firstname: "نام",
                    $lastname: "نام خانوادگی",
                    $national_id: "کد ملی",
                    $phone_number: "شماره موبایل",
                    $day: "روز",
                    $month: "ماه",
                    $year: "سال",
                    $year_hint: " (مثال: 1364)",
                    $email: "ایمیل (اختیاری)",
                    $password: "رمز عبور",
                    $subscribe_checkbox: "با ارسال ایمیل به من موافقم",
                    $signup: "ثبت‌ نام",
                    $new_client: "تکمیل اطلاعات",
                    $agreement_sentence:
                      "با ثبت‌نام در اتولی شما با قوانین و شرایط‌استفاده موافقت می‌کنید",
                    $birthdate: "تاریخ تولد"
                  }}
                  query={router.query}
                />
              </Box>
            </Flex>
          </Section>
        </Layout>
      );
    }
  }
);

// start 54
// end 47
