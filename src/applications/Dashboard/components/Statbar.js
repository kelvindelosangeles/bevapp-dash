import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Order as OrderModel } from "../../../Models/Order";
import { Colors } from "../../../Constants/Colors";

const Statbar = () => {
    const orders = useSelector((state) => state.Firestore.data.ordersv2.orders);
    // TODO: Consider consolidating calls for 2 sets of orders folders, the orders and completed orders
    // FIXME: For now it will only use the data from the orders data set

    // FIXME: Move this to a model
    const totalCases = () => {
        try {
            return Object.values(orders)
                .map((i) => {
                    return OrderModel.CalculateCases(i.cart);
                })
                .reduce((a, b) => a + b);
        } catch (error) {
            console.log(error);
            return "err";
        }
    };

    return (
        <Component>
            <Stat color={Colors.blue}>
                <p>New Orders</p>
                <span>{Object.values(orders).length}</span>
            </Stat>
            <Stat color={Colors.green}>
                <p>Daily Revenue</p>
                <span>{OrderModel.CalculateRevenue(orders)}</span>
            </Stat>
            <Stat color={Colors.orange}>
                <p>Daily Cases</p>
                <span>{totalCases()}</span>
            </Stat>
        </Component>
    );
};

const Component = styled.div`
    padding: 24px 60px;
    display: grid;
    grid-column-gap: 60px;
    grid-template-columns: repeat(auto-fill, minmax(min-content, 100px));
`;

const Stat = styled.div`
    display: grid;
    grid-row-gap: 8px;
    justify-items: center;
    color: ${Colors.white};
    p {
        white-space: nowrap;
        font-size: 16px;
    }
    span {
        font-size: 24px;
        font-weight: 800;
        color: ${({ color }) => color};
    }
`;

export default Statbar;
