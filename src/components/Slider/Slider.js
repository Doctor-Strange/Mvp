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
    falgControl: false
    // direction:null
  };
  positionController = e => {
    e.persist();
    // console.log(e);
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
    const { Feed , alt} = this.props;
    let carousel = Feed.length > 1 ? true : false;
    
    return (
      <div className="carousel_container">
        {!this.state.colseModal && (
          <Gallery
            Feed={Feed}
            CloseGallery={this.CloseGallery}
            index={this.state.slideIndex}
            alt ={alt}
          />
        )}
        {carousel ? (
          <>
            {Feed.map((item, i) => {
              return (
                <img
                  onClick={this.CloseGallery}
                  onTouchEnd={() => {
                    this.setState({
                      rightV: 0,
                      falgControl: false
                    });
                  }}
                  onTouchStart={e => {
                    e.persist();
                    this.setState({
                      startPoint: e.changedTouches[0].screenX,
                      FromX: e.target.x,
                      falgControl: true
                    });
                  }}
                  onTouchMoveCapture={e => {
                    e.persist();
                    if (e.changedTouches[0].screenX > this.state.startPoint) {
                      let right =
                        e.changedTouches[0].screenX - this.state.startPoint;
                      this.setState({
                        rightV: "-" + right
                      });
                      if (right > 100 && this.state.falgControl) {
                        this.setState(
                          {
                            // rightV: 0,
                            falgControl: false
                          },
                          () => {
                            this.SliderNav("left");
                            return;
                          }
                        );
                      } else {
                        // this.setState({
                        //   rightV: "-" + 0
                        // });
                      }
                    } else {
                      let left =
                        this.state.startPoint - e.changedTouches[0].screenX;
                      this.setState({
                        rightV: left
                      });
                      if (left > 100 && this.state.falgControl) {
                        this.setState(
                          {
                            // rightV: 0,
                            falgControl: false
                          },
                          () => {
                            this.SliderNav("right");
                            return;
                          }
                        );
                      } else {
                        // this.setState({
                        //   rightV: 0
                        // });
                      }
                    }
                  }}
                  style={{
                    right: this.state.rightV + "px"
                  }}
                  className={[
                    this.state.slideIndex === i && "carousel_FrontImage",
                    this.state.slideIndex < i && "carousel_FrontImage TranslateRight",
                    this.state.slideIndex > i && "carousel_FrontImage TranslateLeft"
                  ].join(" ")}
                  src={item}
                  alt = {alt}
                />
              );
            })}
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
              alt={alt}
              onLoad={this.positionController}
            />
          </>
        ) : (
          <>
            <img
              className="carousel_FrontImage"
              src={Feed[0]}
              alt={alt}
              onLoad={this.positionController}
            />
            <img
              className="carousel_BackImage"
              src={Feed[0]}
              style={{
                top: `-${this.state.heightController}px`
              }}
              alt={alt}
              onLoad={this.positionController}
            />
          </>
        )}
        {carousel && (
          <>
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
          </>
        )}
        {carousel && (
          <div className="NavBotton">
            {Feed.map((_, i) => {
              return (
                <span
                  onClick={() => {
                    this.setState({
                      slideIndex: i
                    });
                  }}
                  className={
                    this.state.slideIndex === i ? "activeDot" : "deactiveDot"
                  }
                ></span>
              );
            })}
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
