import React from "react";
import styled from "styled-components";

const CartHeader = () => {
    return (
        <Container>
            <h5>ID</h5>
            <h5>Quantity</h5>
            <h5>Description</h5>
            <h5>Cost</h5>
            <h5>Sp. Price</h5>
            <h5>Total</h5>
            <span></span>
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    padding: 0 16px;
    grid-column-gap: 16px;
    grid-template-columns: 1fr 1fr 3fr 1fr 1fr 1fr 20px;
`;

export default CartHeader;
