import React, { useState, useRef } from "react";
import styled from "styled-components";
import { connect, useSelector } from "react-redux";
import { Colors } from "../../../../Constants/Colors";
import Xicon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";

const AddToCart = ({ dispatch, orderItem }) => {
    const [qty, setQty] = useState("");
    const inputNode = useRef();
    const { id, description, price } = orderItem;

    const qtyChangeHandler = (e) => {
        qty.length > 2 ? setQty(qty.slice(0, 2)) : setQty(e.target.value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch({
            type: "ADD_TO_CART",
            item: { ...orderItem, qty: qty === "" ? 1 : parseInt(qty) },
        });
    };
    const cancelHandler = () => {
        setQty("");
        dispatch({ type: "CLOSE_ATC" });
    };

    const open = useSelector((state) => state.RapidOrderState.atcVisible);

    return (
        <Dialog open={open} onClose={cancelHandler} scroll='paper' aria-labelledby='scroll-dialog-title' aria-describedby='scroll-dialog-description'>
            <section id='product-details'>
                <div id='logo'></div>
                <div id='details'>
                    <p>{id}</p>
                    <p>{description}</p>
                    <p>$ {price}</p>
                </div>
            </section>
            <QuantityForm onSubmit={submitHandler}>
                <Xicon />
                <input ref={inputNode} type='number' min='1' max='999' placeholder='1' value={qty} onChange={qtyChangeHandler} />
                <p>QTY</p>
                <div>
                    <button type='submit'>Add</button>
                    <button onClick={cancelHandler}>Cancel</button>
                </div>
            </QuantityForm>
        </Dialog>
    );
};

const QuantityForm = styled.form`
    display: grid;
    grid-template-columns: auto auto;
    grid-template-areas:
        "X QTY"
        ". label"
        "actions actions";
    svg {
        grid-area: X;
        font-size: 48px;
        /* margin-right: 16px; */
        align-self: center;
        justify-self: right;
    }
    input {
        ::placeholder {
            color: ${Colors.black};
        }
    }
    input::-webkit-inner-spin-button,
    input::-webkit-outer-spin-button,
    input {
        grid-area: QTY;
        height: 100px;
        font-size: 91px;
        font-family: Poppins;
        font-weight: 700;
        text-align: center;
        border: none;
        -webkit-appearance: none;
        margin: 0;
        color: transparent;
        text-shadow: 0 0 0 ${Colors.black};
        :focus {
            outline: none;
        }
    }
    p {
        font-family: Poppins;
        font-weight: 700;
        font-size: 16px;
        grid-area: label;
        text-align: center;
        padding-top: 8px;
        padding-bottom: 80px;
    }
    div {
        grid-area: actions;
        display: flex;
        justify-content: space-between;
        button {
            width: 153px;
            height: 54px;
            font-family: Poppins;
            font-weight: 700;
            color: ${Colors.white};
            background-color: ${Colors.black};
            border-radius: 8px;
            font-size: 19px;
            cursor: pointer;
            :nth-of-type(2) {
                margin-left: 16px;
                background-color: ${Colors.white};
                color: ${Colors.black};
                border: 3px solid ${Colors.black};
            }
        }
    }
`;

export default connect((state) => {
    return { orderItem: state.RapidOrderState.orderItem };
})(AddToCart);
