import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

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
          <Icon
            name="angle down"
            size="small"
            className={[
              "ICON_CHevron",
              this.state.index === index ? "ACTIVE_CHEVRON" : ""
            ]}
          ></Icon>
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
