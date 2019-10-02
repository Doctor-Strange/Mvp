import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import StarRatingComponent from 'react-star-rating-component';
import { numberWithCommas, convertNumbers2Persian, convertNumbers2English } from '../../utils/numbers';
import "otoli-react-persian-calendar-date-picker/lib/DatePicker.css";
import DatePicker from 'otoli-react-persian-calendar-date-picker';
import {
    convertDateToMoment,
    convertMomentToDate,
    convertRangeDateToMoment,
    convertMomentsToDateRange,
    getBetweenRange
} from '../../utils/date';
import { lightTheme } from "../../theme/Colors"; // fixme: serve colors only from styled-component

const Line = styled.nav`
    .DatePicker {
        width:100%;
    }
`;

export const CarDateRange: React.FunctionComponent<{
    from: any;
    to: any;
}> = ({ from, to }) => {
    return (
        <Line className=" car_date_range">
            <div className="container">
                {(from && to) &&
                    <DatePicker
                        selectedDayRange={{ from, to }}
                        onChange={() => { }}
                        inputPlaceholder="انتخاب روزهای نمایش"
                        isDayRange
                        disableBackward
                        colorPrimary={lightTheme.mainForeground}
                        colorPrimaryLight={lightTheme.secondForeground}
                    />
                }
                {/* {(!from && !to) &&
                    `برای اجاره به صفحه نخست مراجعه کنید`
                } */}
            </div>
        </Line>
    )
};
