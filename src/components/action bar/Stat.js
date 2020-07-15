import React from "react";
import styled from "styled-components";
import { Colors } from "../../Constants/Colors";

const Stat = ({ color = "white", data = "no Data", title = "Title" }) => {
    return (
        <Component color={color}>
            <p>{title}</p>
            <span>{data}</span>
        </Component>
    );
};
const Component = styled.div`
    display: grid;
    grid-row-gap: 8px;
    justify-items: center;
    color: ${Colors.white};
    p {
        white-space: nowrap;
        font-size: 16px;
    }
    span {
        font-size: 24px;
        font-weight: 800;
        color: ${({ color }) => color};
    }
`;
export default Stat;
