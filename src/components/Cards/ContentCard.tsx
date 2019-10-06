import * as React from 'react';
import styled from 'styled-components';
import { ITheme } from "../../theme/Interfaces";

const Card = styled.div`
    @media (min-width: 768px) {
        z-index: -1; 
        /* ${({theme}:{theme:ITheme}) => theme.color.cardLabels}} */
        position: 'relative';
        &.checkout{
            z-index: 1;
            .det {
                padding: 25px 16px 15px 16px;
            }
        }
        .det {
            background-color: #fff;
            padding: 25px 25px 15px 25px;
            box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.1);
            border-radius: 3px;
            margin-bottom: 30px;
        }
    }
`;

export const ContentCard: React.FunctionComponent<{
    style?: object;
    className?: string 
}> = ({
  children,
  style,
  className
}) => {
    return (
        <Card className={['col-lg-8' , className].join(" ")} style={style? style : {}}>
            <section id="description" className="det">
                {children}
            </section>
        </Card>
    );
  }
