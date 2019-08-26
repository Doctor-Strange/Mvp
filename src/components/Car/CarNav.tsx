import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import StarRatingComponent from 'react-star-rating-component';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../../utils/numbers';
import { ITheme } from "../../theme/Interfaces";

const Line = styled.nav`
    background: ${({theme}:{theme:ITheme}) => theme.color.secondForeground};
    padding: 15px 0;

    h4 {
        color: ${({theme}:{theme:ITheme}) => theme.color.textMainAlter};
        text-align: center;
    }

    &.is_stuck {
        z-index: 99;
        width: 100% !important;
        left: 0;
    }

    ul {
        margin-bottom: 0;
        li {
            display: inline-block;
            margin-right: 20px;
            font-weight: 500;
            font-size: 16px;
            font-size: 1rem;
            a {
                color: rgba(255, 255, 255, 0.5);
                :hover {
                    color: #fff;
                    opacity: 1;
                }
                &.active {
                    color: white;
                }
            }
            :last-child {
                display: none;
                @media (max-width: 575px) {
                    display: inline-block;
                }
            }
        }
    }
`;

export const CarNav: React.FunctionComponent<{
    startDate: string;
    endDate: string;
    simpleMode?: boolean;
}> = ({ startDate, endDate, simpleMode = false }) => {
    const main = <h4>
            {(startDate && endDate)
                ?` از ${convertNumbers2Persian(startDate)} تا ${convertNumbers2Persian(endDate)} `
                :`برای اجاره به صفحه نخست مراجعه کنید`
            }
        </h4>;
    return !simpleMode ? (
        <Line className="secondary_nav sticky_horizontal_2 navbar">
            <div className="container">
                {main}
            </div>
        </Line>
    )
        : <div style={{textAlign: 'center'}}> {main} </div>;
};
