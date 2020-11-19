import { Menu, MenuItem } from "@material-ui/core";
import { Assessment, MoneyOff, OfflineBolt, Store, InsertChart, KeyboardArrowDown, Note, LocalShipping, CheckCircle } from "@material-ui/icons";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../Constants/Colors";

const WebNavbar = () => {
    const Link = ({ to, icon = null, label }) => {
        return (
            <LinkComponent to={to}>
                {icon}
                <p>{label}</p>
            </LinkComponent>
        );
    };
    const DropDown = ({ icon, label, menuItems = [] }) => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        return (
            <DropdownComp>
                <LinkComponent to='#' aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick}>
                    {icon}
                    <p>{label}</p>
                    <KeyboardArrowDown />
                </LinkComponent>
                <Menu id='simple-menu' anchorEl={anchorEl} keepMounted={false} open={Boolean(anchorEl)} onClose={handleClose}>
                    {menuItems.map((a) => (
                        <MenuItem onClick={handleClose}>{a}</MenuItem>
                    ))}
                </Menu>
            </DropdownComp>
        );
    };

    return (
        <Component>
            <p className='logo'>Bevapp</p>
            <div className='links'>
                <DropDown
                    label='Dashboard'
                    icon={<Assessment />}
                    menuItems={[
                        <Link to='/dashboard' label='Dashboard' icon={<Assessment />} />,
                        <Link to='/dashboard/Drafts' label='Drafts' icon={<Note />} />,
                        <Link to='/dashboard/Routes' label='Routes' icon={<LocalShipping />} />,
                        <Link to='/dashboard/completedOrders' label='Completed Orders' icon={<CheckCircle />} />,
                    ]}
                />
                <Link to='/rapidorder' label='Rapid Order' icon={<OfflineBolt />} />
                <Link to='/store' label='Store' icon={<Store />} />
                <Link to='/specialPricing' label='Special Pricing' icon={<MoneyOff />} />
                <Link to='/reports' label='Reports' icon={<InsertChart />} />
            </div>
        </Component>
    );
};
const Component = styled.div`
    display: none;
    background-color: ${Colors.white};
    padding: 16px;
    grid-template-columns: min-content 1fr;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid ${Colors.lightGrey};
    .logo {
        font-size: 20px;
        font-weight: 700;
    }
    .links {
        display: flex;
        justify-content: flex-end;
    }
    @media (min-width: 768px) {
        display: grid;
    }
`;
const LinkComponent = styled(NavLink)`
    padding: 8px 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    color: ${Colors.black};
    :hover {
        color: ${Colors.blue};
    }
    p {
        white-space: nowrap;
        font-weight: 500;
    }
    svg {
        :first-of-type {
            margin-right: 8px;
        }
    }
`;
const DropdownComp = styled.div``;
export default WebNavbar;

// TODO:
// Fix User Experience on openning and close dropdown menus
