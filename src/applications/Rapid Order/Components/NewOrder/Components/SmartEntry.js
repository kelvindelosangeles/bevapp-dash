import React, { useRef } from "react";
import styled from "styled-components";
import { Colors } from "../../../../../Constants/Colors";
import { connect } from "react-redux";

const SmartEntry = ({ smartEntryID, setSmartEntryID, smartEntryQty, setSmartEntryQty, store, dispatch }) => {
    const seid = useRef();
    const seqty = useRef();

    const smartEntryQtyChangeHandler = (e) => {
        smartEntryQty.length > 2 ? setSmartEntryQty(smartEntryQty.slice(0, 2)) : setSmartEntryQty(e.target.value);
    };
    const smartEntryIDChangeHandler = (e) => {
        setSmartEntryID(e.target.value.toUpperCase());
    };
    const smartEntrySubmitHandler = (e) => {
        e.preventDefault();
        try {
            if (smartEntryQty !== "") {
                if (store[smartEntryID] === undefined) {
                    // if it doesnt throw an item doesnt exist error because the format is correct
                    setSmartEntryID("");
                    setSmartEntryQty("");
                    seqty.current.focus();
                    return window.alert("That item does not exist");
                } else {
                    if (store[smartEntryID].hasOwnProperty("flavors")) {
                        console.log("this item has flavors");
                        setSmartEntryID("");
                        setSmartEntryQty("");
                        dispatch({
                            type: "TOGGLE_ATCF",
                            item: store[smartEntryID],
                        });
                        // if it is add the item to the cart
                    } else {
                        console.log(store[smartEntryID]);
                        setSmartEntryID("");
                        setSmartEntryQty("");
                        seqty.current.focus();
                        return dispatch({
                            type: "ADD_TO_CART",
                            item: { ...store[smartEntryID], qty: smartEntryQty },
                        });
                    }
                }
            } else {
                alert("Please Enter a Quantity");
            }
        } catch (error) {
            console.log(error);
            setSmartEntryID("");
            setSmartEntryQty("");
            window.alert("Formating Error");
        }
    };

    return (
        <SmartEntryWrapper onSubmit={smartEntrySubmitHandler} className='smart-entry'>
            <h3>Order Entry</h3>
            <input
                ref={seqty}
                className='seqty'
                type='number'
                min='1'
                max='999'
                placeholder='34'
                autoFocus
                value={smartEntryQty}
                onChange={smartEntryQtyChangeHandler}
            />
            <input
                ref={seid}
                className='seid'
                type='text'
                placeholder='AMS12B'
                autoComplete='off'
                name='rapidentry'
                value={smartEntryID}
                onChange={smartEntryIDChangeHandler}
            />
            <button style={{ display: "none" }} type='submit'></button>
        </SmartEntryWrapper>
    );
};

const SmartEntryWrapper = styled.form`
    white-space: nowrap;
    display: flex;
    align-items: center;
    h3 {
        margin-right: 16px;
        font-family: Poppins;
        font-weight: 600;
        font-size: 18px;
    }
    :first-of-type {
        flex: 1;
        padding-right: 24px;
        input {
            width: 100%;
        }
    }
    :nth-of-type(2) {
        padding-right: 24px;
    }
    input {
        height: 40px;
        border-radius: 4px;
        padding-left: 24px;
        border: none;
        outline: none;
        background-color: ${Colors.lightGrey};
        margin-right: 24px;
    }
    svg {
        margin-right: 16px;
        font-size: 32px;
    }

    .smart-entry {
        input::-webkit-inner-spin-button,
        input::-webkit-outer-spin-button {
            -webkit-appearance: none;
        }
        .seqty {
            -webkit-appearance: none;
            padding: 0 24px;
        }
        .seid {
            margin-right: 16px;
        }
    }
`;

export default connect((state) => {
    return {
        store: state.Firestore.data.inventory.beverages,
    };
})(SmartEntry);
