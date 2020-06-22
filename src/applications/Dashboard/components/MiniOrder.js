import React from "react";
import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";
import CaseIcon from "../../../Assets/Icons/CaseIcon";
const Order = ({ style }) => {
    return (
        <Component style={{ ...style }}>
            <p>icon</p>
            <div>
                <p>352 West 116th St</p>
                <p className='date'>Jun 22nd 8:00am</p>
            </div>
            <p className='cases'>
                <CaseIcon /> 32
            </p>
            <p>$3430.23</p>
        </Component>
    );
};
const Component = styled.div`
    display: grid;
    padding: 16px 0;
    grid-column-gap: 16px;
    grid-template-columns: 10% 40% 25% 1fr;
    align-items: flex-start;
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
export default Order;
