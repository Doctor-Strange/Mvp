import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import Gallery from "./Gallery/Gallery";

class Slider extends Component {
  state = {
    heightController: 0,
    slideIndex: 0,
    colseModal: true,
    rightV: 0,
    startPoint: 0,
    FromX: 0,
    falgControl : false
    // direction:null
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
          slideIndex: 1 + p.slideIndex
          // direction:slide
        };
      });
    } else if (slide === "left" && this.state.slideIndex > 0) {
      this.setState(p => {
        return {
          slideIndex: p.slideIndex - 1
          // direction:slide
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
              onTouchEnd={() => {
                this.setState({
                  rightV: 0,
                  falgControl:false
                });
              }}
              onTouchStart={e => {
                e.persist();
                this.setState({
                  startPoint: e.changedTouches[0].screenX,
                  FromX: e.target.x,
                  falgControl:true
                });
              }}
              onTouchMoveCapture={e => {
                e.persist();
                if (e.changedTouches[0].screenX > this.state.startPoint) {
                  let right =
                    e.changedTouches[0].screenX - this.state.startPoint;
                  if (right < 200  && this.state.falgControl) {
                    this.setState(
                      {
                        rightV: 0,
                        falgControl:false
                      },
                      () => {
                        this.SliderNav("left");
                      }
                    );
                  } else {
                    this.setState({
                      rightV: "-" + right
                    });
                  }
                } else {
                  let left =
                    this.state.startPoint - e.changedTouches[0].screenX;
                  if (left > 200 && this.state.falgControl) {
                    this.setState(
                      {
                        rightV: 0,
                        falgControl:false
                      },
                      () => {
                        this.SliderNav("right");
                      }
                    );
                  } else {
                    this.setState({
                      rightV: left
                    });
                  }
                }
              }}
              style={{
                right: this.state.rightV + "px"
              }}
              className="carousel_FrontImage"
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
