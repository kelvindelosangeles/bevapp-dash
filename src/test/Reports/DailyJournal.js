import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import moment from "moment";
import { Order as OrderModel } from "../../Models/Order";
const theDate = "Jun 23";
const DailyJournal = () => {
    // init order OBJ
    let orders = {};
    // let orders = useSelector((state) => state.Firestore.data.orders["202006262"]);
    // Script to combine all orders into an object
    Object.values(useSelector((state) => state.Firestore.data.orders)).forEach((i) => {
        Object.assign(orders, i);
    });

    // Script to filter only certain orders
    const ordersFiltered = Object.values(orders).filter((i) => {
        return i.details.createdAt.includes(theDate);
        return i;
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

    console.log(Object.values(orders));
    return (
        <Component>
            <div className='wrapper'>
                <header>
                    <p className='header'>
                        Daily Journal: <span>{moment(theDate).format("L")}</span> - "(date created)
                    </p>
                </header>

                <div className='grid'>
                    <div className='item head'>
                        <h3>Customer</h3>
                        <h3>Date</h3>
                        <h3>Cases</h3>
                        <h3>Total</h3>
                    </div>
                    {ordersFiltered.map((x) => {
                        return (
                            <div className='item '>
                                <p>{x.customer.address}</p>
                                {/* <p>{moment(x.details.createdAt).format("L")}</p> */}
                                <p>{x.details.createdAt}</p>
                                <p>{OrderModel.CalculateCases(x.cart)}</p>
                                <p>$ {OrderModel.CalculateCart(x.cart, x.customer.specialPrices)}</p>
                            </div>
                        );
                    })}
                </div>
                <div className='footer'>
                    <p>
                        Total Orders: <span>{ordersFiltered.length}</span>
                    </p>
                    <p>
                        Total Cases: <span>{RouteCases()}</span>
                    </p>
                    <p>
                        Total: <span>${RouteTotal()}</span>
                    </p>
                </div>
            </div>
        </Component>
    );
};
const Component = styled.div`
    padding: 32px;
    position: relative;
    .wrapper {
        padding-bottom: 40px;
        height: 100%;
        width: 100%;
        position: absolute;
        overflow: scroll;
    }
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
export default DailyJournal;
