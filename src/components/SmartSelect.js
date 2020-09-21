import React from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import styled from "styled-components";

const SmartSelect = ({ onChange, value = 0, data }) => {
    const options = Object.values(data).map((x) => {
        const firstLetter = x.id[0].toUpperCase();

        return {
            firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
            ...x,
        };
    });

    return (
        <SmartSelectWrapper>
            <Autocomplete
                options={options.sort()}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.id}
                renderInput={(params) => <TextField {...params} label='Select a Beverage' variant='standard' fullWidth />}
                value={value}
                onChange={onChange}
                fullWidth
            />
        </SmartSelectWrapper>
    );
};

const SmartSelectWrapper = styled.div`
    height: 100%;
    min-width: 200px;
    input {
        cursor: pointer !important;
    }
    .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-child {
        margin-top: 17px;
    }
    .MuiInput-underline:before {
        border-bottom: 2px solid white !important;
    }
`;

export default SmartSelect;
