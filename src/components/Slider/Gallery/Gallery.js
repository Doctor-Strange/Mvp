import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

class Gallery extends Component {
  state = {
    index: 0
  };

  showController = index => {
    this.setState({
      index
    });
  };

  render() {
    const { Feed } = this.props;
    return (
      <div className="Gallery_Container">
        <div className="closeButton" onClick={this.props.CloseGallery}>
          <Icon name="window close outline" size="big" />
        </div>
        <div className="show_part">
          <img src={Feed[this.state.index]} alt="تصویر گالری" />
        </div>
        <div className="thumbnail_part">
          {Feed.map((item, i) => {
            return (
              <img
                src={item}
                onClick={() => this.showController(i)}
                alt="تصویر گالری"
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Gallery;
