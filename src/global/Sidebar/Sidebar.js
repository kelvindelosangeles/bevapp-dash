import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { Colors } from "../../Constants/Colors";

import DashboardIcon from "@material-ui/icons/Dashboard";
import BoltIcon from "@material-ui/icons/OfflineBolt";
import StoreIcon from "@material-ui/icons/Store";
import SpePricingIcon from "@material-ui/icons/MoneyOff";
import SignoutIcon from "@material-ui/icons/ExitToApp";
import TaskIcon from "@material-ui/icons/DoneAllRounded";
import Report from "@material-ui/icons/Receipt";
import moment from "moment";

const Sidebar = () => {
    const open = useSelector((state) => state.GlobalState.drawerOpen);
    const dispatch = useDispatch();
    const toggleChangeLog = () => {};
    return (
        <Container>
            <div className='heading' onClick={() => dispatch({ type: "TOGGLE_CHANGE_LOG" })}>
                <h3>Bevapp Dash</h3>
                <h6>{moment().format("dddd, MMM Do, YYYY")}</h6>
            </div>

            <div className='nav-links'>
                <NavLink className='nav-group' to='/dashboard'>
                    <div className='header'>
                        <DashboardIcon /> <p>Dashboard</p>
                    </div>
                    <div className='sublinks'>
                        <Link to='/dashboard'>Orders</Link>
                        <Link to='/dashboard/drafts'>Drafts</Link>
                        <Link to='/dashboard/routes'>Routes</Link>
                        <Link to='/dashboard/completedorders'>Completed Orders</Link>
                    </div>
                </NavLink>
                <NavLink className='nav-group' to='/rapidorder'>
                    <div className='header'>
                        <BoltIcon /> <p>Rapid Order</p>
                    </div>
                </NavLink>
                <NavLink className='nav-group' to='/store'>
                    <div className='header'>
                        <StoreIcon /> <p>Store</p>
                    </div>
                </NavLink>
                <NavLink className='nav-group' to='/specialpricing'>
                    <div className='header'>
                        <SpePricingIcon /> <p>Special Pricing</p>
                    </div>
                </NavLink>
                <NavLink className='nav-group' to='/cpt'>
                    <div className='header'>
                        <Report /> <p>CPT</p>
                    </div>
                </NavLink>
                <NavLink className='nav-group' to='/nor'>
                    <div className='header'>
                        <Report /> <p>NOR</p>
                    </div>
                </NavLink>
            </div>

            <div className='logout-wrapper'>
                <SignoutIcon />
                <p>Logout</p>
            </div>
        </Container>
    );
};

const Container = styled.div`
    grid-area: sidebar;
    display: grid;
    grid-template-rows: min-content min-content 1fr;
    align-content: flex-start;
    background-color: transparent;
    padding: 110px 40px 32px 24px;
    .heading {
        color: ${Colors.white};
        margin-bottom: 94px;
        cursor: pointer;
        h3 {
            white-space: nowrap;
            font-weight: 800;
            font-size: 18px;
            margin-bottom: 8px;
        }
        h6 {
            font-weight: 700;
            font-size: 12px;
        }
    }
    .nav-links {
        display: grid;
        grid-row-gap: 32px;
        p,
        a {
            color: ${Colors.white}!important;
            :hover {
                color: ${Colors.yellow}!important;
            }
        }
        a.nav-group {
            .header {
                display: flex;
            }
            svg {
                grid-area: icon;
                margin-right: 16px;
            }
            p {
                grid-area: main;
                white-space: nowrap;
                font-weight: 700;
            }
            .sublinks {
                margin-top: 16px;
                margin-left: 56px;
                grid-area: sub;
                display: grid;
                grid-row-gap: 16px;
                white-space: nowrap;
                a {
                    color: ${Colors.white};
                }
            }
        }
    }
    .logout-wrapper {
        align-self: flex-end;
        display: flex;
        align-items: center;
        p {
            color: ${Colors.white};
        }
        svg {
            margin-right: 16px;
            color: ${Colors.white};
        }
    }
`;

export default Sidebar;
