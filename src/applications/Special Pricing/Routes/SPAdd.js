import React from "react";
import styled from "styled-components";
import { PageTitle, GridBlock } from "../../../Global/Layout/StyledElements";
import AddressIcon from "@material-ui/icons/BusinessRounded";

const SPAdd = () => {
  return (
    <Grid>
      <PageTitle gridArea={"A"}>Add a Special Price</PageTitle>
      <CustomerDetails>
        <h6>Customer Name</h6>
        <p>
          {" "}
          <AddressIcon /> Address
        </p>
        <p>
          <AddressIcon /> Number
        </p>
        <p>
          <AddressIcon /> State
        </p>
      </CustomerDetails>
      <GridBlock GA="D" />
      <GridBlock GA="B" />
    </Grid>
  );
};

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 390px;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    "A B"
    "C B"
    "D B";
  padding: 0 32px 32px 32px;
`;

const CustomerDetails = styled.div`
  grid-area: C;
  h6 {
    font-family: Poppins;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 8px;
  }
  p {
    font-family: Poppins;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-content: center;
    margin-bottom: 8px;
    svg {
      margin-right: 8px;
    }
  }
`;

export default SPAdd;
