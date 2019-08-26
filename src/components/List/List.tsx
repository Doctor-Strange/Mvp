import * as React from 'react';
import styled from 'styled-components';
import { ITheme } from "../../theme/Interfaces";

interface YourProps {
  boldLastItem: boolean
}

const ListStyles = styled.ul<YourProps>`
  list-style: none;
  margin: 0px 0px 20px;
  padding: 0px;
  li {
    margin-bottom: 8px;
    padding-bottom: 4px;
    font-weight: 500;
    border-bottom: 1px solid ${({theme}:{theme:ITheme}) => theme.color.fadedGray}};  
    :last-child {
      font-size: ${(p) => p.boldLastItem ? '18px' : 'inherit'};;
      font-weight: ${(p) => p.boldLastItem ? '600' : '500'};;
    }
  }
  .float-left {
    float: left !important;
    direction: rtl;
  }
`;

export const List: React.FunctionComponent<{boldLastItem?: boolean}> = ({children, boldLastItem}) => (
  <ListStyles boldLastItem={boldLastItem}>
    {children}
  </ListStyles>
);
