import * as React from 'react';
import styled from 'styled-components';
import { Section } from '../row/Sections';
import { ITheme } from "../../theme/Interfaces";

const Card = styled(Section)`
&#reviews {
  border-bottom: none;
}

#review_summary {
  text-align: center;
  background-color: #32a067;
  color: #fff;
  padding: 20px 10px;
  border-radius: 3px 3px 3px 0;
}
@media (max-width: 991px) {
  #review_summary {
    margin-bottom: 15px;
  }
}
#review_summary strong {
  font-size: 42px;
  font-size: 2.625rem;
  display: block;
  line-height: 1;
}
#review_summary em {
  font-style: normal;
  font-weight: 500;
  display: block;
}

.reviews-container .progress {
  margin-bottom: 12px;
}
.reviews-container .progress-bar {
  background-color: #32a067;
}
.reviews-container .review-box {
  position: relative;
  margin-bottom: 25px;
  padding-left: 100px;
  min-height: 100px;
}
@media (max-width: 767px) {
  footer {
    display: none;
  }
  .reviews-container .review-box {
    padding-left: 0;
  }
}
.reviews-container .rev-thumb {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 80px;
  height: 80px;
  background: #ffffff;
  border-radius: 3px;
  overflow: hidden;
}
.reviews-container .rev-thumb img {
  width: 80px;
  height: auto;
}
@media (max-width: 767px) {
  .reviews-container .rev-thumb {
    position: static;
    margin-bottom: 10px;
  }
}
.reviews-container .rev-content {
  position: relative;
  padding: 25px 25px 1px 25px;
  border-radius: 3px;
  background-color: #fff;
}
.reviews-container .rev-info {
  font-size: 12px;
  font-size: 0.75rem;
  font-style: italic;
  color: #777;
  margin-bottom: 10px;
}


section#description, section#reviews {
  border-bottom: 3px solid #d2d8dd;
  margin-bottom: 30px;
}
section#description h2, section#reviews h2 {
  font-size: 24px;
  font-size: 1.5rem;
}
section#description h3, section#reviews h3 {
  font-size: 21px;
  font-size: 1.3125rem;
}
section#description h4, section#reviews h4 {
  font-size: 18px;
  font-size: 1.125rem;
}
section#description hr, section#reviews hr {
  border-color: #d2d8dd5d;
}
`;

export const CommentSection: React.FunctionComponent<{
    style?: object;
}> = ({
  children,
  style
}) => {
    return (
        <Card id="reviews" justifyCenter={false}>
                {/* <h2>نظرات</h2> */}
                {/* <div className="reviews-container add_bottom_30">
                <div className="row">
                    <div className="col-lg-3">
                        <div id="review_summary">
                            <strong>8.5</strong>
                            <em>Superb</em>
                            <small>Based on 4 reviews</small>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-10 col-9">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{ width: '90%' }}
                                    ></div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-3"><small><strong>5 stars</strong></small></div>
                        </div>
        
                        <div className="row">
                            <div className="col-lg-10 col-9">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{ width: '95%' }}
                                        aria-valuenow={95} aria-valuemin={0} aria-valuemax={100}></div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-3"><small><strong>4 stars</strong></small></div>
                        </div>
        
                        <div className="row">
                            <div className="col-lg-10 col-9">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{ width: '60%' }}
                                        aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}></div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-3"><small><strong>3 stars</strong></small></div>
                        </div>
        
                        <div className="row">
                            <div className="col-lg-10 col-9">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{ width: '20%' }}
                                        aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}></div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-3"><small><strong>2 stars</strong></small></div>
                        </div>
        
                        <div className="row">
                            <div className="col-lg-10 col-9">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{ width: '0%' }}
                                        aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-3"><small><strong>1 stars</strong></small></div>
                        </div>
        
                    </div>
                </div>
            </div>
        
            <div className="reviews-container">
        
                <div className="review-box clearfix">
                    <figure className="rev-thumb"><img src="img/avatar1.jpg" alt="" />
                    </figure>
                    <div className="rev-content">
                        <div className="rating">
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i>
                            <i className="icon_star voted"></i
                            ><i className="icon_star"></i>
                        </div>
                        <div className="rev-info">
                            Admin – April 03, 2016:
                            </div>
                        <div className="rev-text">
                            <p>
                                Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
                            </p>
                        </div>
                    </div>
                </div>
                <div className="review-box clearfix">
                    <figure className="rev-thumb"><img src="img/avatar2.jpg" alt="" />
                    </figure>
                    <div className="rev-content">
                        <div className="rating">
                            <i className="icon-star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star"></i>
                        </div>
                        <div className="rev-info">
                            Ahsan – April 01, 2016:
                        </div>
                        <div className="rev-text">
                            <p>
                                Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
                            </p>
                        </div>
                    </div>
                </div>
                <div className="review-box clearfix">
                    <figure className="rev-thumb"><img src="img/avatar3.jpg" alt="" />
                    </figure>
                    <div className="rev-content">
                        <div className="rating">
                            <i className="icon-star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star"></i>
                        </div>
                        <div className="rev-info">
                            Sara – March 31, 2016:
                        </div>
                        <div className="rev-text">
                            <p>
                                Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
                            </p>
                        </div>
                    </div>
                </div>
        
            </div>
            */}
        </Card>
    );
  }
