import React, { useState, useEffect, useRef } from "react";
import { connect, useSelector } from "react-redux";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import { Colors } from "../../../../Constants/Colors";
import ItemDetails from "./ItemDetails";
import FlavorsInput from "./FlavorsInput";
import { addToCart } from "../../../../redux/actions/RapidOrderActions";

const AddtoCartFlavors = ({ orderItem, dispatch }) => {
    const [flavorsQuantity, setFlavorsQuantity] = useState({});
    const open = useSelector((state) => state.RapidOrderState.atcfVisible);
    const cart = useSelector((state) => state.RapidOrderState.cart);

    useEffect(() => {
        const flavors = {};

        cart.hasOwnProperty(orderItem.id)
            ? Object.entries(cart[orderItem.id].flavorsQuantity).forEach((i) => {
                  Object.assign(flavors, { [i[0]]: i[1] });
              })
            : orderItem.flavors.forEach((i) => {
                  Object.assign(flavors, { [i]: "" });
              });

        setFlavorsQuantity({ ...flavors });
    }, []);

    const FlavorChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        value.length > 2
            ? setFlavorsQuantity((prevState) => {
                  return { ...prevState, [name]: value.slice(0, 3) };
              })
            : setFlavorsQuantity((prevState) => {
                  return { ...prevState, [name]: value };
              });
    };
    const submitHandler = (e) => {
        e.preventDefault();

        const total = Object.values(flavorsQuantity)
            .map((i) => {
                return Number(i);
            })
            .reduce((a, b) => {
                return a + b;
            });

        total < 1
            ? cancelHandler()
            : dispatch(
                  addToCart({
                      ...orderItem,
                      qty: total,
                      flavorsQuantity,
                  })
              );
    };
    const cancelHandler = () => {
        setFlavorsQuantity({});
        dispatch({ type: "CLOSE_ATC" });
    };
    const Flavors = orderItem.flavors
        .slice()
        .sort((a, b) => {
            return String(a) > String(b) ? 1 : -1;
        })
        .map((i) => {
            return <FlavorsInput key={i} name={i} FlavorChangeHandler={FlavorChangeHandler} flavorsQuantity={flavorsQuantity} />;
        });
    // FIXME: Sorting not allowed

    return (
        <Dialog open={open} onClose={cancelHandler} scroll='paper' aria-labelledby='scroll-dialog-title' aria-describedby='scroll-dialog-description'>
            <Container>
                <ItemDetails orderItem={orderItem} />
                <FlavorsForm onSubmit={submitHandler}>
                    {Flavors}
                    <FlavorsFormActions>
                        <button type='submit'>Add</button>
                        <button onClick={cancelHandler}>Cancel</button>
                    </FlavorsFormActions>
                </FlavorsForm>
            </Container>
        </Dialog>
    );
};

const Container = styled.div`
    padding: 24px;
`;
const FlavorsForm = styled.form``;

const FlavorsFormActions = styled.div`
    margin-top: 64px;
    display: flex;
    justify-content: center;
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
            margin-left: 16px;
            background-color: ${Colors.white};
            color: ${Colors.black};
            border: 3px solid ${Colors.black};
        }
    }
`;

export default connect((state) => {
    return { orderItem: state.RapidOrderState.orderItem };
})(AddtoCartFlavors);
