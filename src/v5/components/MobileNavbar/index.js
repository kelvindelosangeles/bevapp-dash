import React, { useState } from "react";
import styled from "styled-components";
import MobileSidebar from "./subComponents/MobileSidebar";
import { Menu } from "@material-ui/icons";
import colors from "../../constants/Colors";
const MobileNavbar = () => {
    const [open, setOpen] = useState(false);
    const toggleSidebar = () => {
        setOpen((prevState) => {
            return !prevState;
        });
    };
    return (
        <Component>
            <MobileSidebar open={open} toggleSidebar={toggleSidebar} />
            <div className='menu-button bevapp-icon' onClick={toggleSidebar}>
                <Menu />
            </div>
        </Component>
    );
};
const Component = styled.div`
    background-color: ${colors.white};
    padding: 24px;
    margin-bottom: 40px;
    display: flex;
    .menu-button {
        cursor: pointer;
    }
    @media (min-width: 768px) {
        display: none;
    }
`;
export default MobileNavbar;
