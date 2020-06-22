import React from "react";
import styled from "styled-components";
import { Colors } from "../../../../Constants/Colors";
import SingleRoute from "./components/SingleRoute";
import Dialog from "@material-ui/core/Dialog";
import { useState } from "react";
import CreateRoute from "./components/CreateRoute";
const Routes = () => {
    const [open, toggle] = useState(false);
    return (
        <Component>
            <ControlCenter>
                <button onClick={() => toggle(true)}>Create a Route</button>
            </ControlCenter>
            <RoutesContainer>
                <div className='heading'>Active Routes</div>
                <div className='item header'>
                    <p>Driver</p>
                    <p>Orders</p>
                    <p>Cases</p>
                    <p>Total</p>
                    <p>Status</p>
                </div>
                <div className='grid'>
                    <div className='wrapper'>
                        <SingleRoute />
                        <SingleRoute />
                        <SingleRoute />
                    </div>
                </div>
            </RoutesContainer>
            <Dialog open={open} scroll='paper' onClose={() => toggle(false)} fullWidth>
                <CreateRoute />
            </Dialog>
        </Component>
    );
};
const Component = styled.div`
    grid-area: app;
    display: grid;
    grid-template-rows: min-content 1fr;
`;

const ControlCenter = styled.div`
    padding: 32px;
    display: flex;
    justify-content: flex-end;
    button {
        padding: 14px 32px;
        background-color: ${Colors.blue};
        color: ${Colors.white};
        font-size: 16px;
        font-weight: 600;
        outline: none;
        border: none;
        border-radius: 4px;
    }
`;

const RoutesContainer = styled.div`
    background-color: ${Colors.white};
    position: relative;
    display: grid;
    grid-template-rows: min-content min-content 1fr;
    .heading {
        margin: 32px;
        margin-bottom: 64;
        font-size: 24px;
        font-weight: 600;
    }
    .item {
        display: grid;
        grid-template-columns: 40% repeat(4, 15%);
        font-weight: 600;
        font-size: 16px;
        padding: 16px 32px;
        cursor: pointer;
        :hover {
            background-color: ${Colors.lightGrey};
        }
    }
    .item.header {
        color: ${Colors.grey};
        margin-bottom: 16px;
    }
    .grid {
        position: relative;
        .wrapper {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: scroll;
        }
    }
`;

export default Routes;
