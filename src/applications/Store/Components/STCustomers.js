import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";
import { connect } from "react-redux";

const formatTel = tel => {
  return `(${tel.slice(0, 3)}) ${tel.slice(3, 6)} ${tel.slice(6, 10)} `;
};

const STCustomers = ({ customers }) => {
  const [customerSearch, setCustomerSearch] = useState("");
  const customerSearchHandler = e => {
    setCustomerSearch(e.target.value);
  };

  const customersList = Object.values(customers)
    .filter(i => {
      return i.name && i.address.includes(customerSearch);
    })
    .map(i => {
      return (
        i.name && (
          <Xstomer>
            <p>{i.name}</p>
            <p>{i.address}</p>
            <p> {formatTel(i.telephone)}</p>
          </Xstomer>
        )
      );
    });

  return (
    <CustomersWrapper>
      <CustomerSearch onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search"
          onChange={customerSearchHandler}
          value={customerSearch}
        />
      </CustomerSearch>
      <CustomersContainer>{customersList}</CustomersContainer>
    </CustomersWrapper>
  );
};

const CustomersWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const CustomerSearch = styled.form`
  width: 100%;
  input {
    border-radius: 6px;
    background-color: ${Colors.white};
    border: none;
    width: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 24px;
    margin-bottom: 24px;
    ::placeholder {
      font-family: "Poppins";
      font-weight: 500;
      color: "#777777";
      font-size: 17px;
    }
  }
`;
const CustomersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 16px;
  align-content: flex-start;
  border-radius: 4px;
  background-color: ${Colors.white};
  height: 100%;
  width: 100%;
  padding: 24px;
  overflow: scroll;
`;
const Xstomer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 16px;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid ${Colors.grey};
  p {
    font-family: Poppins;
    font-weight: 600;
    font-size: 15px;
    text-transform: capitalize;
  }
`;

export default connect(state => {
  return {
    customers: state.Firestore.ordered.store[0]
  };
})(STCustomers);
