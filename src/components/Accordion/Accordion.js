import React, { Component } from "react";

class Accordion extends Component {
  state = {
    index: 0
  };

  ClickHandller = index => {
    if (this.state.index === index) {
      this.setState({
        index: undefined
      });
    } else
      this.setState({
        index
      });
  };

  render() {
    return this.props.question_set.map((item, index) => {
      return (
        <div
          key={index}
          bill={index}
          className="FQ_BOX"
          onClick={() => {
            this.ClickHandller(index);
          }}
        >
          <h3
            className={this.state.index === index ? "activeQA" : ""}
            dangerouslySetInnerHTML={{ __html: item.title }}
          ></h3>
          <p
            className={[
              "QuestionPart",
              this.state.index === index ? "activeQA" : ""
            ].join(" ")}
            dangerouslySetInnerHTML={{ __html: item.content }}
          ></p>
        </div>
      );
    });
  }
}

export default Accordion;
