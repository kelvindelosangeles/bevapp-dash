import React, { useState, Fragment } from "react";
import styled from "styled-components";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import { Order as orderModel } from "../Models/Order";
import { Colors } from "../Constants/Colors";

import CaseIcon from "../Assets/Icons/CaseIcon";
import OrderPreview from "./OrderPreview";
import CustomerPDF from "../Global/PrintTemplates/CustomerPDF";
import { Typography } from "@material-ui/core";
import { VerifiedUserRounded, WarningRounded } from "@material-ui/icons";

const Order = ({
    order,
    completedDate,
    generateInvoice = true,
    recoverDraft = false,
    canDeleteDraft = false,
    canAddPayment = false,
    parentRoute = null,
    weekDocument = null,
    weekDocumentID = null,
}) => {
    const { customer, details, cart } = order;
    const [open, setOpen] = useState(false);

    const isPaid = () => {
        const orderTotal = orderModel.CalculateCart(order.cart, order.customer.specialPrices);
        const totalPayment = order.hasOwnProperty("payment") ? parseFloat(order.payment?.totalCredit) + parseFloat(order.payment?.totalPayment) : 0;

        console.log("totalPayment", totalPayment);

        if (!order.hasOwnProperty("payment")) {
            return null;
        }

        return totalPayment < orderTotal ? (
            <PaymentTag>
                <Typography variant='overline' style={{ color: Colors.red, whiteSpace: "nowrap" }}>
                    P. Paid
                </Typography>
                <VerifiedUserRounded style={{ color: Colors.orange }} />
            </PaymentTag>
        ) : (
            <PaymentTag>
                <Typography variant='overline' style={{ color: Colors.green }}>
                    Paid
                </Typography>
                <VerifiedUserRounded style={{ color: Colors.green }} />
            </PaymentTag>
        );
    };

    return (
        <>
            <Component onClick={() => setOpen(true)}>
                <div className='id'>
                    <p>{details.orderID.slice(2, 16)}</p>
                    <p className='time'>{moment(details.createdAt).format("MMM, Do LT")}</p>
                </div>
                <p className='address'>{customer.address}</p>
                <p className='cases'>
                    <CaseIcon /> {orderModel.CalculateCases(cart)}
                </p>
                <p>${orderModel.CalculateCart(cart, customer.specialPrices)}</p>
                {isPaid()}
            </Component>
            <Dialog open={open} onClose={() => setOpen(false)} scroll='paper' maxWidth={"90vw"}>
                <OrderPreview
                    parentRoute={parentRoute}
                    order={order}
                    completedDate={completedDate}
                    closeOrderPreview={() => setOpen(false)}
                    genInvoice={generateInvoice}
                    recoverDraft={recoverDraft}
                    canDeleteDraft={canDeleteDraft}
                    canAddPayment={canAddPayment}
                    weekDocument={weekDocument}
                    weekDocumentID={weekDocumentID}
                />
            </Dialog>
        </>
    );
};
const Component = styled.div`
    position: relative;
    display: grid;
    grid-column-gap: 32px;
    grid-template-columns: 160px 310px 1fr 1fr;
    margin: 0 -16px;
    padding: 16px;
    border-bottom: 1px solid rgba(155, 155, 155, 0.29);
    cursor: pointer;
    :hover {
        background-color: ${Colors.lightGrey};
        transition: background-color 300ms ease-in-out;
    }
    p {
        font-weight: 600;
        font-size: 16px;
    }
    .address {
        text-transform: uppercase;
    }
    .cases {
        display: flex;
        align-items: baseline;
        svg {
            margin-right: 8px;
            height: 10px;
        }
    }
    .time {
        font-weight: 600;
        font-size: 12px;
        color: ${Colors.grey};
    }
`;

const PaymentTag = styled.div`
    height: 100%;
    display: grid;
    align-items: center;
    align-content: center;
    grid-template-columns: repeat(2, min-content);
    grid-column-gap: 8px;
    svg {
        color: ${Colors.green};
    }
`;
export default Order;
