import { Storefront } from "@material-ui/icons";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import colors from "../../../constants/Colors";
import {
    calculateBalance,
    calculateMultipleBalances,
    calculateMultipleOrders,
    calculateMultiplePayment,
    calculateOrder,
    calculatePayment,
    checkPaymentStatus,
    checkPaymentStatusMobile,
} from "../../../utilities/methods";

const Posts = ({ orders }) => {
    const SinglePost = ({ order }) => {
        return (
            <SinglePostComponent status={checkPaymentStatusMobile(order)}>
                <div className='indicator'></div>
                <i className='bevapp-icon'>
                    <Storefront />
                </i>
                <section className='details'>
                    <p>{order.customer.address}</p>
                    <p>{moment(order.routeDate).format("LL")}</p>
                </section>
                <section className='invoice'>
                    <p>{calculateOrder(order)}</p>
                </section>
                <section>
                    <p className='payment'>{calculatePayment(order)}</p>
                    <p className='mobile_balance'>{calculateBalance(order)}</p>
                </section>
                <section className='web_balance'>
                    <p>{calculateBalance(order)}</p>
                </section>
                <section className='web_status'>{checkPaymentStatus(order)}</section>
            </SinglePostComponent>
        );
    };

    return (
        <Component>
            <p className='bevapp-module-label'>Orders</p>
            <div className='grid'>
                <div className='header'>
                    <span />
                    <p>Customer</p>
                    <p>Invoice</p>
                    <p>Payment</p>
                    <p className='web_balance_label'>Balance</p>
                    <p className='web_status_label'>Status</p>
                </div>
                {orders?.map((a) => {
                    return <SinglePost order={a} />;
                })}
                {/* FIXME: make this prettier  */}
                {orders?.length > 0 ? (
                    <section className='summary'>
                        <p className='heading'>Summary</p>
                        <span></span>
                        <div>
                            <p className='bevapp-module-label'>Total</p>
                            <p className='bevapp-module-label'>${calculateMultipleOrders(orders)}</p>
                        </div>
                        <div>
                            <p className='bevapp-module-label'>Total Payments</p>
                            <p className='bevapp-module-label'>${calculateMultiplePayment(orders)}</p>
                        </div>
                        <span></span>
                    </section>
                ) : (
                    <h1>No payments posted on this date </h1>
                )}
            </div>
        </Component>
    );
};
const Component = styled.div`
    background-color: ${colors.white};
    padding: 16px;
    box-shadow: ${colors.shadow};
    border-radius: 8px;
    .grid {
        display: grid;
        grid-row-gap: 16px;
        .header {
            display: grid;
            grid-template-columns: 6px 50% 1fr 20%;
            grid-column-gap: 8px;
            p {
                font-weight: 600;
                font-size: 12px;
                color: ${colors.greyLabel};
            }
            .web_status_label,
            .web_balance_label {
                display: none;
            }
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
        .grid {
            .header {
                grid-template-columns: 48px 2fr repeat(4, 1fr);
                .web_status_label,
                .web_balance_label {
                    display: block;
                }
            }
        }
        .summary {
            display: grid;
            grid-template-columns: 48px 2fr repeat(4, 1fr);
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

const SinglePostComponent = styled.div`
    display: grid;
    grid-template-columns: 6px 50% 1fr 20%;
    grid-column-gap: 8px;
    align-items: flex-flex-start;
    p {
        font-size: 14px;
        font-weight: 600;
        color: #000000;
        text-transform: uppercase;
    }
    i {
        display: none;
    }
    .indicator {
        width: 6px;
        background-color: ${({ status }) => status};
        border-radius: 4px 0 0 4px;
    }
    .details {
        p:last-of-type {
            color: ${colors.greyLabel};
            text-transform: capitalize;
        }
    }
    .web_balance {
        display: none;
    }
    .web_status {
        display: none;
    }
    @media (min-width: 1024px) {
        grid-template-columns: 48px 2fr repeat(4, 1fr);
        .indicator {
            display: none;
        }
        i {
            display: block;
            transform: scale(0.8);
        }
        .mobile_balance {
            display: none;
        }
        .web_balance,
        .web_status {
            display: block;
        }
        .web_status {
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
    }
`;
export default Posts;

// TODO: create seperate components for web and mobile in single post
