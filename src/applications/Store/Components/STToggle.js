import React from "react";
import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";

const STToggle = ({ storeToggle, toggleStore }) => {
  return (
    <StoreToggleWrapper status={storeToggle} onClick={toggleStore}>
      <div id="toggle"></div>
      <p>Beverages</p>
      <p>Customers</p>
    </StoreToggleWrapper>
  );
};

const StoreToggleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  width: 304px;
  margin-bottom: 40px;
  background-color: ${Colors.white};
  border-radius: 4px;
  cursor: pointer;
  #toggle {
    position: absolute;
    left: ${({ status }) => (status ? 0 : "50%")};
    height: 100%;
    width: 50%;
    border-radius: 4px;
    background-color: ${Colors.red};
    z-index: 0;
    transform: scale(1.1);
    transition: all 200ms ease-in-out;
  }
  p {
    padding: 16px 24px;
    font-family: Poppins;
    font-weight: 700;
    font-size: 16px;
    z-index: 2;
    justify-self: center;
    :first-of-type {
      color: ${({ status }) => (status ? Colors.white : Colors.black)};
    }
    :nth-of-type(2) {
      color: ${({ status }) => (!status ? Colors.white : Colors.black)};
    }
  }
`;

export default STToggle;
