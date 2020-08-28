import React, { useState, Fragment } from "react";
import styled from "styled-components";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import { Order as orderModel } from "../Models/Order";
import { Colors } from "../Constants/Colors";
import CaseIcon from "../Assets/Icons/CaseIcon";
import OrderPreview from "./OrderPreview";
import CustomerPDF from "../Global/PrintTemplates/CustomerPDF";

const Order = ({ order, completedDate, generateInvoice = true }) => {
    const { customer, details, cart } = order;
    const [open, setOpen] = useState(false);

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
            </Component>
            <Dialog open={open} onClose={() => setOpen(false)} scroll='paper' maxWidth={"90vw"}>
                <OrderPreview order={order} completedDate={completedDate} closeOrderPreview={() => setOpen(false)} genInvoice={generateInvoice} />
            </Dialog>
        </>
    );
};
const Component = styled.div`
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
export default Order;
