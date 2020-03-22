import React from "react";
import styled from "styled-components";
import { Colors } from "../../Constants/Colors";

export const PageTitle = props => {
  return (
    <StyledPageTitle gridArea={props.gridArea}>
      {props.children}
    </StyledPageTitle>
  );
};
const StyledPageTitle = styled.p`
  grid-area: ${({ gridArea }) => gridArea};
  font-family: Poppins;
  font-size: 24px;
  /* margin-left: 32px; */
  font-weight: 400;
  margin-bottom: 32px;
`;

export const GridBlock = ({ GA }) => {
  return (
    <StyledGridBlock gridArea={GA}>
      <div />
    </StyledGridBlock>
  );
};

const StyledGridBlock = styled.div`
  grid-area: ${({ gridArea }) => gridArea};
  height: 100%;
  width: 100%;
  padding: 8px;
  div {
    min-height: 8px;
    min-width: 8px;
    border-radius: 4px;
    height: 100%;
    width: 100%;
    background-color: rgb(
      ${Math.floor(Math.random() * 240 + 1)},
      ${Math.floor(Math.random() * 240 + 1)},
      ${Math.floor(Math.random() * 240 + 1)}
    );
  }
`;
