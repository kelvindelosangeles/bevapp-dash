import React from "react";
import styled from "styled-components";
import CartIcon from "@material-ui/icons/ShoppingBasketRounded";
import { newOrder } from "../../../redux/actions/RapidOrderActions";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import CustomerSelect from "../../../Global/CustomerSelect/CustomerSelect";

const Home = ({ dispatch, customer }) => {
    const customerChangeHandler = (e, value) => {
        return dispatch(newOrder(value));
    };

    return (
        <Component>
            <StyledCartIcon />
            <Title>Select a Customer to Create a New Order</Title>
            <CustomerSelect customerChangeHandler={customerChangeHandler} selectedCustomer={customer} />
        </Component>
    );
};

const Component = styled.div`
    display: grid;
    justify-content: center;
    align-content: flex-start;
    height: calc(var(--vh, 1vh) * 100);
    padding: 24px;
    @media (min-width: 768px) {
        align-content: center;
    }
`;
const StyledCartIcon = styled(CartIcon)`
    justify-self: center;
    font-size: 40px !important;
    margin-bottom: 24px;
    @media (min-width: 768px) {
        font-size: 95px !important;
    }
`;
const Title = styled.p`
    font-weight: 600;
    font-size: 24px;
    text-align: center;
    margin-bottom: 32px;
    @media (min-width: 768px) {
        max-width: 494px;
        font-size: 32px;
    }
`;

export default connect((state) => {
    return {
        customer: state.RapidOrderState.customer,
    };
})(withRouter(Home));
