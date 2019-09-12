import * as React from 'react';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import { Button, Form, Input } from 'formik-semantic-ui';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Countdown from 'react-countdown-now';
import { ModalWrapper } from './ModalWrapper';
import { PanelsWrapper } from '../Carousel/PanelsWrapper';
import { Panel } from '../Carousel/Panel';
// import { mobileNumberOptions } from '../../constants/options';
import { i18n, withTranslation } from '../../i18n';
import { ltrTheme, rtlTheme } from '../../theme/Directions';
import { actions } from "../../store";
import styled from 'styled-components';

const LawDiv= styled.div`
  label{
    display:block;
    text-align:right;
    font-size:18px;
  }
  p{
    direction: rtl;
    height: 235px;
    overflow-y: scroll;
    padding: 10px;
    text-align: justify;
    margin: 10px 0;
  }
`; 

function convertToEnglishNum(s) {
  const a = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const p = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  for (let i = 0; i < 10; i++) {
    s = s.replace(new RegExp(a[i], 'g'), i).replace(new RegExp(p[i], 'g'), i);
  }
  return s;
}
interface LoginModalValues {
  phone: number;
}

interface LoginModalCodeValues {
  code: number;
}

export default withTranslation('common')(
  class extends React.Component<
    { onRef: any; t: any, updateInfo: any },
    {
      showIndex: number;
      prevIndex: number;
      phone?: string;
      code?: number;
      timeToSendSMSAgain?: number;
      codeError?: string;
      height: number;
      width?: string;
    }
    > {
    [x: string]: any;
    constructor(props) {
      super(props);
      this.state = {
        phone: '',
        timeToSendSMSAgain: null,
        codeError: null,
        prevIndex: 0,
        showIndex: 0,
        height: 400,
        width: '80%'
      };
      this.nextPanel = this.nextPanel.bind(this);
      this.prevPanel = this.prevPanel.bind(this);
    }
    handleOpenModal = () => {
      this.modalwrapper.handleOpenModal(); // do stuff
    };

    handleCloseModal = () => {
      this.modalwrapper.handleCloseModal(); // do stuff
    };

    componentDidMount() {
      this.props.onRef(this);
    }
    componentWillUnmount() {
      this.props.onRef(undefined);
    }

    nextPanel() {
      if (this.state.showIndex + 1 > 2) return;
      this.setState({
        prevIndex: this.state.showIndex,
        showIndex: this.state.showIndex + 1,
        height: 290,
        codeError: null
      });
    }

    prevPanel() {
      if (this.state.showIndex - 1 < 0) return;
      this.setState({
        prevIndex: this.state.showIndex,
        showIndex: this.state.showIndex - 1,
        height: 280,
        codeError: null
      });
    }

    renderTimeTOSend = ({ hours, minutes, seconds, completed }) => {
      const { t } = this.props;
      if (completed) {
        return (
          <span style={{ cursor: 'pointer' }} onClick={() => this.prevPanel()}>
            ارسال مجدد
          </span>
        );
      } else {
        return (
          <span style={{ cursor: 'default', paddingTop: '8px' }}>
            ارسال مجدد کد {seconds}
          </span>
        );
      }
    };

    render() {
      const { t, updateInfo } = this.props;
      const theme = i18n.language == 'fa' ? rtlTheme : ltrTheme;
      return (
        <ThemeProvider
          theme={{
            lang: i18n.language,
            direction: theme
          }}
        >
          <ModalWrapper
            title={''}
            onRef={ref => (this.modalwrapper = ref)}
            direction={theme.direction}
            height={this.state.height}
            width={this.state.width}
          >
            <PanelsWrapper
              showIndex={this.state.showIndex}
              prevIndex={this.state.prevIndex}
            >
              <Panel>
                  <LawDiv className="LawsModal">

              <label>                      قوانین و مقررات
</label>
<p>
لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد. 
</p>
                  <div className="text-center">
                          <Button.Submit
                            primary
                            type="submit"
                            className="btn_1 full-width"
                            onClick= {() =>{this.handleCloseModal();
                                updateInfo();}}
                                >
                            بستن
                          </Button.Submit>
                        </div>
                                </LawDiv>
            </Panel>
            </PanelsWrapper>
          </ModalWrapper>
        </ThemeProvider>
      );
    }
  }
);
