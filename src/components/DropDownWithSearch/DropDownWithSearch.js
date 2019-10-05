import React, { Component } from "react";

class DropDownWithSearch extends Component {
    state = {
        InputValue: "",
        ShowControler: false,
        data: []
    };

    DropDownController = () => {
        this.setState(pre => {
            return { ShowControler: !pre.ShowControler };
        });
    };

    componentWillReceiveProps = props => {
        this.setState({
            data: props.data
        });
    };

    render() {
            return ( <
                    div className = "searchBoxContainer"
                    onMouseLeave = {
                        () => this.setState({ ShowControler: false })
                    } >
                    <
                    label className = { this.props.data.length < 2 ? "diz" : null } > { this.props.children } <
                    /label> {!this.props.disabled && this.props.loading && this.props.data.length < 1 && <
                    span className = "loader" > < /span>
                } <
                input disabled = { this.props.disabled }
            value = { this.state.InputValue }
            placeholder = { this.props.placeholder }
                // onBlur={() => {
                //   console.log(1)
                //   if (this.state.ShowControler) {

            //   }
            // }}
            onClick = { this.DropDownController }
            onChange = {
                e => {
                    this.setState({
                        data: this.props.data.filter(i => {
                            return i.text.match(e.target.value);
                        })
                    });
                    this.setState({ InputValue: e.target.value, ShowControler: true });
                }
            }
            /> {
            this.state.ShowControler ? ( <
                div className = "resultList"
                style = {
                    { top: this.props.top + "px" }
                } > {
                    this.state.data.map(i => ( <
                        p onClick = {
                            () => {
                                this.setState({ InputValue: i.text });
                                this.props.Select(i);
                                this.DropDownController();
                            }
                        }
                        key = { i.key } > { i.text } <
                        /p>
                    ))
                } <
                /div>
            ) : null
        } <
        /div >
);
}
}

export default DropDownWithSearch;