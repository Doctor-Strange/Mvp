import * as React from 'react';
import styled from 'styled-components';

const FilterTypeStyled = styled.div`
    h6 {
        // border-top: 1px solid #ededed;
        margin: 0px 0 8px;
        padding: 0px 0 0 0;
        font-size: 13px !important;
        font-size: 0.8125rem;
        direction: rtl;
        text-align:right;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0 0 15px 0;
        li {
            margin-bottom: 5px;
            :last-child {
                margin-bottom: 0;
            }
            small {
                float: left;
                position: relative;
                top: 4px;
            }
        }
    }
`;

export const FilterType: React.SFC<IShareBar> = ({ children, title }) => {
    return (
        <FilterTypeStyled className="filter_type">
            <h6>{title}</h6>
            {children}
        </FilterTypeStyled>
    )
}

interface IShareBar {
    title: string;
}