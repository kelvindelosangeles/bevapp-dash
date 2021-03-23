import { Storefront } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import colors from "../../../constants/Colors";
import { calculateCart, calculateMultipleOrders, formatPhoneNumber } from "../../../utilities/methods";
import moment from "moment-timezone";
const Account = ({ customer, orders }) => {
    const { address, telephone } = customer;
    const ordersList = orders.map((a) => {
        return (
            <div className='order'>
                <div>
                    <p>{a.details.orderID}</p>
                    <p className='date'>{moment(a.details.createdAt).format("L")}</p>
                </div>
                <p>${calculateCart(a)}</p>
                <p>$4563.00</p>
                <p className='status'>Status</p>
            </div>
        );
    });

    return (
        <Component>
            <header>
                <i className='bevapp-icon'>
                    <Storefront />
                </i>
                <p className='address'>{address}</p>
                <p className='tel'>{formatPhoneNumber(telephone)}</p>
            </header>
            <div className='divider' />
            <section className='order-labels'>
                <p>Order ID</p>
                <p>Invoice Amount</p>
                <p>Payment</p>
                <p className='status'>Status</p>
            </section>
            <section className='order-grid'>{ordersList}</section>
            <div className='divider' />
            <section className='summary'>
                <p className='heading'>Account Summary</p>
                <div>
                    <p className='bevapp-module-label'>Total</p>
                    <p className='bevapp-module-label'>${calculateMultipleOrders(orders)}</p>
                </div>
                <div>
                    <p className='bevapp-module-label'>Total Payments</p>
                    <p className='bevapp-module-label'>$4563.49</p>
                </div>
                <div>
                    <p className='bevapp-module-label'>Balance</p>
                    <p className='bevapp-module-label'>$0.00</p>
                </div>
            </section>
        </Component>
    );
};
const Component = styled.div`
    margin: 20px 16px;
    background-color: ${colors.white};
    border-radius: 8px;
    padding: 16px;
    header {
        display: grid;
        grid-template-columns: min-content 1fr;
        grid-column-gap: 8px;
        grid-template-areas:
            "icon address"
            "icon tel";
        justify-content: flex-start;
        i {
            grid-area: icon;
            transform: scale(0.8);
        }
        .address {
            grid-area: address;
            font-weight: 700;
            font-size: 16px;
            text-transform: uppercase;
        }
        .tel {
            grid-area: tel;
            font-size: 14px;
        }
    }
    .divider {
        width: 100%;
        height: 1px;
        background-color: lightgrey;
        margin: 8px 0;
    }
    .order-labels {
        display: grid;
        grid-template-columns: 3fr 2fr 2fr;
        grid-column-gap: 16px;
        p {
            font-size: 12px;
            text-transform: uppercase;
            color: ${colors.greyLabel};
            margin-bottom: 16px;
        }
        .status {
            display: none;
        }
    }
    .order-grid {
        display: grid;
        grid-row-gap: 16px;
    }
    .order {
        display: grid;
        grid-column-gap: 16px;

        grid-template-columns: 3fr repeat(2, 2fr);
        position: relative;
        p {
            text-transform: uppercase;
            font-weight: 600;
        }

        .date {
            font-size: 14px;
            color: ${colors.greyLabel};
            text-transform: capitalize;
        }
        .status {
            display: none;
        }
        ::before {
            content: "";
            height: 100%;
            width: 4px;
            position: absolute;
            left: -8px;
            background-color: red;
            border-radius: 4px 0 0 4px;
        }
    }
    .summary {
        p.heading {
            font-size: 12px;
            text-transform: uppercase;
            color: ${colors.greyLabel};
            margin-bottom: 16px;
        }
        div {
            display: flex;
            justify-content: space-between;
            p {
                font-size: 14px;
            }
        }
    }
    @media (min-width: 1024px) {
        .order-labels {
            grid-template-columns: 3fr repeat(3, 2fr);
            .status {
                display: block;
            }
        }
        .order {
            grid-template-columns: 3fr repeat(3, 2fr);

            ::before {
                content: unset;
            }
            .status {
                display: block;
                padding: 4px 8px;
                background-color: black;
                border-radius: 6px;
                color: white;
                width: fit-content;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                align-self: flex-start;
            }
        }
        .summary {
            display: grid;
            grid-template-columns: 3fr repeat(3, 2fr);
            grid-column-gap: 16px;
            div {
                flex-direction: column;
                p {
                    font-weight: 600;
                }
                p:first-of-type {
                    color: ${colors.greyLabel};
                    font-size: 12px;
                    font-weight: 600;
                }
            }
        }
    }
`;
export default Account;
