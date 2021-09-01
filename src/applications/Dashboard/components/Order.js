import React, { useState, Fragment } from "react";
import moment from "moment";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import { Colors } from "../../../Constants/Colors";
import { Order as orderModel } from "../../../Models/Order";
import CaseIcon from "../../../Assets/Icons/CaseIcon";
import OrderPreview from "./OrderPreview";
import { useSelector } from "react-redux";

const Order = ({ order }) => {
    const [orderPreviewOpen, setOrderPreviewOpen] = useState(false);
    const { customer, details, cart } = order;
    // BETA
    const ar = useSelector((state) => state.Firestore.data.routes.routes);
    const allRouteOrders = Object.values(ar)
        .map((a) => {
            return a.orders;
        })
        .flat();

    const status = allRouteOrders.indexOf(details.orderID) < 0 ? "New Order" : "Assigned";

    const toggle = () => {
        setOrderPreviewOpen(!orderPreviewOpen);
    };

    return (
        <Fragment>
            <Component onClick={() => setOrderPreviewOpen(true)}>
                <div className='id'>
                    <p>{details.orderID.slice(7, 16)}</p>
                    <p className='time'>{moment(details.createdAt).format("MMM, Do LT")}</p>
                </div>
                <p className='address'>{customer.alias || customer.address}</p>
                <p className='cases'>
                    <CaseIcon /> {orderModel.CalculateCases(cart)}
                </p>
                <p>$ {orderModel.CalculateCart(cart, customer.specialPrices)}</p>
                <p>{status}</p>
            </Component>
            <Dialog open={orderPreviewOpen} onClose={toggle} scroll='paper' maxWidth={"90vw"}>
                <OrderPreview order={order} closeOrderPreview={() => setOrderPreviewOpen(false)} />
            </Dialog>
        </Fragment>
    );
};
const Component = styled.div`
    display: grid;
    grid-column-gap: 32px;
    grid-template-columns: 120px 310px 1fr 1fr 1fr;
    padding: 16px 24px;
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
