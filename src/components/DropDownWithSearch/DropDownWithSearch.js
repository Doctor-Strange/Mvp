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
    return (
      <div className="searchBoxContainer">
        <label className={this.props.data.length < 2 ? "diz" : null}>
          {this.props.children}
        </label>
        <input
          disabled={this.props.disabled}
          value={this.state.InputValue}
          placeholder={this.props.placeholder}
          onBlur={() => {
            if (this.state.ShowControler) {
              this.DropDownController;
            }
          }}
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
        {this.state.ShowControler ? (
          <div className="resultList">
            {this.state.data.map(i => (
              <p
                onClick={() => {
                  this.setState({ InputValue: i.text });
                  this.props.Select(i.value);
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
