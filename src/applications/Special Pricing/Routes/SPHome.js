import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomerSelect from "../../../Global/CustomerSelect/CustomerSelect";
import { Order as OrdersModel } from "../../../Models/Order";

import { PageTitle } from "../../../Global/Layout/StyledElements";
import { Colors } from "../../../Constants/Colors";

const SPHome = ({ history, customers, beverages }) => {
  const customersWithSpecialPrices = () => {
    return Object.values(customers)
      .filter(i => {
        return i.specialPrices;
      })
      .map(x => {
        // First map is for the customer name
        const items = Object.values(x.specialPrices).map(i => {
          // second map is for the special item details
          return (
            <React.Fragment>
              <p>{i.id}</p>
              <p>$ {beverages[i.id].price}</p>
              <p>$ {parseFloat(i.price).toFixed(2)}</p>
              <p>$ {OrdersModel.CalcMargin(beverages[i.id].price, i.price)}</p>
              <p>{i.date}</p>
            </React.Fragment>
          );
        });
        const goToCustomer = () => {
          history.push(`/specialpricing/add/${x.id}`);
        };

        return (
          <StyledCustomer>
            <h5 onClick={goToCustomer}>{x.name}</h5>
            <h6>Beverage ID</h6>
            <h6>Sales Price</h6>
            <h6>Special Price</h6>
            <h6>Margin</h6>
            <h6>Last Edited</h6>
            {items}
          </StyledCustomer>
        );
      });
  };

  const customerChangeHandler = (e, value) => {
    return value !== null && history.push(`/specialpricing/add/${value.id}`);
  };

  return (
    <Grid>
      <PageTitle gridArea="A">Special Pricing Home</PageTitle>
      <AddSPButton>
        <p>Add a Special Price</p>
        <CustomerSelect customerChangeHandler={customerChangeHandler} />
      </AddSPButton>
      <SearchBar placeholder="Search" />
      <CustomersGrid>
        <div className="wrapper">{customersWithSpecialPrices()}</div>
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
const AddSPButton = styled.div`
  grid-area: B;
  align-self: center;
  justify-self: end;
  width: 90%;
  align-items: center;
  padding: 18px;
  border-radius: 4px;
  p {
    justify-content: center;
    display: flex;
    align-items: center;
    font-family: Poppins;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 16px;
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
    text-transform: uppercase;
    cursor: pointer;
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

export default connect(state => {
  return {
    customers: state.Firestore.data.store.customers,
    beverages: state.Firestore.data.inventory.beverages
  };
})(withRouter(SPHome));
