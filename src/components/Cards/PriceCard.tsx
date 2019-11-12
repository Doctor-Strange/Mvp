import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English, getShortVersion } from '../../utils/numbers';

const Card = styled.div`
    left: 20px;
    box-shadow: none;
    text-align: center;
    border-radius: 5px;
    background: white;
    width: 85px;
    height: 80px;
    padding: 5px;
    margin: 0 auto;
    .number{
        height: 34px;
        line-height: 43px;
        display: block;
        width: 65px;
        margin: 0 auto;
        font-weight: 500;
    }
    .unit{
        padding: 0px;
        display: block;
        .strong{
            font-size: 14px;
            display: block;
            font-weight: 400;
        }
    }
`;

export const PriceCard: React.FunctionComponent<{
    number: any;
    preNumber?: any;
    fontSize?: number;
    style?: any;
    moreThan?: boolean;
}> = ({ children, number, preNumber, fontSize = 24, style, moreThan = false }) => {
    let price= "خطا"
    
    if(number){
    price= convertNumbers2Persian(getShortVersion(number).number);
    let  bo = convertNumbers2Persian(getShortVersion(number).number).indexOf(".") === -1
    let  pos = convertNumbers2Persian(getShortVersion(number).number).indexOf(".")
    if(!bo){
        if(number > 1000000){
            price = convertNumbers2Persian(getShortVersion(number).number).slice(0, pos+2)
        }else{
            price = convertNumbers2Persian(getShortVersion(number).number).slice(0, pos)
        }
    }
}
    return <Card className="price" style={style}>
        <span className="number" style={{ fontSize: fontSize + 'px' }}>
                {preNumber}
                {" "}
                {price}
                {/* {convertNumbers2Persian(getShortVersion(number).number).length > 3 
                ?convertNumbers2Persian(getShortVersion(number).number).slice(0,4)
            :convertNumbers2Persian(getShortVersion(number).number)} */}
                {moreThan &&
                    "+"
                }
        </span>
        <span className="unit">
            <span className="strong">{getShortVersion(number).unit} تومان</span>
            <span>{children}</span>
        </span>
    </Card>
};
