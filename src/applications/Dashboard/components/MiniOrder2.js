import React from "react";
import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";
import CaseIcon from "../../../Assets/Icons/CaseIcon";
import moment from "moment";
import { Order as OrderModel } from "../../../Models/Order";
const MiniOrder2 = ({ data, onClick, active }) => {
    return (
        <Component onClick={onClick} active={active}>
            <div className='indicator' />
            <div>
                <p>{data.customer.address}</p>
                <p className='date'>{moment(data.details.createdAt).format("L")}</p>
            </div>
            <p className='cases'>
                <CaseIcon /> {OrderModel.CalculateCases(data.cart)}
            </p>
            <p>${OrderModel.CalculateCart(data.cart, data.customer.specialPrices)}</p>
        </Component>
    );
};
const Component = styled.div`
    display: grid;
    padding: 16px 0;
    grid-column-gap: 16px;
    grid-template-columns: 10% 40% 25% 1fr;
    align-items: flex-start;
    cursor: pointer;
    .indicator {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        border: 1px solid ${({ active }) => (active ? Colors.green : Colors.black)};
        align-self: center;
        background-color: ${({ active }) => (active ? Colors.green : "unset")};
    }
    p {
        font-size: 16px;
        font-weight: 500;
    }
    .date {
        font-size: 14px;
        color: ${Colors.greyText};
    }
    .cases {
        display: flex;
        align-items: center;
        svg {
            margin-right: 8px;
        }
    }
`;
export default MiniOrder2;
