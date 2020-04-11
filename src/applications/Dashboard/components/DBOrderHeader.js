import React from "react";

import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";

const _DBOrderHeader = () => {
    return (
        <DBOrderHeader>
            <p>Order</p>
            <p>Store</p>
            <p>Cases</p>
            <p>Total</p>
        </DBOrderHeader>
    );
};

const DBOrderHeader = styled.div`
    grid-area: orderheader;
    display: grid;
    grid-template-columns: 115px 2fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 48px;
    padding: 0 24px;
    margin: 24px;
    margin-bottom: 0;
    p {
        font-weight: 700;
        color: ${Colors.black};
        font-size: 14;
    }
`;

export default _DBOrderHeader;
