import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { withFirestore } from "react-redux-firebase";
const DeleteBeverage = ({ firestore }) => {
    const beverages = useSelector((state) => state.Firestore.data.inventory.beverages);
    const orders = useSelector((state) => state.Firestore.data.orders);

    const ItemToDeleteID = "";

    const { [ItemToDeleteID]: deleted, ...rest } = beverages;

    console.log(deleted);
    console.log(rest);

    // ==============================
    // Activate this function to delete that item
    // ==============================

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
export default withFirestore(DeleteBeverage);
