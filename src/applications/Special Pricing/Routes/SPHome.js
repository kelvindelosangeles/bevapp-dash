import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import AddIcon from "@material-ui/icons/AddBoxRounded";
import { PageTitle } from "../../../Global/Layout/StyledElements";
import { Colors } from "../../../Constants/Colors";

const SPHome = () => {
  const customersArray = (
    <StyledCustomer>
      <h5>Customer Name</h5>
      <h6>Beverage ID</h6>
      <h6>Sales Price</h6>
      <h6>Special Price</h6>
      <h6>Margin</h6>
      <h6>Last Edited</h6>
      <p>AMS12B</p>
      <p>$ 34.99</p>
      <p>$ 32.99</p>
      <p>$ 2.00</p>
      <p>03/20/2020</p>
    </StyledCustomer>
  );

  return (
    <Grid>
      <PageTitle gridArea="A">Special Pricing Home</PageTitle>
      <AddSPButton to={"/specialpricing/add"}>
        <p>Add a Special Price</p>
        <AddIcon />
      </AddSPButton>
      <SearchBar placeholder="Kelvin" />
      <CustomersGrid>
        <div className="wrapper">
          {customersArray}
          {customersArray}
          {customersArray}
          {customersArray}
        </div>
      </CustomersGrid>
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
    "D D";
  padding: 0 32px 32px 32px;
  padding-bottom: 0;
`;
const SearchBar = styled.input`
  grid-area: C;
  background-color: red;
  width: 100%;
  padding: 8px 16px;
  font-family: Poppins;
  font-size: 16px;
  background-color: ${Colors.lightGrey};
  border-radius: 4px;
  border: none;
  margin-bottom: 56px;
`;
const AddSPButton = styled(Link)`
  grid-area: B;
  align-self: center;
  justify-self: center;
  display: flex;
  align-items: center;
  padding: 18px;
  border-radius: 4px;
  color: ${Colors.white};
  background-color: ${Colors.purple};
  text-decoration: none;
  cursor: pointer;
  p {
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    margin-right: 16px;
  }
`;
const CustomersGrid = styled.div`
  /* TODO: Explore doing this without a wrapper */
  grid-area: D;
  position: relative;
  .wrapper {
    padding: 32px 0;
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: scroll;
    display: grid;
    grid-row-gap: 64px;
    align-content: flex-start;
  }
`;
const StyledCustomer = styled.div`
  display: grid;
  grid-template-areas:
    "A A A A A"
    "B B B B B";
  h5 {
    grid-area: A;
    font-family: Poppins;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 24px;
  }
  h6 {
    font-family: Poppins;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 24px;
  }
  p {
    font-family: Poppins;
    font-size: 16px;
    margin-bottom: 8px;
    :last-of-type {
      margin-bottom: 0;
    }
  }
`;

export default SPHome;
