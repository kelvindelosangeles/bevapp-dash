import { CalendarToday } from "@material-ui/icons";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment-timezone";
import React from "react";
import styled from "styled-components";
import colors from "../../../constants/Colors";
const Date = ({ theDate, setTheDate }) => {
    return (
        <Component>
            <p className='bevapp-module-label'>Date Posted</p>
            <div className='wrapper'>
                <i className='bevapp-icon'>
                    <CalendarToday />
                </i>
                <DatePicker
                    disableToolbar
                    maxDate={moment()}
                    variant='inline'
                    format='ll'
                    autoOk
                    margin='normal'
                    label='Select a date'
                    value={theDate}
                    onChange={(e) => setTheDate(e.valueOf())}
                />
            </div>
        </Component>
    );
};
const Component = styled.div`
    padding: 16px;
    background-color: ${colors.white};
    box-shadow: ${colors.shadow};
    border-radius: 8px;
    margin-bottom: 24px;
    .wrapper {
        display: grid;
        align-items: center;
        grid-template-columns: auto 1fr;
        grid-column-gap: 8px;
        i {
            transform: scale(0.8);
        }
        .MuiFormControl-marginNormal {
            margin: 0;
        }
    }
`;
export default Date;
// TODO: move .MuiFormControl-marginNormal to global scope
