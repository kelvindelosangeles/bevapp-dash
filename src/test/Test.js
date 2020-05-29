import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { withFirestore } from "react-redux-firebase";
const Test = ({ firestore }) => {
    // const beverages = useSelector((state) => state.Firestore.data.inventory.beverages);

    // const { ["POL1.5"]: deleted, ...rest } = beverages;

    // console.log(deleted);
    // console.log(rest);

    // useEffect(() => {
    //     firestore
    //         .set(
    //             {
    //                 collection: "inventory",
    //                 doc: "beverages",
    //             },
    //             rest
    //         )
    //         .then(() => {
    //             console.log("success");
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    return <Component>This is the test page</Component>;
};
const Component = styled.div``;
export default withFirestore(Test);
