import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import Gallery from "./Gallery/Gallery";

class Slider extends Component {
  state = {
    heightController: 0,
    slideIndex: 0,
    colseModal: true,
    direction:null
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
    if (
      slide === "right" &&
      this.state.slideIndex < this.props.Feed.length - 1
    ) {
      this.setState(p => {
        return {
          slideIndex: 1 + p.slideIndex,
          direction:slide
        };
      });
    } else if (slide === "left" && this.state.slideIndex > 0) {
      this.setState(p => {
        return {
          slideIndex: p.slideIndex - 1,
          direction:slide          
        };
      });
    } else return;
  };

  CloseGallery = () => {
    this.setState(p => {
      return {
        colseModal: !p.colseModal
      };
    });
  };

  render() {
    console.log(this.state.slideIndex, this.props.Feed.length - 1);

    const { Feed } = this.props;
    let carousel = Feed.length > 1 ? true : false;
    return (
      <div className="carousel_container">
        {!this.state.colseModal && (
          <Gallery Feed={Feed} CloseGallery={this.CloseGallery} />
        )}
        {carousel ? (
          <>
            <img
              className={[
                "carousel_FrontImage",
                this.state.direction === "right" ? "rightSlide" : "leftSlide"
              ].join(" ")}
              src={Feed[this.state.slideIndex]}
              alt="تصویر اسلایدر"
            />
            <img
              className="carousel_BackImage"
              // className={[
              //   "carousel_BackImage",
              //   this.state.slideIndex === i ? "activslide" : "HiddenSlide"
              // ].join(" ")}
              style={{
                top: `-${this.state.heightController}px`
              }}
              src={Feed[this.state.slideIndex]}
              alt="تصویر اسلایدر"
              onLoad={this.positionController}
            />
          </>
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
        {carousel && (
          <div className="arrow-Container">
            {this.state.slideIndex < this.props.Feed.length - 1 && (
              <button className="NAVIGA arrow-right">
                <Icon
                  onClick={() => this.SliderNav("right")}
                  name="chevron right"
                  size="big"
                />
              </button>
            )}
            {this.state.slideIndex > 0 && (
              <button className="NAVIGA arrow-left">
                <Icon
                  onClick={() => this.SliderNav("left")}
                  name="chevron left"
                  size="big"
                />
              </button>
            )}
          </div>
        )}
        {carousel && (
          <div className="FullScreen" onClick={this.CloseGallery}>
            <Icon name="expand" size="big" />
          </div>
        )}
      </div>
    );
  }
}

export default Slider;
