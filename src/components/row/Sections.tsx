import * as React from 'react';

export const Section: React.FunctionComponent<{
  justifyCenter?: boolean;
  justifyContent?: string;
  bgColor?: string;
  Bimage?: string;
  margin?: Margin;
  className?: any;
  rowClassName?: string;
  IHeight: string;
  style?: any;
  id?: any;
}> = ({ children, justifyCenter, justifyContent, bgColor, margin, className, style, id, rowClassName ,Bimage,IHeight}) => (
  <div style={{height:IHeight, backgroundColor: bgColor , background: `url(${Bimage}) no-repeat`,
  backgroundSize: 'cover',
    backgroundPosition: "center top"}} className={className}>
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