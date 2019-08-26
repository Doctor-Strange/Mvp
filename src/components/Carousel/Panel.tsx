import * as React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const PanelStyle = styled.div``;

export class Panel extends React.Component<{ index?: number }> {
  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}
