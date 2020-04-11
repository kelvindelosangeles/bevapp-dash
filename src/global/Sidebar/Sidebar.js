import React from "react";

import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { Colors } from "../../Constants/Colors";

import DashboardIcon from "@material-ui/icons/Dashboard";
import BoltIcon from "@material-ui/icons/OfflineBolt";
import StoreIcon from "@material-ui/icons/Store";
import SpePricingIcon from "@material-ui/icons/MoneyOff";
import SignoutIcon from "@material-ui/icons/ExitToApp";
import Drawer from "@material-ui/core/Drawer";
import { useSelector, connect } from "react-redux";

const Sidebar = ({ dispatch }) => {
    const open = useSelector((state) => state.GlobalState.drawerOpen);
    const sidebarWidth = open ? "208px" : "0px";
    const toggleChangeLog = () => {
        dispatch({ type: "TOGGLE_CHANGE_LOG" });
    };
    return (
        <Drawer anchor='left' open={open} variant='persistent' style={{ gridArea: "sidebar", width: sidebarWidth }}>
            <Container>
                <AppTitle onClick={toggleChangeLog}>
                    <h3>Bevapp Dash</h3>
                    <p>v 1.1.0</p>
                </AppTitle>

                <NavWrapper>
                    <NavLink to='/dashboard'>
                        <DashboardIcon /> <p>Dashboard</p>
                    </NavLink>
                    <NavLink to='/rapidorder'>
                        <BoltIcon /> <p>Rapid Order</p>
                    </NavLink>
                    <NavLink to='/store'>
                        <StoreIcon /> <p>Store</p>
                    </NavLink>
                    <NavLink to='/specialpricing'>
                        <SpePricingIcon /> <p>Special Pricing</p>
                    </NavLink>
                </NavWrapper>

                <Signout onClick={() => console.log("logged out")}>
                    <p>Signout</p>
                    <SignoutIcon />
                </Signout>
            </Container>
        </Drawer>
    );
};

const Container = styled.div`
    /* grid-area: sidebar; */
    background-color: ${Colors.red};
    height: 100%;
    padding: 80px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const AppTitle = styled.div`
    display: flex;
    align-items: flex-end;
    margin-bottom: 160px;
    cursor: pointer;
    h3,
    p {
        font-weight: 700;
        color: ${Colors.white};
        font-size: 18px;
    }

    p {
        font-size: 8px;
        margin-left: 8px;
        margin-bottom: 4px;
        white-space: nowrap;
        font-size: 8px;
    }
`;
const NavWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    a {
        font-weight: 600;
        display: flex;
        align-items: center;
        margin-bottom: 32px;
        cursor: pointer;
        text-decoration: none;
        color: ${Colors.white};
    }
    svg {
        margin-right: 16px;
    }
    p {
        font-size: 14;
    }
`;
const Signout = styled.div`
    font-weight: 600;
    color: ${Colors.white};
    font-size: 14;
    text-decoration: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: left;
    p {
        margin-right: 16px;
    }
`;

export default connect()(Sidebar);
