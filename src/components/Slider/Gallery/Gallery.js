import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

class Gallery extends Component {
  state = {
    index: 0,
    rightV: 0,
    startPoint: 0,
    FromX: 0
  };

  showController = index => {
    this.setState({
      index
    });
  };

  SliderNav = slide => {
    if (
      slide === "right" &&
      this.state.index < this.props.Feed.length - 1
    ) {
      this.setState(p => {
        return {
          index: 1 + p.index,
          // direction:slide
        };
      });
    } else if (slide === "left" && this.state.index > 0) {
      this.setState(p => {
        return {
          index: p.index - 1,
          // direction:slide          
        };
      });
    } else return;
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
          <img src={Feed[this.state.index]} alt="تصویر گالری" 
          
          onTouchEnd={() => {
            this.setState({
              rightV: 0
            });
          }}
          onTouchStart={e => {
            e.persist();
            this.setState({
              startPoint: e.changedTouches[0].screenX,
              FromX: e.target.x
            });
          }}
          onTouchMoveCapture={e => {
            e.persist();
            if (e.changedTouches[0].screenX > this.state.startPoint) {
              let right =
                e.changedTouches[0].screenX - this.state.startPoint;
              if (right < 200) {
                this.SliderNav("right");
                this.setState({
                  rightV: 0
                });
              }
              this.setState({
                rightV: "-" + right
              });
            } else {
              let left =
                this.state.startPoint - e.changedTouches[0].screenX;
              if (left > 200) {
                this.SliderNav("left");
                this.setState({
                  rightV: 0
                });
              }
              this.setState({
                rightV: left
              });
            }
          }}
          style={{
            right: this.state.rightV + "px"
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
          <div className="arrow-Container">
            {this.state.index < this.props.Feed.length - 1 && (
              <button className="NAVIGA arrow-right">
                <Icon
                  onClick={() => this.SliderNav("right")}
                  name="chevron right"
                  size="big"
                />
              </button>
            )}
            {this.state.index > 0 && (
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
      </div>
    );
  }
}

export default Gallery;
