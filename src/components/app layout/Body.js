import React from "react";
import styled from "styled-components";
import { Colors } from "../../Constants/Colors";
const Body = ({ children, title = "Page title", header }) => {
    return (
        <Component>
            <div className='header'>{title}</div>
            <div className='content-header'>{header}</div>
            <div className='content'>
                <div className='wrapper'>{children}</div>
            </div>
        </Component>
    );
};
const Component = styled.div`
    background-color: ${Colors.white};
    border-radius: 8px 0 0 0;
    height: 100%;
    display: grid;
    grid-template-rows: auto auto 1fr;
    .header {
        padding: 32px;
        padding-bottom: 24px;
        font-size: 24px;
        font-weight: 600;
    }
    .content-header {
        padding: 0 32px;
        margin-bottom: 16px;
    }
    .content {
        position: relative;
        height: 100%;
        .wrapper {
            position: absolute;
            overflow: scroll;
            height: inherit;
            width: 100%;
            padding: 32px;
        }
    }
`;
export default Body;
