import * as React from 'react';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English, getShortVersion } from '../../utils/numbers';
import * as PelakImage from '../../../static/pelak2.png';

const Card = styled.div`
    display: block;
    direction: ltr;
    .large {
        background: url(${PelakImage}) no-repeat;
        height: 70px;
        width: 308px;
        font-size: 32px;
        .first {
            padding-right: 0px !important;
        }
        .second {
            position: relative;
            top:-8px;
        }
    }
    .normal {
        height: 40px;
        width: 175px;
        font-size: 20px;
        color:#6c6c6cad;
        .row {
            left: 15px;
            padding-top: 5px;
            padding-bottom: 5px;
            .column {
                border-bottom: 1px solid #6c6c6cad;
                border-top: 1px solid #6c6c6cad;
                padding: 0;
                text-align: center;
                :first-child{
                    padding-right: 0 !important;
                    border-bottom-left-radius: 5px;
                    border-top-left-radius: 5px;
                    border-left: 1px solid #6c6c6cad;
                }
                :nth-child(2) {
                    span{
                        position: relative;
                        top:-3px;
                    }
                }
                :last-child{
                    border-bottom-right-radius: 5px;
                    border-top-right-radius: 5px;
                    border-right: 1px solid #6c6c6c;
                    border-left: 1px solid #6c6c6c;
                    padding: 0;
                    text-align: center;
                }
            }
        }
    }
    .small {
        height: 32px;
        width: 129px;
        font-size: 17px;
        display: contents;
        .column {
            padding-top: 3px !important;
        }
    }
    .flrt{
        display: inline-block;
    }
    
`;

const Pelak: React.FunctionComponent<{
    first: string;
    second: string;
    third: string;
    forth: string;
    type?: number;
    size?: 'large' | 'normal' | 'small';
    style?: any;
}> = ({ first, second, third, forth, type = 1, size = sizeType.normal, style = {} }) => (
    <Card className="pelak" style={style}>
        <Grid className={`${(size != 'small') ? size : 'normal small'} type${type} flrt`}>
            <Grid.Row columns={4}>
                <Grid.Column width={(size == 'large') ? 5 : 4} className="first">
                    {convertNumbers2Persian(first)}
                </Grid.Column>
                <Grid.Column width={(size == 'large') ? 3 : 3} className="second">
                    <span>{second}</span>
                </Grid.Column>
                <Grid.Column width={(size == 'large') ? 4 : 4} className="third">
                    {convertNumbers2Persian(third)}
                </Grid.Column>
                <Grid.Column width={(size == 'large') ? 4 : 4} className="forth">
                    {convertNumbers2Persian(forth)}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Card>
);

enum sizeType {
    large = 'large',
    normal = 'normal',
    small = 'small',
    // tiny = 'tiny'
}

export { Pelak, sizeType };



