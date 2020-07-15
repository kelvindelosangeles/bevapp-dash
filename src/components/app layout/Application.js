import React from "react";
import styled from "styled-components";

const Application = (props) => {
    return <Component>{props.children}</Component>;
};
const Component = styled.div`
    grid-area: app;
    display: grid;
    grid-template-rows: auto 1fr;
`;
export default Application;
