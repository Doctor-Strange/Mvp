import * as React from 'react';
import styled from 'styled-components';
import{ BoxCard } from './index';
import { ShareBar } from '../ShareBar'
import { ITheme } from "../../theme/Interfaces";

const Card = styled.aside`
.box_detail {
    ul {
        margin-bottom: 0;
            li {
                margin-bottom: 5px;
                i {
                    margin-right: 8px;
                }
            }
        }
    .usercard {
        display: flex;
        flex-direction: row-reverse;
        width: 100%;
        .hostDetailCard-responseTime{
            font-size: 13px;
        }
    }
}
.price {
    .score {
        float: right;
        top: -10px;
        position: relative;
        strong {
            background-color: #32a067;
            color: #fff;
            line-height: 1;
            border-radius: 5px 5px 5px 0;
            padding: 10px;
            display: inline-block;
        }
        span {
            display: inline-block;
            position: relative;
            top: 7px;
            margin-right: 8px;
            font-size: 12px;
            font-size: 0.75rem;
            text-align: right;
            line-height: 1.1;
            font-weight: 500;
            em {
                display: block;
                font-weight: normal;
                font-size: 11px;
                font-size: 0.6875rem;
            }
        }
    }
}
/* .box_detail .price {
  line-height: 1;
  border-bottom: 1px solid #ededed;
  margin: 0 -25px 25px -25px;
  padding: 0 25px 15px 25px;
}
.box_detail .price > span {
  font-size: 31px;
  font-size: 1.9375rem;
  font-weight: 600;
}
.box_detail .price > span > small {
  font-size: 11px;
  font-size: 0.6875rem;
  font-weight: 500; 
  }*/
h3 {
  font-size: 20px;
  font-size: 1.25rem;
  margin: 25px 0 10px 0;
}
`;

export const ContentSideCard: React.FunctionComponent<{
    style?: object;
    shareBar?: boolean;
    pushTopMargin?: boolean;
}> = ({
  children,
  style,
  shareBar = false,
  pushTopMargin = false,
}) => {
    return (
        <Card className={`col-lg-4`} id="sidebar">
            <BoxCard pushTopMargin={pushTopMargin}>
                {children}
            </BoxCard>
            {shareBar && <ShareBar/>}
        </Card>
    );
  }
