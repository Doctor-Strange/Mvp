import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

class Gallery extends Component {
  state = {
    index: null,
    leftV: 0,
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

  componentDidMount = () => {
    this.setState({
      index: this.props.index
    });
  };

  render() {
    const { Feed } = this.props;
    let carousel = Feed.length > 1 ? true : false;

    return (
      <div className="Gallery_Container">
        <div className="closeButton" onClick={this.props.CloseGallery}>
          <Icon name="window close outline" size="big" />
        </div>
        <div className="show_part">
          <img
            src={Feed[this.state.index]}
            alt="تصویر گالری"
            onTouchEnd={() => {
              console.log("Touch end ", Number(this.state.rightV));
              
              if(this.state.rightV < -200){
                this.SliderNav("right");
              }
              if(this.state.leftV < -200){
                this.SliderNav("left");
              }
              this.setState({
                rightV: 0,
                leftV: 0,
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
                this.setState({
                  rightV: "-" + right,
                  leftV: 0
                });
                if (right > 100 && this.state.falgControl) {
                  this.setState(
                    {
                      // rightV: 0,
                      falgControl: false
                    },
                    () => {
                      // this.SliderNav("left");
                    }
                  );
                } else {
                  // this.setState({
                  //   rightV: "-" + 0
                  // });
                }
              } else {
                let left = this.state.startPoint - e.changedTouches[0].screenX;
                this.setState(
                  {
                    rightV: 0,
                    leftV: "-" + left
                  },
                  () => console.log(this.state.rightV)
                );
                if (left > 100 && this.state.falgControl) {
                  this.setState(
                    {
                      // rightV: 0,
                      falgControl: false
                    },
                    () => {
                      // this.SliderNav("right");
                    }
                  );
                } else {
                  // this.setState({
                  //   rightV:0,
                  // });
                }
              }
            }}
            style={{
              right: this.state.rightV + "px",
              left: this.state.leftV + "px"
            }}
          />
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
