import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import moment from "moment";
import { Order as OrderModel } from "../../Models/Order";
const BeverageReport = () => {
    // Simply Change the date and it will generate a list of all customers that dont have an order in the system after that date

    let AfterDate = "05/22/2020";
    let beforeDate = "05/29/2020";
    let BevID = "MOS24C";

    // Change the FirestoreConnect in App.js to include all orders

    let allOrders = {};

    const Orders = Object.values(useSelector((state) => state.Firestore.data.orders)).forEach((i) => {
        Object.assign(allOrders, i);
    });

    let OrdersThatContainTheBeverage = Object.values(allOrders)
        .filter((x) => {
            // filter orders between dates
            return moment(x.details.createdAt).isBetween(AfterDate, beforeDate);
        })
        .filter((i) => {
            // filter by orders that contain this item
            return i.cart.hasOwnProperty(BevID);
        });

    const totalSoldDuringTimeFrame = OrdersThatContainTheBeverage.map((a) => {
        return parseInt(a.cart[BevID].qty);
    }).reduce((a, b) => {
        return a + b;
    });

    console.log(totalSoldDuringTimeFrame);

    return (
        <Component>
            <div className='wrapper'>
                <p className='header'>Report on Beverage: {BevID}</p>
                <p className='sub-header'>
                    Total Cases Sold between {AfterDate} - {beforeDate} : <span>{totalSoldDuringTimeFrame} Cases</span>
                </p>

                <div className='grid'>
                    {OrdersThatContainTheBeverage.map((x) => {
                        return (
                            <div className='report'>
                                <p>
                                    Customer: <span>{x.customer.address}</span>
                                </p>
                                <p>
                                    Order Date: <span>{moment(x.details.createdAt).format("MM/DD/2020")}</span>
                                </p>
                                <p>
                                    Selling Price:
                                    <span> ${x.cart[BevID].price}</span>
                                </p>
                                <p>
                                    Special Price
                                    <span> {(x.customer.specialPrices && x.customer.specialPrices[BevID]) || "none"}</span>
                                </p>
                                <p>
                                    Qty: <span> {x.cart[BevID].qty}</span>
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Component>
    );
};
const Component = styled.div`
    padding: 32px;
    position: relative;
    .wrapper {
        position: absolute;
        width: 100%;
        /* height: 100%; */
        padding: 40px 0;
        /* overflow: scroll; */
    }
    .header {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 24px;
    }
    .sub-header {
        font-weight: 500;
        margin-bottom: 56px;
        span {
            font-weight: 700;
        }
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 24px;
    }
    .report {
        display: grid;
        grid-gap: 8px;
        font-size: 18px;
        span {
            margin-left: 4px;
            font-weight: 600;
        }
    }
`;
export default BeverageReport;
