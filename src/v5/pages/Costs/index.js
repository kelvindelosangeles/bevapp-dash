import { Diamond, UserPlus } from "phosphor-react";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import colors from "../../constants/Colors";
import Beverage from "./components/Beverage";

const Costs = () => {
    const beverages = Object.values(useSelector((state) => state.Firestore.data.inventory.beverages)).filter((a) => {
        return !a.hasOwnProperty("cost");
    });

    return (
        <Component>
            <header>
                <h2>This is a temporary page designed to assist assigning costs to all beverages.</h2>
                <p style={{ marginTop: "12px" }}>
                    Enter a cost for each beverage, and click submit when ready. If you make a mistake you will have the opportuntiy to correct it
                    later on the edit beverage screen.
                </p>
                <p style={{ marginTop: "24px", color: "green", fontWeight: 800 }}>
                    To quickly find a specific beverage use <kbd>ctrl</kbd> + <kbd>F</kbd>
                </p>
            </header>

            <section>
                <h4>Remaining Beverages: {beverages.length}</h4>
            </section>

            <div className='grid'>
                {beverages.map((a) => {
                    return <Beverage bev={a} />;
                })}
            </div>
        </Component>
    );
};
const Component = styled.div`
    background-color: white;
    padding: 24px;
    height: 100vh;
    overflow: scroll;
    header {
        max-width: 80%;
        margin-bottom: 40px;
    }
    section {
        margin-bottom: 40px;
        font-size: 24px;
        font-weight: 800;
        text-decoration: underline;
    }
    .grid {
        display: grid;
    }
`;
export default Costs;
