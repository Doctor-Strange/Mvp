import React, { Component } from 'react'
import {
    numberWithCommas,
    convertNumbers2Persian,
} from "../../utils/numbers";

class RadioButton extends Component {
    state = {
        insurance: true
    }

    changeHandler = (e, insurance) => {
        e.persist()
        this.setState({
            insurance
        })
        this.props.EventChecker(insurance)
    }
    render() {

        return (
            <>
                <label className={['RadioButtonContainer', this.state.insurance ? "activeOne" : ''].join(" ")} onClick={(e) => this.changeHandler(e, true)}>
                    <p><strong >بسته ویژه بیمه سامان</strong>
                        ({this.props.insuranvePrice && convertNumbers2Persian(numberWithCommas(this.props.insuranvePrice))} هزار تومان)<br />
                        شامل پوشش‌های: سرقت، تصادف، حوادث طبیعی و پاشیده شدن رنگ و مواد شیمیایی در مدت اجاره</p>
                    <span className="checkmark"></span>
                </label>
                <label className={['RadioButtonContainer', !this.state.insurance ? "activeOne" : ''].join(" ")} onClick={(e) => this.changeHandler(e, false)}>
                    <p><strong>به بیمه نیاز ندارم</strong>
                        <br />
                        در طول مدت اجاره مسئولیت نگهداری از خودرو با شما خواهد بود. با خرید بیمه اجاره که توسط بیمه سامان صادر می‌شود، شما تنها متعهد به جبران مواردی خواهید بود که تحت پوشش بیمه خریداری شده نیست.</p>
                    <span className="checkmark"></span>
                </label>
            </>
        )
    }

}

export default RadioButton