import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Order as OrderModel } from "../Models/Order";
import moment from "moment";
import CaseIcon from "../Assets/Icons/CaseIcon";

const orderDateID = "202006231";
const Driver = "House";

const Test = () => {
    const orders = useSelector((state) => state.Firestore.data.orders);
    const ordersFiltered = Object.values(orders[orderDateID]).filter((x) => {
        return (
            x.customer.address.includes("1517") ||
            x.customer.address.includes("1230") ||
            x.customer.address.includes("57") ||
            x.customer.address.includes("840") ||
            x.customer.address.includes("3611") ||
            x.customer.address.includes("1465") ||
            x.customer.address.includes("934") ||
            x.customer.address.includes("574") ||
            x.customer.address.includes("614") ||
            x.customer.address.includes("3661")
        );
    });

    const RouteTotal = () => {
        try {
            return ordersFiltered
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
            return ordersFiltered
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

    // console.log(orders["202006231"]);
    return (
        <Component>
            <div className='header'>
                <p>
                    Driver: <span>{Driver}</span>
                </p>
                <p>Payment Summary</p>
                <p className='date'>{moment("06/01/2020").format("ddd, MMM Do YYYY")}</p>
            </div>
            <div className='grid'>
                <div className='item head'>
                    <h6>Address</h6>
                    <h6>Amounts</h6>
                    <h6>Cases</h6>
                    <h6>Credits</h6>
                    <h6>Checks</h6>
                    <h6>Cash</h6>
                    <h6>Total</h6>
                </div>
                {ordersFiltered.map((i) => {
                    return (
                        <div className='item'>
                            <p>{i.customer.address}</p>
                            <p>$ {OrderModel.CalculateCart(i.cart, i.customer.specialPrices)}</p>
                            <p>{OrderModel.CalculateCases(i.cart)}</p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    );
                })}
            </div>

            <div className='totals'>
                <p className='total'>
                    Route Total Cases : <CaseIcon />
                    <span>{RouteCases()}</span>
                </p>
                <p className='total cases'>
                    Route Total : <span>$ {RouteTotal()}</span>
                </p>
            </div>
        </Component>
    );
};
const Component = styled.div`
    padding: 32px;
    .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 80px;
        p {
            font-size: 20px;
            font-weight: 600;
            span {
                font-weight: 800;
            }
        }
    }
    .grid {
        margin-bottom: 80px;
        .item {
            display: grid;
            /* grid-column-gap: 16px; */
            grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
            border-bottom: 1px solid black;
            :nth-of-type(even) {
                background-color: #d3d3d36e;
            }
            h6 {
                font-size: 18px;
                font-weight: 700;
                padding-left: 8px;
            }
            p {
                padding: 16px 8px;
                border-left: 1px solid black;
                border-right: 1px solid black;
                text-transform: uppercase;
            }
        }
        .item.head {
            border-bottom: 1px solid black;
            padding-bottom: 4px;
            margin-bottom: 16px;
        }
    }
    .totals {
        .total {
            font-size: 20px;
            font-weight: 600;
            svg {
                margin-right: 8px;
            }
            span {
                font-weight: 800;
            }
        }
        .cases {
            margin-top: 24px;
        }
    }
`;
export default Test;
