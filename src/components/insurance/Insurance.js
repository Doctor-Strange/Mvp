import React, { Component } from "react";
import RadioButton from "../RadioButton/RadioButton";

class Insurance extends Component {
    EventChecker = (e) => {
        this.props.hasInsurance(e)
    }
    render() {
        return (
            <div className="DIvIN_Checkout deskTop">
                <div className="innerDiv_DIvIN_Checkout">
                    <h2 style={{ padding: "0", margin: '0 0 10px 0' }}>بیمه اجاره</h2>
                    <form>
                        <RadioButton
                            insuranvePrice = {this.props.insuranvePrice}
                            EventChecker={this.EventChecker} />
                    </form>
                    {/* <p style={{ padding: "0" }}>
                        در طول مدت اجاره مسئولیت نگهداری از خودرو با شما خواهد بود.
                        با خرید بیمه اجاره که توسط بیمه سامان صادر می‌شود، جبران
                        خسارت ناشی از سرقت، تصادف، حوادث طبیعی و پاشیده شدن رنگ و
                        مواد شیمیایی در درجه اول بر عهده بیمه سامان خواهد بود و شما
                        تنها متعهد به جبران مواردی خواهید بود که تحت پوشش بیمه نیست.
                        این موارد ممکن است برای هر مالک متفاوت باشد. بعد از ثبت
                        درخواست اجاره و تماس مالک با شما، درباره این موارد از او
                        سوال کنید.
                  </p> */}
                    {/* <div
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "0",
                            textAlign: "left",
                            marginBottom: "20px"
                        }}
                    >
                        <span style={{ color: "#4BA3CE" }}>حذف بیمه</span>
                    </div> */}
                </div>
            </div>
        )
    }
}


export default Insurance