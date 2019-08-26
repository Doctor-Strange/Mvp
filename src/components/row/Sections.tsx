import * as React from 'react';

export const Section: React.FunctionComponent<{
  justifyCenter?: boolean;
  justifyContent?: string;
  bgColor?: string;
  margin?: Margin;
  className?: any;
  rowClassName?: string;
  style?: any;
  id?: any;
}> = ({ children, justifyCenter, justifyContent, bgColor, margin, className, style, id, rowClassName }) => (
  <div style={{ backgroundColor: bgColor }} className={className}>
    <div className={'container ' + (margin || '')} style={style || {}}>
      <div
        className={'row ' + (justifyCenter && 'justify-content-center') + ` ${rowClassName}`}
        style={{ justifyContent }}
        id={id}
      >
        {children}
      </div>
    </div>
  </div >
);
