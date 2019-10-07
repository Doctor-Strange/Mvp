import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

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
    return (
      <div
        className={['searchBoxContainer' , this.props.error? "ErrorINPUT": null].join(" ")}
        onMouseLeave={() => this.setState({ ShowControler: false })}
      >
        <label className={this.props.data.length < 2 ? "diz" : null}>
          {this.props.children}
        </label>
        {!this.props.disabled &&
          this.props.loading &&
          this.props.data.length < 1 && <span className="loader"> </span>}
        <input
          disabled={this.props.disabled}
          value={this.state.InputValue}
          placeholder={this.props.placeholder}
          // onBlur={() => {
          //   console.log(1)
          //   if (this.state.ShowControler) {

          //   }
          // }}
          onClick={this.DropDownController}
          onChange={e => {
            this.setState({
              data: this.props.data.filter(i => {
                return i.text.match(e.target.value);
              })
            });
            this.setState({ InputValue: e.target.value, ShowControler: true });
          }}
        />
        {this.state.InputValue ? (
          <Icon
            style={{
              position: "absolute",
              left: "11px",
              top: this.props.IconTop+"px",
              cursor: "pointer",
              zIndex:'4'
            }}
            onClick={() => {
              this.setState({ InputValue: "" });
              this.props.clearField();
            }}
            size="small"
            name="close"
          />
        ) : null}
        {this.state.ShowControler ? (
          <div className="resultList" style={{ top: this.props.top + "px" }}>
            {this.state.data.map(i => (
              <p
              className="Items"
                onClick={() => {
                  this.setState({ InputValue: i.text });
                  this.props.Select(i);
                  this.DropDownController();
                }}
                key={i.key}
              >
                {i.text}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default DropDownWithSearch;
