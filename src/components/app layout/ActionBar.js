import React from "react";
import styled from "styled-components";
const ActionBar = (props) => {
    return <Component>{props.children}</Component>;
};
const Component = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min-content, 100px));
    justify-content: space-between;
    grid-column-gap: 48px;
    align-items: center;
    padding: 24px 32px;
    min-height: 116px;
`;
export default ActionBar;
