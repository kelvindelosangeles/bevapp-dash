import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../Constants/Colors";
const ResponsiveBlock = () => {
    return (
        <Component>
            <p className='message'>This page is not available for mobile yet. Please visit one of the available pages below</p>
            <NavLink to='/rapidorder'>
                <p className='link'>Go to Rapid Order</p>
            </NavLink>
        </Component>
    );
};
const Component = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: ${Colors.navy};
    position: absolute;
    top: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .message {
        padding: 16px;
        color: ${Colors.white};
        font-size: 18px;
        text-align: center;
        max-width: 400px;
    }
    .link {
        font-size: 24px;
        font-weight: 600;
        text-decoration: underline;
        color: ${Colors.white};
    }
    @media (min-width: 768px) {
        display: none;
    }
`;
export default ResponsiveBlock;
