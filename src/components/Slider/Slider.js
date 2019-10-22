import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

class Slider extends Component {
  state = {
    heightController: 0,
    slideIndex: 0
  };
  positionController = e => {
    e.persist();
    console.log(e);
    let w = e.target.naturalWidth;
    let h = e.target.naturalHeight;
    if (w / h < 1.2) {
      this.setState({
        heightController: (w / h) * 110
      });
    }
    if (w / h < 0.9) {
      this.setState({
        heightController: (w / h) * 160
      });
    }
  };

  SliderNav = slide => {
    console.log(slide);
    if (
      slide === "right" &&
      this.state.slideIndex < this.props.Feed.length - 1
    ) {
      this.setState(p => {
        return {
          slideIndex: 1+ p.slideIndex
        };
      });
    } else if (this.state.slideIndex > 0) {
      this.setState(p => {
        return {
          slideIndex: 1-p.slideIndex 
        };
      });
    }
  };

  render() {
    console.log(this.state.slideIndex, this.props.Feed.length - 1);

    const { Feed } = this.props;
    let carousel = Feed.length > 1 ? true : false;
    console.log(this.state.heightController);
    return (
      <div className="carousel_container">
        {carousel ? (
          Feed.map((item, i) => {
            return (
              <>
                <img
                  className={[
                    "carousel_FrontImage",
                    this.state.slideIndex === i ? "activslide" : "HiddenSlide"
                  ].join(" ")}
                  src={item}
                  key={i}
                  alt="تصویر اسلایدر"
                />
                <img
                  className={[
                    "carousel_BackImage",
                    this.state.slideIndex === i ? "activslide" : "HiddenSlide"
                  ].join(" ")}
                  style={{
                    top: `-${this.state.heightController}px`
                  }}
                  src={item}
                  key={i}
                  alt="تصویر اسلایدر"
                  onLoad={this.positionController}
                />
                <div className="arrow-Container">
                  <button className="NAVIGA arrow-right">
                    <Icon
                      onClick={() => this.SliderNav("right")}
                      name="chevron right"
                      size="big"
                    />
                  </button>
                  <button className="NAVIGA arrow-left">
                    <Icon
                      onClick={() => this.SliderNav("left")}
                      name="chevron left"
                      size="big"
                    />
                  </button>
                </div>
              </>
            );
          })
        ) : (
          <>
            <img
              className="carousel_FrontImage"
              src={Feed[0]}
              alt="تصویر خودرو"
              onLoad={this.positionController}
            />
            <img
              className="carousel_BackImage"
              src={Feed[0]}
              style={{
                top: `-${this.state.heightController}px`
              }}
              alt="تصویر خودرو"
              onLoad={this.positionController}
            />
          </>
        )}
      </div>
    );
  }
}

export default Slider;
