import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import styled from "styled-components";
import colors from "../../../constants/Colors";
const Beverage = ({ bev }) => {
    const [cost, setCost] = useState("");
    const firestore = useFirestore();

    const changeHandler = (e) => {
        setCost(e.target.value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        // parse the number
        const costParsed = Number(cost).toFixed(2);

        // makes sure that the cost is a number
        if (isNaN(costParsed)) {
            setCost("");
            window.alert("incorrect value please enter a number from 0 - 9999");
            return;
        }

        // makes sure that the number is within range
        if (costParsed < 0 || costParsed > 9999) {
            setCost("");
            window.alert("The number must be between 0 and 9999");
            return;
        }

        console.log({ ...bev, cost: costParsed });
        firestore
            .update(
                {
                    collection: "inventory",
                    doc: "beverages",
                },
                {
                    [bev.id]: {
                        ...bev,
                        cost: costParsed,
                    },
                }
            )
            .then(() => {
                console.log("success");
            })
            .catch((err) => {
                console.log(err);
                window.alert("something went wrong");
            });
    };
    return (
        <Component onSubmit={submitHandler}>
            <p>{bev.id}</p>
            <p>{bev.description}</p>
            <p>${bev.price}</p>
            <input type='text' placeholder='0.00' onChange={changeHandler} value={cost} />
            <button className='submit' type='submit'>
                Submit
            </button>
        </Component>
    );
};
const Component = styled.form`
    padding: 20px 8px;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 3fr 1fr 2fr 1fr;
    justify-items: flex-start;
    grid-column-gap: 24px;
    :nth-of-type(even) {
        background-color: ${colors.greyBackground};
    }
    p {
        text-transform: uppercase;
    }
    input {
        height: 40px;
        text-align: center;
        font-size: 20px;
        font-weight: 900;
    }
    .submit {
        padding: 12px 24px;
        background-color: ${colors.black};
        color: ${colors.white};
        border-radius: 8px;
        cursor: pointer;
        border: 1px solid white;
        :hover {
            background-color: white;
            color: black;
            border: 1px solid black;
        }
    }
`;
export default Beverage;
