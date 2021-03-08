import React from "react";
import { NavLink, withRouter } from "react-router-dom";
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
import {
    CheckCircle,
    CurrencyCircleDollar,
    CurrencyDollarSimple,
    HouseSimple,
    Lightning,
    MapTrifold,
    Note,
    Notebook,
    PencilSimple,
    Receipt,
    Storefront,
} from "phosphor-react";
import { colors } from "../../Constants/Colors4";

const Sidebar = (props) => {
    const open = useSelector((state) => state.GlobalState.drawerOpen);
    const dispatch = useDispatch();
    const toggleChangeLog = () => {
        dispatch({
            type: "TOGGLE_CHANGE_LOG",
        });
    };

    const MenuItem = ({ children, to, label, color }) => {
        const location = props.location.pathname;

        return (
            <MenuItemComponent to={to} color={color} active={location === to}>
                <div className='icon_wrapper'>{children}</div>
                <p className='label'>{label}</p>
            </MenuItemComponent>
        );
    };

    return (
        <Container>
            <header onClick={toggleChangeLog}>
                <p className='title'>
                    Bevapp Dash <span>v4.2.0</span>
                </p>
                <p className='date'>{moment().format("LL")}</p>
            </header>
            <main>
                <section>
                    <p className='section_label'>Menu</p>
                    <div className='grid'>
                        <MenuItem to='/dashboard' label='Dashboard' color={colors.purple}>
                            <HouseSimple weight='fill' />
                        </MenuItem>
                        <MenuItem to='/rapidorder' label='Rapid Order' color={colors.yellow}>
                            <Lightning weight='fill' />
                        </MenuItem>
                        <MenuItem to='/dashboard/drafts' label='Drafts' color={colors.yellow}>
                            <PencilSimple weight='fill' />
                        </MenuItem>
                        <MenuItem to='/dashboard/routes' label='routes' color={colors.blue}>
                            <MapTrifold weight='fill' />
                        </MenuItem>
                        <MenuItem to='/store/home' label='store' color={colors.orange}>
                            <Storefront weight='fill' />
                        </MenuItem>
                        <MenuItem to='/specialPricing' label='Special Prices' color={colors.orange}>
                            <CurrencyCircleDollar weight='fill' />
                        </MenuItem>
                        <MenuItem to='/dashboard/completedorders' label='completed orders' color={colors.orange}>
                            <CheckCircle weight='fill' />
                        </MenuItem>
                    </div>
                </section>
                <div className='divider'></div>
                <section>
                    <p className='section_label'>Reports</p>
                    <div className='grid'>
                        <MenuItem to='/nor' label='Non order' color={colors.green}>
                            <Note weight='fill' />
                        </MenuItem>
                        <MenuItem to='/cps' label='Purchase Sheet' color={colors.green}>
                            <Receipt weight='fill' />
                        </MenuItem>
                        <MenuItem to='/sobi' label='Sales order by item' color={colors.green}>
                            <Receipt weight='fill' />
                        </MenuItem>
                        <MenuItem to='/dj' label='driver journal' color={colors.green}>
                            <Notebook weight='fill' />
                        </MenuItem>
                        <MenuItem to='/wj' label='weekly journal' color={colors.green}>
                            <Notebook weight='fill' />
                        </MenuItem>
                    </div>
                </section>
            </main>
            <footer></footer>
        </Container>
    );
};

const Container = styled.div`
    display: none;
    @media (min-width: 768px) {
        grid-area: "sidebar";
        background-color: ${colors.black};
        color: ${colors.white};
        padding: 80px 24px 16px 24px;
        display: block;
        height: 100vh;
        overflow: scroll;
        header {
            margin-bottom: 80px;
            margin-left: 8px;
            cursor: pointer;
            .title {
                font-weight: 800;
                font-size: 18px;
                span {
                    font-size: 12px;
                    font-weight: 600;
                    color: ${colors.yellow};
                }
            }
            .date {
                font-size: 12px;
            }
        }
        section {
            .section_label {
                text-transform: uppercase;
                margin-bottom: 24px;
                font-size: 12px;
                margin-left: 8px;
            }
            .grid {
                display: grid;
                grid-row-gap: 8px;
            }
        }
        footer {
            margin-top: 40px;
        }
        .divider {
            margin: 24px 0;
            width: 100%;
            height: 1px;
            background-color: ${colors.highlightGrey};
        }
    }
`;

const MenuItemComponent = styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 8px 24px 8px 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 50ms ease-in-out;
    :hover {
        background-color: ${colors.highlightGrey};
    }
    .icon_wrapper {
        display: flex;
        align-items: center;
        margin-right: 8px;
        background-color: ${({ active, color }) => (active ? color : colors.darkGrey)};
        padding: 8px;
        border-radius: 6px;
        transition: background-color 300ms ease-in-out;
    }
    .label {
        font-size: 16px;
        font-weight: 500;
        text-transform: capitalize;
    }
    .active {
        .icon_wrapper {
            background-color: ${({ color }) => color};
        }
    }
`;

export default withRouter(Sidebar);
