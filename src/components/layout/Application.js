import React from "react";
import styled from "styled-components";
import { Colors } from "../../Constants/Colors";

export const Application = (props) => {
    const Component = styled.div`
        grid-area: app;
        display: grid;
        grid-template-rows: auto 1fr;
    `;
    return <Component>{props.children}</Component>;
};
export const ActionBar = (props) => {
    const Component = styled.div`
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        justify-content: space-between;
        grid-column-gap: 24px;
        align-items: center;
        padding: 24px 32px;
        min-height: 116px;
    `;
    return <Component>{props.children}</Component>;
};
export const Body = ({ children, title = "Page title", header }) => {
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

export default Application;
