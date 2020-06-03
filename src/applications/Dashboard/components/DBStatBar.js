import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Order as OrdersModel } from "../../../Models/Order";
import { Colors } from "../../../Constants/Colors";
import CaseIcon from "../../../Assets/Icons/CaseIcon";

const DBStatBar = ({ orders }) => {
    const newOrdersCount = Object.values(orders).filter((i) => {
        // because were using the ordered dataset and it inlcudes an id
        return i.details && i.details.complete === false;
    }).length;

    const TotalCases = () => {
        try {
            return Object.values(orders)
                .map((i) => {
                    return OrdersModel.CalculateCases(i.cart);
                })
                .reduce((a, b) => {
                    return a + b;
                });
        } catch (err) {
            console.log("No Orders to calculate cart for");
            console.log(err);
            return "0";
        }
    };

    return (
        <DBStatBarWrapper>
            <Stat color={Colors.blue}>
                <h6>New Orders</h6>
                <p>{newOrdersCount}</p>
            </Stat>
            <Stat color={Colors.green}>
                <h6>Daily Revenue</h6>
                <p>{Object.values(orders).length > 0 && "$ " + OrdersModel.CalculateRevenue(orders)}</p>
            </Stat>
            <Stat color={Colors.purple}>
                <h6>Total Cases</h6>
                {Object.values(orders).length > 0 && (
                    <p>
                        <CaseIcon /> {TotalCases()}
                    </p>
                )}
            </Stat>
            {/* <Completed to='/dashboard/completedorders'>Completed Orders</Completed> */}
        </DBStatBarWrapper>
    );
};

const DBStatBarWrapper = styled.div`
    grid-area: statbar;
    display: flex;
    align-items: center;
    height: 129px;
    margin: 24px;
`;
const Stat = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background-color: ${Colors.white};
    justify-content: space-between;
    padding: 32px 16px;
    border-radius: 8px;
    margin-right: 24px;
    h6 {
        font-weight: 700;
        color: ${Colors.black};
        font-size: 16px;
        margin-bottom: 8px;
        white-space: nowrap;
    }
    p {
        font-weight: 700;
        color: ${(props) => {
            return props.color;
        }};
        font-size: 30px;
    }
`;

const Completed = styled(Link)`
    height: 50%;
    width: 40%;
    background-color: darkslategray;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${Colors.white};

    font-weight: 500;
    font-size: 20px;
    margin-left: auto;
    text-decoration: none;
`;

export default connect((state) => {
    return { orders: state.Firestore.data.orders.orders };
})(DBStatBar);
