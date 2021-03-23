import { CalendarToday } from "@material-ui/icons";
import { DatePicker } from "@material-ui/pickers";

import React from "react";
import styled from "styled-components";
import colors from "../../../constants/Colors";
const DateRange = ({ startDate, endDate }) => {
    const [startDateValue, setStartDate] = startDate;
    const [endDateValue, setEndDate] = endDate;

    return (
        <Component>
            <p className='bevapp-module-label'>Date Range</p>
            <div className='wrapper'>
                <div className='subWrapper'>
                    <i className='bevapp-icon'>
                        <CalendarToday />
                    </i>
                    <DatePicker
                        disableToolbar
                        maxDate={endDateValue}
                        variant='inline'
                        format='ll'
                        autoOk
                        margin='normal'
                        id=''
                        label='Start Date'
                        value={startDateValue}
                        onChange={(e) => setStartDate(e.valueOf())}
                    />
                </div>
                <div className='subWrapper'>
                    <i className='bevapp-icon'>
                        <CalendarToday />
                    </i>
                    <DatePicker
                        disableToolbar
                        disableFuture
                        autoOk
                        variant='inline'
                        format='ll'
                        margin='normal'
                        id=''
                        label='End Date'
                        value={endDateValue}
                        onChange={(e) => setEndDate(e.valueOf())}
                    />
                </div>
            </div>
        </Component>
    );
};
const Component = styled.div`
    margin: 20px 16px;
    background-color: ${colors.white};
    border-radius: 8px;
    padding: 16px;
    .wrapper {
        display: grid;
        grid-column-gap: 16px;
        grid-row-gap: 24px;
        .subWrapper {
            display: flex;
            align-items: center;
            .MuiFormControl-marginNormal {
                margin: unset;
                padding: unset;
                cursor: pointer;
            }
            i {
                transform: scale(0.8);
                margin-right: 8px;
                cursor: default;
            }
        }
    }
    @media (min-width: 540px) {
        .wrapper {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (min-width: 1200px) {
        max-width: 50%;
    }
`;
export default DateRange;
