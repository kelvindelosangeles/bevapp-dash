import React from "react";
import styled from "styled-components";
import colors from "../../constants/Colors";
const Page = ({ children, background = null }) => {
    return <Component background={background}>{children}</Component>;
};
const Component = styled.div`
    grid-area: app;
    padding: 16px;
    height: 100vh;
    width: 100%;
    overflow: scroll;
    display: grid;
    background-color: ${colors.greyBackground};
    background-image: ${({ background }) => `url(${background})`};
    background-repeat: repeat;
`;
export default Page;
