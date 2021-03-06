import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

class Gallery extends Component {
  state = {
    index: null,
    rightV: 0,
    startPoint: 0,
    FromX: 0,
    falgControl: false
  };

  showController = index => {
    this.setState({
      index
    });
  };

  SliderNav = slide => {
    if (slide === "right" && this.state.index < this.props.Feed.length - 1) {
      this.setState(p => {
        return {
          index: 1 + p.index
          // direction:slide
        };
      });
    } else if (slide === "left" && this.state.index > 0) {
      this.setState(p => {
        return {
          index: p.index - 1
          // direction:slide
        };
      });
    } else return;
  };

  componentDidMount = () =>{
    this.setState({
      index : this.props.index
    })
  }

  render() {
    const { Feed ,alt } = this.props;
    let carousel = Feed.length > 1 ? true : false;

    return (
      <div className="Gallery_Container">
        <div className="closeButton" onClick={this.props.CloseGallery}>
          <Icon name="window close outline" size="big" />
        </div>
        <div className="show_part">
        {Feed.map((item, i) => {
              return (
              <img
            src={item}
            alt={alt}
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
                let right = e.changedTouches[0].screenX - this.state.startPoint;
                if (right > 100 && this.state.falgControl) {
                  this.setState(
                    {
                      rightV: 0,
                      falgControl: false
                    },
                    () => {
                      this.SliderNav("left");
                    }
                  );
                } else {
                  this.setState({
                    rightV: "-" + 0
                  });
                }
              } else {
                let left = this.state.startPoint - e.changedTouches[0].screenX;
                if (left > 100 && this.state.falgControl) {
                  this.setState(
                    {
                      rightV: 0,
                      falgControl: false
                    },
                    () => {
                      this.SliderNav("right");
                    }
                  );
                } else {
                  this.setState({
                    rightV:0,
                  });
                }
              }
            }}
            className={[
              this.state.index === i && "carousel_FrontImage",
              this.state.index < i && "carousel_FrontImage TranslateRight",
              this.state.index > i && "carousel_FrontImage TranslateLeft"
            ].join(" ")}
            style={{
              right: this.state.rightV + "px",

            }}
          />
          );
        })}
        </div>
        <div className="thumbnail_part">
          {Feed.map((item, i) => {
            return (
              <img
                src={item}
                onClick={() => this.showController(i)}
                alt={alt}
              />
            );
          })}
        </div>
        {carousel && (
          <>
            {this.state.index < this.props.Feed.length - 1 && (
              <button className="NAVIGA arrow-right G_R">
                <Icon
                  onClick={() => this.SliderNav("right")}
                  name="chevron right"
                  size="big"
                />
              </button>
            )}
            {this.state.index > 0 && (
              <button className="NAVIGA arrow-left G_L">
                <Icon
                  onClick={() => this.SliderNav("left")}
                  name="chevron left"
                  size="big"
                />
              </button>
            )}
          </>
        )}
      </div>
    );
  }
}

export default Gallery;
