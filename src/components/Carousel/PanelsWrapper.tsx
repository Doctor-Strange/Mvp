import * as React from 'react';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

const slideOutLeft = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  99% {
    transform: translateX(-130%);
    opacity: 1;
  }
  100% {
    transform: translateX(-130%);
    opacity: 0;
  }
`;

const slideOutRight = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  99% {
    transform: translateX(130%);
    opacity: 1;
  }
  100% {
    transform: translateX(130%);
    opacity: 0;
  }
`;

const slideInLeft = keyframes`
  0% {
    transform: translateX(130%);
    opacity: 0;
  }
  1% {
    transform: translateX(130%);
    opacity: 1;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  0% {
    transform: translateX(-130%);
    opacity: 0;
  }
  1% {
    transform: translateX(-130%);
    opacity: 1;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
`;

const CurrentElementFormLeft = styled.div`
  width: 85%;
  transition: all 1s;
  transform: translateX(0);
  animation: ${slideInLeft} 1s cubic-bezier(0.86, 0, 0.07, 1) both;
  position: absolute;
  top: 60px;
`;
const CurrentElementFromRight = styled.div`
  width: 85%;
  transition: all 1s;
  transform: translateX(0);
  animation: ${slideInRight} 1s cubic-bezier(0.86, 0, 0.07, 1) both;
  position: absolute;
  top: 70px;
`;
const PrevElementGoLeft = styled.div`
  width: 85%;
  transition: all 1s;
  animation: ${slideOutLeft} 1s cubic-bezier(0.86, 0, 0.07, 1) both;
  position: absolute;
  top: 70px;
`;
const PrevElementGoRight = styled.div`
  width: 85%;
  transition: all 1s;
  animation: ${slideOutRight} 1s cubic-bezier(0.86, 0, 0.07, 1) both;
  position: absolute;
  top: 60px;
`;
const OtherElement = styled.div`
  width: 85%;
  transition: all 1s;
  transform: translateX(130%);
  position: absolute;
  /* top: 70px; */
  opacity: 0;
`;

const PanelsWrapperStyle = styled.div`
  .element:first-child {
    position: static;
    width: 100%;
  }
`;
export class PanelsWrapper extends React.Component<{
  showIndex: number;
  prevIndex: number;
}> {
  state = {
    lastIndex: React.Children.count(this.props.children) - 1
  };

  render() {
    const { prevIndex, showIndex, children } = this.props;
    const { lastIndex } = this.state;
    let localExit = false;
    const slide = React.Children.map(children, (slide, i) => {
      if (localExit) return;
      else if (i === showIndex && i >= prevIndex) {
        return (
          <CurrentElementFormLeft className="element">
            {slide}
          </CurrentElementFormLeft>
        );
      } else if (i === showIndex && i < prevIndex) {
        return (
          <CurrentElementFromRight className="element">
            {slide}
          </CurrentElementFromRight>
        );
      } else if (i === prevIndex && i < showIndex) {
        return (
          <PrevElementGoLeft className="element">{slide}</PrevElementGoLeft>
        );
      } else if (i === prevIndex && i > showIndex) {
        return (
          <PrevElementGoRight className="element">{slide}</PrevElementGoRight>
        );
      } else if (showIndex <= lastIndex && showIndex >= 0) {
        return <OtherElement className="element">{slide}</OtherElement>;
      }
      localExit = true;
      return <span>Error: something is not right with me.</span>;
    });
    return <PanelsWrapperStyle>{slide}</PanelsWrapperStyle>;
  }
}
