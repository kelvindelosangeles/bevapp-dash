import React from "react";
import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";
import CaseIcon from "../../../Assets/Icons/CaseIcon";
import { Order as orderModel } from "../../../Models/Order";
import DragHandleIcon from "@material-ui/icons/DragHandleRounded";
import moment from "moment";
const Order = ({ order }) => {
    return (
        <Component>
            <DragHandleIcon />
            <div>
                <p className='address'>{order.customer.alias || order.customer.address}</p>
                <p className='date'>{moment(order.details.createdAt).format("L")}</p>
            </div>
            <p className='cases'>
                <CaseIcon /> {orderModel.CalculateCases(order.cart)}
            </p>
            <p>${orderModel.CalculateCart(order.cart, order.customer.specialPrices)}</p>
        </Component>
    );
};
const Component = styled.div`
    display: grid;
    padding: 16px 0;
    grid-column-gap: 16px;
    grid-template-columns: 10% 40% 25% 1fr;
    align-items: flex-start;
    svg {
        align-self: center;
        cursor: pointer;
    }
    p {
        font-size: 16px;
        font-weight: 500;
    }
    .date {
        font-size: 14px;
        color: ${Colors.greyText};
    }
    .address {
        text-transform: uppercase;
    }
    .cases {
        display: flex;
        align-items: center;
        svg {
            margin-right: 8px;
            cursor: unset;
        }
    }
`;
export default Order;
