import React from "react";
import styled from "styled-components";
import { PageTitle, GridBlock } from "../../../Global/Layout/StyledElements";
import AddressIcon from "@material-ui/icons/BusinessRounded";
import DeleteIcon from "@material-ui/icons/DeleteRounded";

import CustomerSelect from "../../../Global/CustomerSelect/CustomerSelect";
import { Colors } from "../../../Constants/Colors";

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
      <StyledCustomer>
        <h6>Beverage ID</h6>
        <h6>Sales Price</h6>
        <h6>Special Price</h6>
        <h6>Margin</h6>
        <h6>Last Edited</h6>
        <span />
        <p>AMS12B</p>
        <p>$ 34.99</p>
        <p>$ 32.99</p>
        <p>$ 2.00</p>
        <p>03/20/2020</p>
        <DeleteIcon />
        <p>AMS12B</p>
        <p>$ 34.99</p>
        <p>$ 32.99</p>
        <p>$ 2.00</p>
        <p>03/20/2020</p>
        <DeleteIcon />
        <p>AMS12B</p>
        <p>$ 34.99</p>
        <p>$ 32.99</p>
        <p>$ 2.00</p>
        <p>03/20/2020</p>
        <DeleteIcon />
        <p>AMS12B</p>
        <p>$ 34.99</p>
        <p>$ 32.99</p>
        <p>$ 2.00</p>
        <p>03/20/2020</p>
        <DeleteIcon />
      </StyledCustomer>
      <SPControls>
        <CustomerSelect />
        <AddItem>
          <p>Add An Item</p>
          <form>
            <input placeholder="AMS12B" />
          </form>
        </AddItem>
        <SubmitButton> Submit</SubmitButton>
      </SPControls>
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
  margin-bottom: 64px;
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

const StyledCustomer = styled.div`
  grid-area: D;
  display: grid;
  grid-template-areas: "A A A A A A";
  align-content: flex-start;
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

const SPControls = styled.div`
  grid-area: B;
  display: flex;
  flex-direction: column;
  padding: 24px;
`;

const AddItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
  p {
    font-family: Poppins;
    font-weight: 500;
    font-size: 16px;
    margin-right: 16px;
  }
  input {
    padding: 10px 24px;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 600;
    background-color: ${Colors.lightGrey};
    border: none;
    border-radius: 4px;
    max-width: 117px;
    text-align: center;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px 0;
  background-color: ${Colors.purple};
  border-radius: 4px;
  border: none;
  color: ${Colors.white};
  font-family: Poppins;
  font-weight: 700;
  font-size: 18px;
  margin-top: auto;
`;

export default SPAdd;
