import React from "react";
import styled from "styled-components";
import { Colors } from "../../../../../Constants/Colors";
const pageHeader = (props) => {
    return <Component>{props.children}</Component>;
};
const Component = styled.div`
    align-self: flex-start;
    display: grid;
    grid-column-gap: 16px;
    justify-content: space-between;
    align-items: center;
    grid-template-columns: 1fr 50px;
    margin-bottom: 24px;
    width: 100%;
    p {
        font-size: 16px;
        font-weight: 600;
    }
    svg {
        color: ${Colors.red};
        font-size: 32px;
        justify-self: flex-end;
    }
`;
export default pageHeader;
