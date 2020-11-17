import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ActionBar, Application, Body } from "../components/layout/Application";
import firebase from "firebase";
import moment from "moment-timezone";

const ManualTasks = () => {
    // const [data, setData] = useState(null);

    // const testQueries = () => {
    //     var colRef = firebase.firestore().collection("completedOrdersTemp");
    //     var query = colRef
    //         .where("customer", "==", "081be9fa")
    //         .get()
    //         .then((res) => {
    //             res.docs.map((x) => {
    //                 console.log(x.data());
    //             });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    // testQueries();

    return (
        <Application>
            <ActionBar></ActionBar>
            <Body title='v3 Transition'>
                <h1>the body</h1>
            </Body>
        </Application>
    );
};

const Component = styled.div``;

export default ManualTasks;

//                     const sp = x.customer.hasOwnProperty("specialPrices") ? x.customer.specialPrices : null;
//                     return {
//                         customID: x.details.orderID,
//                         customer: x.customer.id,
//                         specialPrices: sp,
//                         basket: x.cart,
//                         createdAt: { date: moment(x.details.createdAt).valueOf(), tz: "America/New_York" },
//                         createdBy: "admin",
//                         originalBasket: null,
//                         notes: x.details.notes,
//                         routeID: x.routeID,
//                     };
