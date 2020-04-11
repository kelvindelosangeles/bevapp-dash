import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Colors } from "../../../../Constants/Colors";
import { Order as OrderModel } from "../../../../Models/Order";
import CaseIcon from "../../../../Assets/Icons/CaseIcon";
import MoneyIcon from "@material-ui/icons/AttachMoneyRounded";

const Order = ({ order, dispatch, activeOrder }) => {
    const viewHandler = () => {
        dispatch({
            type: "SET_ACTIVE_ORDER",
            order: order,
        });
    };
    const clearHandler = () => {
        dispatch({
            type: "CLEAR_ORDER",
        });
    };

    const activeOrderID = activeOrder ? activeOrder.details.orderID : null;
    const OrderIsActive = activeOrderID == order.details.orderID;

    return (
        <OrderWrapper active={OrderIsActive} onClick={OrderIsActive ? clearHandler : viewHandler}>
            <div>
                <h6>{order.details.orderID.slice(6)}</h6>
                <p>{order.details.createdAt}</p>
            </div>
            <h6>{order.customer.address}</h6>
            <h6>
                <CaseIcon /> {OrderModel.CalculateCases(order.cart)}
            </h6>
            <h6>$ {OrderModel.CalculateCart(order.cart, order.customer.specialPrices)} </h6>
        </OrderWrapper>
    );
};

const OrderWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr minmax(200px, 2fr) 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 48px;
    padding: 24px;
    border-bottom: 1px solid ${Colors.lightGrey};
    background-color: ${(props) => {
        return props.active && Colors.lightGrey;
    }};
    cursor: pointer;
    :last-of-type {
        border-bottom: none;
    }
    :hover {
        background-color: ${Colors.lightGrey};
        transition: all ease-in-out;
    }
    div {
        display: flex;
        flex-direction: column;
    }
    h6 {
        font-weight: 600;
        color: "#000000";
        font-size: 16px;
        text-transform: capitalize;
        display: flex;
        align-items: flex-start;
        svg {
            margin-right: 12px;
            margin-top: 4px;
        }
    }
    p {
        font-weight: 500;
        color: ${Colors.grey};
        font-size: 12px;
        margin-top: 4px;
    }
    button {
        margin-left: auto;
        width: 114px;
        min-width: 114px;
        height: 40px;
        background-color: ${Colors.blue};
        color: ${Colors.white};

        font-weight: 500;
        font-size: 16px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
    }
`;

const Close = styled.button`
    margin-left: auto;
    width: 114px;
    min-width: 114px;
    height: 40px;
    background-color: ${Colors.red}!important;
    color: ${Colors.white};

    font-weight: 500;
    font-size: 16px;
    border-radius: 4px;
    border: none;
`;

export default connect((state) => {
    return {
        activeOrder: state.DashboardState.activeOrder,
    };
})(Order);
