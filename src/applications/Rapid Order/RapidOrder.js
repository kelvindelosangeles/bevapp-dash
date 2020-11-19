import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Colors } from "../../Constants/Colors";
import Home from "./Components/Home";
import NewOrder from "./Components/NewOrder/NewOrder";
import AddToCart from "./Components/AddToCart/AddToCart";
import AddtoCartFlavors from "./Components/AddToCart/AddtoCartFlavors";
import MobileNewOrder from "../../componentsv3/mobile new order";

const RapidOrder = ({ atcVisible, atcfVisible, customer, dispatch }) => {
    return (
        <Container>
            {customer ? (
                <>
                    {/* Depending on the screen size it shows either of the two compoents. */}
                    <MobileNewOrder /> <NewOrder />
                </>
            ) : (
                <Home />
            )}
            {atcVisible && <AddToCart />}
            {atcfVisible && <AddtoCartFlavors />}
        </Container>
    );
};

const Container = styled.div`
    grid-area: app;
    position: relative;
    background-color: ${Colors.white};
    overflow: scroll;
`;

export default connect((state) => {
    return {
        atcVisible: state.RapidOrderState.atcVisible,
        atcfVisible: state.RapidOrderState.atcfVisible,
        customer: state.RapidOrderState.customer,
    };
})(RapidOrder);
