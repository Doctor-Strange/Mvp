import * as React from 'react';
import styled from 'styled-components';
import { ITheme } from '../../../theme/Interfaces';

const SubHeaderDiv = styled.div`
  background-color: ${({theme}:{theme:ITheme}) => theme.color.mainForeground};
  padding: 20px 0;
  h1 {
    color: #fff;
    margin: 0;
    font-size: 26px;
    font-size: 1.625rem;
    @media (max-width: 575px) {
      font-size: 18px;
      font-size: 1.125rem;
    }
  }
  &.sticky_header {
    margin-top: 58px;
    @media (max-width: 991px) {
      margin-top: 48px;
    }
  }
`;

export const SubHeader: React.FunctionComponent<{
  title: string;
}> = ({ title }) => (
  <SubHeaderDiv className="sub_header_in sticky_header">
    <div className="container">
      <h1>{title}</h1>
    </div>
  </SubHeaderDiv>
);
