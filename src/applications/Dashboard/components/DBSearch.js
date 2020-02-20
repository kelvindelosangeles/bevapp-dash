import React from "react";

import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";

const DBSearch = () => {
  return (
    <DBSearchWrapper>
      <input type="text" placeholder="Search" />
    </DBSearchWrapper>
  );
};

const DBSearchWrapper = styled.form`
  margin-bottom: 32px;
  input {
    /* height: 40px; */
    border-radius: 6px;
    background-color: ${Colors.white};
    border: none;
    width: 100%;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 24px;
    ::placeholder {
      font-family: "AvenirNext-Medium", "Avenir Next", serif;
      color: "#777777";
      font-size: 17px;
    }
    /* TODO: Fix cursor size, doesnt look right in safari,  */
  }
`;

export default DBSearch;
