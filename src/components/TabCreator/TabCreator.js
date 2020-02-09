import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

class TabCreator extends Component {
  state = {
    active: null,
    showTabContent: false
  };

  TabClick = (i) =>{
    this.setState({
        active:i,
        showTabContent:true
    })
  }

  render() {
    const { tabs, data_arr } = this.props;
    return (
      <div className="Tab_Accordion">
        <div style={{ marginBottom: "30px" }}>
          <section
            className="responsive"
            style={{ paddingTop: "30px" }}
          >
            <div className="Tab_father">
              {data_arr.map((item, i) => {
                return (
                  <span
                    key={i}
                    onClick={()=>this.TabClick(i)}
                    className={i === this.state.active ? "active_tab" : ""}
                  >
                    <Icon name="chevron down" size="smal" className={this.state.active === i ?  "rotateIcon": ""}></Icon>
                    {item.title}
                  </span>
                );
              })}
            </div>
          </section>
        </div>
        {this.state.showTabContent && <div style={{ background: "#fafafa", marginBottom: "30px" }}>
          <section
            className="insurance responsive content_part_accordion"
            style={{ paddingTop: "30px",paddingBottom: "30px", direction: 'rtl' }}
          >
            {data_arr.map((item, i) => {
              return (
                <ul key={i} className={i === this.state.active ? "active_tab" : ""} >
                  {item.links.map((i, index) => {
                    return (
                      <li key={index}>
                        <a href={i.link}>{i.title}</a>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </section>
        </div>
        }
      </div>
    );
  }
}

export default TabCreator;
