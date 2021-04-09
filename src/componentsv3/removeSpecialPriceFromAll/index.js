import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import styled from "styled-components";
import { removeSpecialPriceFromAllCustomers } from "../../v5/redux/actions/specialPrices";
const RemoveSpecialPriceFromAll = () => {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    const firestore = useFirestore();

    const submitHandler = ({ beverage }) => {
        dispatch(removeSpecialPriceFromAllCustomers(beverage, firestore));
    };

    return (
        <Component onSubmit={handleSubmit(submitHandler)}>
            <p className='label'>Remove Specially Priced item from all Customers</p>
            <input type='text' name='beverage' ref={register({ required: true })} />
            <button type='submit'>Remove</button>
        </Component>
    );
};
const Component = styled.form`
    grid-area: D;
    align-self: center;
    display: grid;
    grid-gap: 16px;
    grid-template-areas:
        "A A"
        "B C";
    p {
        font-size: 14px;
        text-transform: uppercase;

        grid-area: A;
    }
    input {
        grid-area: B;
        background-color: #f5f5f5;
        border: none;
        height: 48px;
        padding: 0 8px;
        width: 100%;
        color: black;
        font-size: 18px;
        text-transform: uppercase;
        border-radius: 4px;
    }
    button {
        grid-area: C;
        border: none;
        background-color: black;
        color: white;
        border-radius: 4px;
        font-size: 14px;
        text-transform: uppercase;
        padding: 0 24px;
    }
`;
export default RemoveSpecialPriceFromAll;
