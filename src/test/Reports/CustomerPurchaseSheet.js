import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import moment from "moment";
import { Order as OrderModel } from "../../Models/Order";

const TheCustomer = "1230";
const theDate = "06/01/2020";

const CustomerPurchaseSheet = () => {
    let ordersCombined = {};
    const orders = useSelector((state) => state.Firestore.data.orders);
    // Create a list of all orders
    Object.values(orders).forEach((i) => {
        Object.assign(ordersCombined, i);
    });

    const allOrders = Object.values(ordersCombined);

    // console.log(allOrders);

    console.log(allOrders);

    const data = allOrders
        .filter((i) => {
            return i.customer.address.includes(TheCustomer);
        })
        .filter((a) => {
            return moment(a.details.createdAt).isAfter(moment(theDate));
        });

    const RouteTotal = () => {
        try {
            return data
                .map((i) => {
                    return parseFloat(OrderModel.CalculateCart(i.cart, i.customer.specialPrices));
                })
                .reduce((a, b) => {
                    return a + b;
                })
                .toFixed(2);
        } catch (error) {
            console.log(error);
        }
    };
    const RouteCases = () => {
        try {
            return data
                .map((i) => {
                    return parseInt(OrderModel.CalculateCases(i.cart));
                })
                .reduce((a, b) => {
                    return a + b;
                });
        } catch (error) {
            console.log(error);
        }
    };

    data.map((i) => {
        console.log(i.customer.address);
    });

    return (
        <Component>
            <header>
                <p className='header'>
                    Customer: <span>{data[1].customer.address || "No Customers Found"}</span>
                </p>
                <p className='header'>
                    Orders after : <span>{moment(theDate).format("L")}</span>
                </p>
            </header>

            <div className='grid'>
                <div className='item head'>
                    <h3>Order #</h3>
                    <h3>Date</h3>
                    <h3>Cases</h3>
                    <h3>Total</h3>
                </div>
                {data.map((x) => {
                    return (
                        <div className='item '>
                            <p>{x.details.orderID}</p>
                            <p>{x.details.createdAt}</p>
                            <p>{OrderModel.CalculateCases(x.cart)}</p>
                            <p>$ {OrderModel.CalculateCart(x.cart, x.customer.specialPrices)}</p>
                        </div>
                    );
                })}
            </div>
            <div className='footer'>
                <p>
                    Total Cases: <span>{RouteCases()}</span>
                </p>
                <p>
                    Total: <span>${RouteTotal()}</span>
                </p>
            </div>
        </Component>
    );
};
const Component = styled.div`
    padding: 32px;
    header {
        display: flex;
        justify-content: space-between;
        .header {
            font-size: 20px;
            margin-bottom: 64px;
            span {
                font-weight: 600;
                text-transform: uppercase;
            }
        }
    }
    .grid {
        .item.head {
            h3 {
                font-weight: 600 !important;
                padding: 0 8px;
            }
            margin-bottom: 24px;
        }
        .item {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            p {
                padding: 16px 8px;
                border: 1px solid black;
            }
        }
    }
    .footer {
        margin-top: 40px;
        display: grid;
        grid-row-gap: 24px;
        p {
            font-size: 18px;
            span {
                font-weight: 700;
            }
        }
    }
`;
export default CustomerPurchaseSheet;
