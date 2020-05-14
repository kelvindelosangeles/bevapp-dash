import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { FormControl, Select } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { isLoaded } from "react-redux-firebase";
const Task2 = () => {
    const [item, setItem] = useState(0);
    const handleChange = (e) => {
        setItem(e.target.value);
    };
    const beverages = useSelector((state) => state.Firestore.data.inventory.beverages);

    const beveragesFiltered = Object.values(beverages).filter((i) => {
        return i;
    });

    useEffect(() => {
        beveragesFiltered.length > 0 && setItem(beveragesFiltered[0].id);
    }, []);

    console.log(item);
    return !isLoaded(beverages) ? (
        <p>Loading</p>
    ) : (
        <Component>
            <div className='wrapper'>
                <Header>
                    <p className='heading'>Task Description</p>
                    <p className='subheading'>
                        As we’re building the store there are still some items missing. Below you’ll find the total number of beverages in the store
                        including flavors along with each item that doesnt have a flavor assigned.{" "}
                    </p>
                </Header>
                <Controls>
                    <p className='total-items'>Total Items in the store : 1706</p>
                    <form>
                        <p>Items without flavors: 206</p>
                        <FormControl>
                            <Select native value={item} onChange={handleChange}>
                                {Object.values(beverages).map((i) => {
                                    return (
                                        <option key={i.id} value={i.id}>
                                            {i.id}
                                        </option>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </form>
                </Controls>
                <Diagram>
                    <div className='details'>
                        {console.log(beverages[item])}
                        {/* <p>{beverages[item].id}</p> */}
                        <p>The Description</p>
                        <p>The Price</p>
                    </div>
                    <div className='flavors'>
                        <p>Cherry</p>
                        <p>Coke</p>
                        <p>Diet</p>
                    </div>
                    <button>Edit Item</button>
                </Diagram>
            </div>
        </Component>
    );
};
const Component = styled.div`
    height: 100%;
    position: relative;
    .wrapper {
        position: absolute;
        height: 100%;
        padding: 0 32px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "header ."
            "controls diagram";
        grid-auto-rows: min-content;
        grid-row-gap: 64px;
    }
`;

const Header = styled.div`
    grid-area: header;
    .heading {
        font-weight: 500;
        font-size: 24px;
        margin-bottom: 24px;
    }
`;

const Controls = styled.div`
    grid-area: controls;
    .total-items {
        font-weight: 600;
        font-size: 24px;
        margin-bottom: 24px;
    }
    .total-flavors {
        font-weight: 500;
        font-size: 18px;
        margin-bottom: 80px;
    }
    form {
        display: flex;
        align-items: center;
        p {
            margin-right: 24px;
            font-weight: 600;
        }
    }
`;

const Diagram = styled.div`
    grid-area: diagram;
    display: grid;
    grid-row-gap: 64px;
    width: 356px;
    justify-self: center;
    grid-template-areas:
        "details"
        "flavors"
        "action";
    .details {
        grid-area: details;
        display: grid;
        grid-row-gap: 8px;
        p {
            font-weight: 500;
            font-size: 16px;
        }
    }
    .flavors {
        grid-area: flavors;
    }
    button {
        grid-area: action;
        padding: 12px;
        background-color: #383838;
        color: white;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 500;
    }
`;
export default Task2;
