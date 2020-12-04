import { AddCircleRounded, BorderColorRounded, CheckCircleRounded, ReceiptRounded, ShoppingBasketRounded } from "@material-ui/icons";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../../../../Constants/Colors";
const Navbar = ({ setView }) => {
    return (
        <Component>
            <div className='icon-wrapper' onClick={() => setView(0)}>
                <AddCircleRounded />
            </div>
            <div className='icon-wrapper' onClick={() => setView(1)}>
                <ShoppingBasketRounded />
            </div>
            <div className='icon-wrapper' onClick={() => setView(2)}>
                <CheckCircleRounded />
            </div>
        </Component>
    );
};
const Component = styled.div`
    border-radius: 12px;
    margin: 8px;
    padding: 10px 16px;
    background-color: ${Colors.blue};
    display: flex;
    justify-content: space-between;
    .icon-wrapper {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
            color: ${Colors.white};
            font-size: 24px;
        }
    }
`;
export default Navbar;
