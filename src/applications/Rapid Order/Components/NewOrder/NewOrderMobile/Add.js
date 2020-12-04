import { FlashOnRounded } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Colors } from "../../../../../Constants/Colors";
import { addToCart } from "../../../../../redux/actions/RapidOrderActions";
import PageHeader from "./PageHeader";
import { useSnackbar } from "notistack";
const Add = () => {
    const { register, handleSubmit, watch, errors, reset } = useForm();
    const store = useSelector((state) => state.Firestore.data.inventory.beverages);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const triggerSnack = (variant, message) => {
        return enqueueSnackbar(message, {
            variant,
            anchorOrigin: {
                vertical: "top",
                horizontal: "left",
            },
        });
    };

    const submitHandler = (data) => {
        const ID = data.ID.toUpperCase();
        const qty = data.qty;
        const qtyInput = document.getElementById("qty");

        if (!store.hasOwnProperty(ID)) {
            // conditional checks if the item entered it correct
            triggerSnack("error", "Item does not exist");
            return;
        }
        if (store[ID].hasOwnProperty("flavors")) {
            dispatch({
                type: "TOGGLE_ATCF",
                item: store[ID],
            });
            triggerSnack("default", `${ID} was added successfully`);
            reset();
            qtyInput.focus();
        } else {
            triggerSnack("default", `${ID} was added successfully`);
            dispatch(addToCart({ ...store[ID], qty }));
            reset();
            qtyInput.focus();
        }
    };

    useEffect(() => {
        const qtyInput = document.getElementById("qty");
        qtyInput.focus();
    }, []);

    return (
        <Component>
            <PageHeader>
                <p>Enter a quantity and an item ID</p>
            </PageHeader>
            <form onSubmit={handleSubmit(submitHandler)}>
                <p className='label'>Quantity</p>
                <p className='label'>Item ID</p>
                <p className='label'>Add</p>
                <input pattern='\d*' id='qty' type='num' name='qty' min={1} max={99} maxLength={2} ref={register({ required: true })} />
                <input type='text' name='ID' maxLength={8} ref={register({ required: true })} />
                <button type='submit'>
                    <FlashOnRounded />
                </button>
            </form>
        </Component>
    );
};
const Component = styled.div`
    overflow: scroll;
    display: grid;
    padding: 16px;
    form {
        align-self: flex-end;
        display: grid;
        grid-template-columns: 60px 1fr 60px;
        grid-column-gap: 16px;
        .label {
            font-size: 10px;
            font-weight: 600;
            text-align: center;
            margin-bottom: 8px;
        }
        input {
            height: 60px;
            border-radius: 8px;
            outline: none;
            border: none;
            background-color: ${Colors.lightGrey};
            padding: 0 4px;
            text-align: center;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
        }
        button {
            background-color: ${Colors.blue};
            border-radius: 8px;
            svg {
                color: ${Colors.white};
            }
        }
    }
`;
export default Add;
