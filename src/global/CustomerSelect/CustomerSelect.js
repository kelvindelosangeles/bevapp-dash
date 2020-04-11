import React from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import { connect } from "react-redux";

const CustomerSelect = ({ customerChangeHandler, selectedCustomer, customers }) => {
    // FIXME: change the sort to numbers
    const options = Object.values(customers).map((x) => {
        const firstLetter = x.address[0].toUpperCase();

        return {
            firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
            ...x,
        };
    });

    return (
        <CustomerSelectWrapper>
            <Autocomplete
                id='combo-box-demo'
                options={options.sort((a, b) => {
                    return a.address < b.address && -1;
                })}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.address.toUpperCase()}
                renderInput={(params) => <TextField {...params} label='Select a Customer' variant='standard' fullWidth />}
                value={selectedCustomer}
                onChange={customerChangeHandler}
            />
        </CustomerSelectWrapper>
    );
};

const CustomerSelectWrapper = styled.div`
    width: 100%;
    input {
        cursor: pointer !important;
    }
`;

export default connect((state) => {
    return {
        customers: state.Firestore.data.store.customers,
    };
})(CustomerSelect);
