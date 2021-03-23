import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const MobileSidebar = ({ open, toggleSidebar }) => {
    return (
        <Component open={open}>
            <p onClick={toggleSidebar}>close sidebar</p>
            <NavLink to='dashboard'>The Mobile Sidebar</NavLink>
        </Component>
    );
};
const Component = styled.div`
    background-color: red;
    position: absolute;
    left: ${({ open }) => (open ? 0 : "-100%")};
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    transition: left 300ms ease-in-out;
`;
export default MobileSidebar;
