import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { connect, useSelector } from "react-redux";
import { Colors } from "../../../../Constants/Colors";
import Xicon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import { addToCart } from "../../../../redux/actions/RapidOrderActions";

const AddToCart = ({ dispatch }) => {
    const open = useSelector((state) => state.RapidOrderState.atcVisible);
    const item = useSelector((state) => state.RapidOrderState.orderItem);
    const [qty, setQty] = useState("");

    const qtyChangeHandler = (e) => {
        qty.length > 2 ? setQty(qty.slice(0, 2)) : setQty(e.target.value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addToCart({ ...item, qty: qty === "" ? 1 : parseInt(qty) }));
    };
    const cancelHandler = () => {
        setQty("");
        dispatch({ type: "CLOSE_ATC" });
    };

    useEffect(() => {
        setQty(item.qty);
    }, []);
    console.log(item);

    return (
        <Dialog open={open} onClose={cancelHandler} scroll='paper' aria-labelledby='scroll-dialog-title' aria-describedby='scroll-dialog-description'>
            <Container>
                <div className='header'>
                    <div className='logo' />
                    <div className='details'>
                        <p>{item.id}</p>
                        <p>{item.description}</p>
                        <p>$ {item.price}</p>
                    </div>
                </div>
                <form className='input-form' onSubmit={submitHandler}>
                    <Xicon />
                    <input type='number' min='1' max='999' placeholder='1' value={qty} onChange={qtyChangeHandler} />
                    <p>QTY</p>
                    <div className='controls'>
                        <button type='submit'>Add</button>
                        <button onClick={cancelHandler}>Cancel</button>
                    </div>
                </form>
            </Container>
        </Dialog>
    );
};
const Container = styled.div`
    padding: 24px;
    .header {
        display: flex;
        align-items: center;
        margin-bottom: 64px;
        .logo {
            height: 110px;
            width: 110px;
            border-radius: 50%;
            background-color: salmon;
            margin-right: 64px;
        }
        .details {
            font-weight: 600;
            max-width: 120px;
        }
    }
    .controls {
        display: flex;
        justify-content: space-between;
        button {
            width: 160px;
            height: 50px;

            font-weight: 700;
            color: ${Colors.white};
            background-color: ${Colors.black};
            border-radius: 8px;
            font-size: 15px;
            cursor: pointer;
            :nth-of-type(2) {
                background-color: ${Colors.white};
                color: ${Colors.black};
                border: 3px solid ${Colors.black};
            }
        }
    }
    .input-form {
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
    }
`;

export default connect()(AddToCart);
