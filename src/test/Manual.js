import React from "react";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import styled from "styled-components";
import { ActionBar, Application, Body } from "../components/layout/Application";
import colors from "../v5/constants/Colors";

const ManualTasks = () => {
    const firestore = useFirestore();
    const beverages = useSelector((state) => state.Firestore.data.inventory.beverages);
    let beveragesModified = Object.values(beverages).reduce((o, key) => ({ ...o, [key.id]: { ...key, cost: "25.00" } }), {});
    console.log("the beverages", beveragesModified);

    // const updateFirestore = firestore
    //     .set(
    //         {
    //             collection: "inventory",
    //             doc: "beverages",
    //         },
    //         beveragesModified
    //     )
    //     .then(() => {
    //         console.log("Successfully updated beverages");
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    return (
        <Application>
            <ActionBar></ActionBar>
            <Body title='Beverage Prices'>
                <Component>
                    <h1>Hello</h1>
                    {/* <button onClick={() => updateFirestore}>Update Firestore</button> */}
                </Component>
            </Body>
        </Application>
    );
};

const Component = styled.div`
    display: grid;
    grid-template-columns: 50px 100px 100px;
    grid-row-gap: 16px;
    border-bottom: 1px solid grey;
    padding: 8px;
    :nth-last-of-type(even) {
        background-color: ${colors.greyBackground};
    }
`;

export default ManualTasks;
