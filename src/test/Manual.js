import React from "react";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import styled from "styled-components";
import { ActionBar, Application, Body } from "../components/layout/Application";
import colors from "../v5/constants/Colors";

const ManualTasks = () => {
    const firestore = useFirestore();
    const customers = useSelector((state) => state.Firestore.data.store.customers);
    let customersModified = Object.values(customers).reduce((o, key) => ({ ...o, [key.id]: { ...key, alias: key.address } }), {});

    // const setCustomers = () => {
    //     firestore
    //         .set(
    //             {
    //                 collection: "store",
    //                 doc: "customers",
    //             },
    //             customersModified
    //         )
    //         .then(() => {
    //             console.log("success");
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    return (
        <Application>
            <ActionBar></ActionBar>
            <Body title='Beverage Prices'>
                <Component>
                    <h1>Hello</h1>
                    {/* <button onClick={setCustomers}></button> */}
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
