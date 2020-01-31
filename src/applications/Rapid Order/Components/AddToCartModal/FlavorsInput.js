import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../../constants/Colors";

const FlavorsInput = ({ FlavorChangeHandler, flavorsQuantity, name }) => {
  return (
    <FlavorsInputWrapper>
      <input
        type="number"
        min="0"
        max="999"
        placeholder="0"
        autoComplete="off"
        name={name}
        value={flavorsQuantity[name]}
        onChange={FlavorChangeHandler}
      />
      <div>x</div>
      <p>{name}</p>
    </FlavorsInputWrapper>
  );
};

const FlavorsInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  input {
    padding: 4px;
    text-align: center;
    font-family: AvenirNext-Bold;
    font-size: 18px;
    border: 2px solid ${Colors.black};
    border-radius: 4px;
    margin-right: 16px;
    margin-left: 32px;
    color: transparent;
    text-shadow: 0 0 0 ${Colors.black};
    ::placeholder {
      color: ${Colors.black};
    }
  }
  div {
    margin-right: 16px;
    font-family: AvenirNext-Bold;
  }
  p {
    font-family: AvenirNext-Demibold;
    font-size: 18px;
    text-transform: capitalize;
  }
`;
export default React.memo(FlavorsInput);
