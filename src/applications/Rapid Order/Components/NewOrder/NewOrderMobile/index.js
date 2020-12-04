import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Add from "./Add";
import Edit from "./Edit";
import OrderSummary from "./OrderSummary";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
const NewOrderMobile = () => {
    const { register, handleSubmit, watch, errors, reset } = useForm();
    const [view, setView] = useState(0);
    const store = useSelector((state) => state.Firestore.data.inventory.beverages);
    const basket = useSelector((state) => state.RapidOrderState.cart);
    const customer = useSelector((state) => state.RapidOrderState.customer);
    const orderID = useSelector((state) => state.RapidOrderState.orderID);

    const ViewSwitch = () => {
        switch (view) {
            case 0:
                return <Add />;
            case 1:
                return <Edit />;
            case 2:
                return <OrderSummary />;
            default:
                return <Add />;
        }
    };

    return (
        <Component>
            {ViewSwitch()}
            <Navbar setView={setView} />
        </Component>
    );
};
const Component = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    @media (min-width: 768px) {
        display: none;
    }
`;
export default NewOrderMobile;

// TODO: add has flavors check or show flavors selected underneath in a dropdown
