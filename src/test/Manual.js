import React from "react";
import styled from "styled-components";
import { ActionBar, Application, Body } from "../components/layout/Application";

import colors from "../v5/constants/Colors";

const ManualTasks = () => {
    return (
        <Application>
            <ActionBar></ActionBar>
            <Body title='Beverage Prices'>
                <h1>Hello</h1>
            </Body>
        </Application>
    );
};

const Component = styled.div`
    display: grid;
    grid-template-columns: 50px 100px 100px;
    grid-row-gap: 16px;
    border-bottom: 1px solid grey;
    padding: 8px;
    :nth-last-of-type(even) {
        background-color: ${colors.greyBackground};
    }
`;

export default ManualTasks;
