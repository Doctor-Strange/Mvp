import * as React from 'react';
import styled from 'styled-components';
import { ITheme } from "../../theme/Interfaces";

const Card = styled.aside`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin-bottom: 30px;
    &.push_top{
        border-top-left-radius: 10%;
        border-top-right-radius: 10%;
        @media (min-width: 768px){
            margin-top: -60px;
        }
    }
`;

export const BoxCard: React.FunctionComponent<{
    pushTopMargin?: boolean;
    style?:any
}> = ({
  children,
  style,
  pushTopMargin = false,
}) => {
    return (
        <Card className={`box_detail ${pushTopMargin? "push_top" : ""}`} style = {style}>
            {children}
        </Card>
    );
  }
