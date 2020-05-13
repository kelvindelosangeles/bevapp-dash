import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NativeSelect, FormControl } from "@material-ui/core";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import DiagramPng from "../Assets/Images/Icons/Diagram.png";

const Task = ({ history }) => {
    const [selectedBeverage, setSelectedBeverage] = useState(null);
    const handleChange = (e) => {
        setSelectedBeverage(e.target.value);
    };
    useEffect(() => {
        beverageOptions.length > 0 && setSelectedBeverage(beverageOptions[0].props.value);
    }, []);

    const beverages = useSelector((state) => state.Firestore.data.inventory.beverages);
    const beverageOptions = Object.values(beverages)
        .filter((i) => {
            return !i.hasOwnProperty("section");
        })
        .map((i) => {
            return <option value={i.id}>{i.id}</option>;
        });

    const clickHandler = () => {
        history.push(`/store/editbeverage/${selectedBeverage}`);
    };
    return beverageOptions.length < 1 ? (
        <h1 style={{ padding: "32px" }}>Task Complete</h1>
    ) : (
        <Component>
            <div className='wrapper'>
                <Header>
                    <p className='heading'>Task Description</p>
                    <p className='subheading'>
                        We are assiging warehouse sections to each beverage to control the order in which they appear on the warehouse copies.
                    </p>
                </Header>
                <Info>
                    <div className='remaining'>
                        Unassigned Beverages: <span>{beverageOptions.length}</span>
                    </div>

                    <form>
                        <p>Select a beverage</p>
                        <select onChange={handleChange}>{beverageOptions}</select>
                    </form>

                    <div className='id'>ID: {selectedBeverage}</div>
                    <div className='description'>Amstel Light 12oz bottle</div>
                    <button onClick={clickHandler}>Assign a section</button>
                </Info>
                <Diagram src={DiagramPng} />
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
            "info diagram";
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

const Info = styled.div`
    grid-area: info;
    .remaining {
        font-size: 24px;
        margin-bottom: 48px;
        font-weight: 600;
    }
    form {
        display: flex;
        align-items: baseline;
        margin-bottom: 24px;
        p {
            font-size: 18px;
        }
        select {
            border: none;
            border-bottom: 1px solid black;
            background-color: white;
            padding: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            border-radius: 0;
            margin-left: 16px;
        }
    }
    .id {
        margin-bottom: 24px;
    }
    .description {
        margin-bottom: 24px;
    }
    button {
        padding: 15px;
        max-width: 289px;
        width: 100%;
        background-color: #383838;
        color: white;
        font-size: 16px;
        font-weight: 700px;
        border-radius: 4px;
    }
`;

const Diagram = styled.img`
    grid-area: diagram;
    width: 90%;
    height: auto;
    justify-self: center;
`;
export default withRouter(Task);
