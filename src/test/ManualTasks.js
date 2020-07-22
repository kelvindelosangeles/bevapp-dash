import React from "react";
import styled from "styled-components";
import { withFirestore } from "react-redux-firebase";
import Application, { ActionBar, Body } from "../components/layout/Application";
import { useEffect } from "react";

const ManualTasks = ({ firestore }) => {
    // useEffect(() => {
    //     firestore
    //         .set({ collection: "ordersv2", doc: "202007295" }, routesReplacement)
    //         .then(() => {
    //             console.log("success");
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    console.log(new Date("7/17/20"));

    return (
        <Application>
            <ActionBar />
            <Body title='Manual Tasks'>This is the manual Task Page</Body>
        </Application>
    );
};
const Component = styled.div``;
export default withFirestore(ManualTasks);
