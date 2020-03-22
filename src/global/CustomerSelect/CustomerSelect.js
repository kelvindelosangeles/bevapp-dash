import React from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import styled from "styled-components";

import { CustomersArray } from "../../Assets/Data/Customers";
// TODO: This will eventually come from firebase

const CustomerSelect = ({ customerChangeHandler, selectedCustomer }) => {
  const options = CustomersArray.map(x => {
    const firstLetter = x.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...x
    };
  });

  return (
    <CustomerSelectWrapper>
      <Autocomplete
        id="combo-box-demo"
        options={options.sort(
          (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
        )}
        groupBy={option => option.firstLetter}
        getOptionLabel={option => option.name.toUpperCase()}
        renderInput={params => (
          <TextField
            {...params}
            label="Select a Customer"
            variant="standard"
            fullWidth
          />
        )}
        value={selectedCustomer}
        onChange={customerChangeHandler}
      />
    </CustomerSelectWrapper>
  );
};

const CustomerSelectWrapper = styled.div`
  width: 100%;
`;

export default CustomerSelect;
