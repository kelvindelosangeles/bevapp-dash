import React from "react";

import styled from "styled-components";
import moment from "moment";
import UserIcon from "@material-ui/icons/PeopleAlt";

import { Colors } from "../../Constants/Colors";

const AppHeader = () => {
  const theDate = moment().format("dddd,  MMM Do YYYY");

  return (
    <AppHeaderWrapper>
      <TodaysDate>{theDate}</TodaysDate>
      <User>
        <UserIcon />
        <div>
          <h6>Kelvin De Los Angeles</h6>
          <p>Admin</p>
        </div>
      </User>
    </AppHeaderWrapper>
  );
};

const AppHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
  width: 100%;
  padding: 0 32px;
  background-color: ${Colors.white};
`;

const TodaysDate = styled.p`
  font-family: "AvenirNext-Regular", "Avenir Next", serif;
  color: ${Colors.black};
  font-size: 12px;
`;

const User = styled.div`
  display: flex;
  h6 {
    font-family: "AvenirNext-DemiBold", "Avenir Next", serif;
    font-size: 14px;
  }
  p {
    font-family: "AvenirNext-Regular", "Avenir Next", serif;
    color: ${Colors.greyText};
    font-size: 12px;
  }
  svg {
    font-size: 18px;
    margin-right: 8px;
  }
`;

export default AppHeader;
