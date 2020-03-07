import React from "react";

import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { Colors } from "../../Constants/Colors";

import DashboardIcon from "@material-ui/icons/Dashboard";
import BoltIcon from "@material-ui/icons/OfflineBolt";
import StoreIcon from "@material-ui/icons/Store";
import SpePricingIcon from "@material-ui/icons/MoneyOff";
import SignoutIcon from "@material-ui/icons/ExitToApp";
import ExpandIcon from "@material-ui/icons/AspectRatioRounded";
import { connect } from "react-redux";

const Sidebar = props => {
  const expand = () => {
    props.dispatch({
      type: "TOGGLE_EXPAND"
    });
  };

  return (
    <SidebarWrapper expand={props.sidebarExpanded}>
      <StyledExpandIcon onClick={expand} />
      <AppTitle expand={props.sidebarExpanded}>
        <h3>Bevapp Dash</h3>
        <p>v 1.0.0</p>
      </AppTitle>

      <NavWrapper expand={props.sidebarExpanded}>
        <NavLink to="/dashboard">
          <DashboardIcon /> <p>Dashboard</p>
        </NavLink>
        <NavLink to="/rapidorder">
          <BoltIcon /> <p>Rapid Order</p>
        </NavLink>
        <NavLink to="/store">
          <StoreIcon /> <p>Store</p>
        </NavLink>
        <NavLink to="/specialpricing">
          <SpePricingIcon /> <p>Special Pricing</p>
        </NavLink>
      </NavWrapper>

      <Signout
        onClick={() => console.log("logged out")}
        expand={props.sidebarExpanded}
      >
        <p>Signout</p>
        <SignoutIcon />
      </Signout>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  grid-area: sidebar;
  position: relative;
  background-color: ${Colors.red};
  height: 100%;
  min-width: ${({ expand }) => {
    return expand ? "249px" : "0";
  }};
  padding: 80px 24px;
  padding: ${({ expand }) => {
    return expand ? "80px 40px" : "80px 24px ";
  }};

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AppTitle = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 160px;
  h3,
  p {
    font-family: "AvenirNext-Bold";
    color: ${Colors.white};
    font-size: 18px;
  }
  h3 {
    display: ${({ expand }) => {
      return expand ? "block" : "none";
    }};
  }
  p {
    font-size: 8px;
    margin-left: 8px;
    margin-bottom: 4px;
    white-space: nowrap;
    margin: ${({ expand }) => {
      return !expand && 0;
    }};
    font-size: ${({ expand }) => {
      return expand ? "8px" : "16px";
    }};
  }
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  a {
    font-family: "AvenirNext-DemiBold";
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    cursor: pointer;
    text-decoration: none;
    color: ${Colors.white};
    justify-content: ${({ expand }) => {
      return !expand && "center";
    }};
  }
  svg {
    margin-right: ${({ expand }) => {
      return expand ? "16px" : "0";
    }};
  }
  p {
    display: ${({ expand }) => {
      return expand ? "block" : "none";
    }};
    font-size: 14;
  }
`;

const Signout = styled.div`
  font-family: "AvenirNext-DemiBold";
  color: ${Colors.white};
  font-size: 14;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: ${({ expand }) => {
    return expand ? "left" : "center";
  }};
  p {
    display: ${({ expand }) => {
      return expand ? "block" : "none";
    }};
    margin-right: 16px;
  }
`;

const StyledExpandIcon = styled(ExpandIcon)`
  position: absolute;
  top: 8px;
  right: 8px;
  color: ${Colors.white};
  cursor: pointer;
  :hover {
    transform: scale(1.2);
  }
`;

export default connect(state => {
  return {
    sidebarExpanded: state.GlobalState.sidebarExpanded
  };
})(Sidebar);
