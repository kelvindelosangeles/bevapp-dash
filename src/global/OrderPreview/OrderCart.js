import React from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { Order as OrderModel } from "../../Models/Order";

const OrderCart = ({ cart, readOnly = false, customer }) => {
    const cartArray = Object.values(cart).map((item) => {
        return <CartItem item={item} key={item.id} readOnly={readOnly} customer={customer} />;
    });

    return (
        <OrderCartWrapper>
            <header>
                <h6>Order</h6>
                <h6>Cost</h6>
            </header>
            <main>{cartArray}</main>
            <footer>
                <h6>Total Cases</h6>
                <h6>{OrderModel.CalculateCases(cart)}</h6>
            </footer>
            <footer>
                <h6>Total Cost</h6>
                <h6>${OrderModel.CalculateCart(cart, customer.specialPrices)}</h6>
            </footer>
        </OrderCartWrapper>
    );
};

const OrderCartWrapper = styled.section`
    header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
    }
    h6 {
        font-weight: 700;
        font-size: 16px;
    }
    main {
        margin-bottom: 40px;
    }
    footer {
        display: flex;
        padding: 12px 0;
        justify-content: space-between;
    }
`;

export default OrderCart;
