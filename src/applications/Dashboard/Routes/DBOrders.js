import React, { useEffect } from "react";
import styled from "styled-components";
import DBStatBar from "../Components/DBStatBar";
import { connect, useSelector } from "react-redux";
import { Colors } from "../../../Constants/Colors";
import Order from "../Components/Order";
import moment from "moment";

const DBOrders = ({ activeOrder, dispatch }) => {
    const orders = useSelector((state) => state.Firestore.data.orders.orders);

    const ordersToday = Object.values(orders)
        .sort((a, b) => {
            return a.details.createdAt > b.details.createdAt ? 1 : -1;
        })
        .filter((c) => {
            return moment(c.details.createdAt).isSameOrBefore(moment());
        })
        .map((x) => {
            return <Order order={x} />;
        });

    const futureOrders = Object.values(orders)
        .sort((a, b) => {
            return a.details.createdAt > b.details.createdAt ? 1 : -1;
        })
        .filter((c) => {
            return moment(c.details.createdAt).isAfter(moment());
        })
        .map((x) => {
            return <Order order={x} />;
        });

    return (
        <Component>
            <DBStatBar />
            <OrderHeader>
                <h6>Order</h6>
                <h6>Store</h6>
                <h6>Cases</h6>
                <h6>Total</h6>
                <h6>Status</h6>
            </OrderHeader>
            <OrdersContainer>
                <div className='scroll-wrapper'>
                    <section>
                        <p className='section-header'>Today</p>
                        {ordersToday}
                    </section>
                    <section>
                        <p className='section-header'>Future Orders</p>
                        {futureOrders}
                    </section>
                </div>
            </OrdersContainer>
        </Component>
    );
};

const Component = styled.div`
    grid-area: app;
    display: grid;
    grid-template-rows: min-content min-content 1fr;
    position: relative;
    height: 100%;
`;
const OrderHeader = styled.div`
    background-color: white;
    display: grid;
    grid-template-columns: 120px 310px 1fr 1fr 1fr;
    grid-column-gap: 32px;
    padding: 24px;
    border-radius: 8px 0 0 0;
    border-bottom: 1px solid ${Colors.lightGrey};
    h6 {
        font-weight: 600;
        font-size: 16px;
        color: #999999;
    }
`;
const OrdersContainer = styled.div`
    position: relative;
    .scroll-wrapper {
        background-color: ${Colors.white};
        padding: 24px 0;
        position: absolute;
        height: 100%;
        width: 100%;
        overflow: scroll;
        section {
            :first-of-type {
                margin-bottom: 64px;
            }
            .section-header {
                font-size: 18px;
                font-weight: 700;
                margin-left: 24px;
                margin-bottom: 32px;
                color: ${Colors.red};
            }
        }
    }
`;

export default DBOrders;
