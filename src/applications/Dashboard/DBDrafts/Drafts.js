import React from "react";
import styled from "styled-components";
import { Colors } from "../../../Constants/Colors";
import { useState } from "react";
import { useEffect } from "react";
import Order from "../components/Order";
import store from "store";
const Drafts = () => {
    const [drafts, setDrafts] = useState([]);

    useEffect(() => {
        store.each((value, key) => {
            setDrafts((prevState) => {
                return { ...prevState, [key]: value };
            });
        });
    }, []);

    return (
        <Component>
            <Actions></Actions>
            <DraftsContainer>
                <div className='heading'>
                    <p>Drafts</p>
                </div>
                <OrderHeader>
                    <h6>Order</h6>
                    <h6>Store </h6>
                    <h6>Cases</h6>
                    <h6>Total</h6>
                    <h6></h6>
                </OrderHeader>
                {Object.values(drafts).map((x) => {
                    return <Order order={x} />;
                })}
            </DraftsContainer>
        </Component>
    );
};
const Component = styled.div`
    grid-area: app;
    display: grid;
    grid-template-rows: auto 1fr;
`;

const Actions = styled.div`
    padding: 32px;
    display: flex;
    justify-content: flex-end;
    color: white;
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

const DraftsContainer = styled.div`
    background-color: white;
    border-radius: 8px 0 0 0;
    padding: 32px;
    .heading {
        margin-bottom: 64;
        font-size: 24px;
        font-weight: 600;
    }
`;

const OrderHeader = styled.div`
    background-color: white;
    display: grid;
    grid-template-columns: 120px 310px 1fr 1fr 1fr;
    grid-column-gap: 32px;
    padding: 24px;
    border-radius: 8px 0 0 0;
    border-bottom: 1px solid ${Colors.lightGrey};
    h6 {
        font-weight: 600;
        font-size: 16px;
        color: #999999;
    }
`;
export default Drafts;
