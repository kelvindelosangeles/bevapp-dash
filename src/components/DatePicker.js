import React from "react";
import styled from "styled-components";
import { DatePicker as MaterialDatePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { Colors } from "../Constants/Colors";

const DatePicker = ({ theDate, setTheDate, label }) => {
    const materialTheme = createMuiTheme({
        overrides: {
            MuiFormControl: { color: "white" },
            MuiPickersToolbar: {
                toolbar: {
                    backgroundColor: Colors.navy,
                },
            },
            MuiPickersCalendarHeader: {
                switchHeader: {
                    // backgroundColor: Colors.navy,
                    // color: Colors.white,
                },
            },
            MuiPickersDay: {
                day: {
                    color: Colors.navy,
                },
                daySelected: {
                    backgroundColor: Colors.navy,
                },
                dayDisabled: {
                    color: Colors.black,
                },
                current: {
                    color: Colors.blue,
                },
            },
            MuiPickersModal: {
                dialogAction: {
                    color: "burgendy",
                },
            },
        },
    });

    return (
        <Component>
            <ThemeProvider theme={materialTheme}>
                <MaterialDatePicker value={theDate} onChange={(date) => setTheDate(date)} autoOk label={label} />
            </ThemeProvider>
        </Component>
    );
};
const Component = styled.div`
    min-width: 150px;
    input,
    label {
        color: white !important;
        cursor: pointer;
    }
    .MuiInput-underline:before {
        border-bottom: 2px solid ${Colors.white};
    }
    input {
        font-size: 18px;
        white-space: nowrap;
    }
`;
export default DatePicker;
