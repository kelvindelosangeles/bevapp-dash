import React from "react";

import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { Colors } from "../../Constants/Colors";

import DashboardIcon from "@material-ui/icons/Dashboard";
import BoltIcon from "@material-ui/icons/OfflineBolt";
import StoreIcon from "@material-ui/icons/Store";
import SpePricingIcon from "@material-ui/icons/MoneyOff";
import SignoutIcon from "@material-ui/icons/ExitToApp";

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <AppTitle>
        <h3>Bevapp Dash</h3>
        <p>v 1.0.0</p>
      </AppTitle>

      <NavWrapper>
        <NavLink to="/dashboard">
          <DashboardIcon /> Dashboard
        </NavLink>
        <NavLink to="/rapidorder">
          <BoltIcon /> Rapid Order
        </NavLink>
        <NavLink to="/store">
          <StoreIcon /> Store
        </NavLink>
        <NavLink to="#">
          <SpePricingIcon /> Special Pricing
        </NavLink>
      </NavWrapper>

      <Signout onClick={() => console.log("logged out")}>
        <p>Signout</p>
        <SignoutIcon />
      </Signout>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  background-color: ${Colors.red};
  height: 100%;
  min-width: 249px;
  padding-top: 80px;
  padding-bottom: 80px;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
`;

const AppTitle = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 160px;
  h3,
  p {
    font-family: "AvenirNext-Bold", "Avenir Next", serif;
    color: ${Colors.white};
    font-size: 18px;
  }
  p {
    font-size: 8px;
    margin-left: 8px;
    margin-bottom: 4px;
  }
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  a {
    font-family: "AvenirNext-DemiBold", "Avenir Next", serif;
    color: ${Colors.white};
    font-size: 14;
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    cursor: pointer;
  }
  svg {
    margin-right: 16px;
  }
`;

const Signout = styled.div`
  font-family: "AvenirNext-DemiBold", "Avenir Next", serif;
  color: ${Colors.white};
  font-size: 14;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  p {
    margin-right: 16px;
  }
`;

export default Sidebar;
