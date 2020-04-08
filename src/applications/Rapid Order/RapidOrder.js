import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Colors } from "../../Constants/Colors";

import Home from "./Components/Home";
import NewOrder from "./Components/NewOrder/NewOrder";
import AddToCart from "./Components/AddToCart/AddToCart";
import AddtoCartFlavors from "./Components/AddToCart/AddtoCartFlavors";

const RapidOrder = ({ atcVisible, atcfVisible, customer }) => {
    return (
        <Container>
            {customer ? <NewOrder /> : <Home />}
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
