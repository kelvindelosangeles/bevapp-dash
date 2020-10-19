import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { useFirestore } from "react-redux-firebase";
import moment from "moment-timezone";
import { useSelector } from "react-redux";
import { ActionBar, Application, Body } from "../components/layout/Application";
import { Colors } from "../Constants/Colors";

const ManualTasks = () => {
    return (
        <Application>
            <ActionBar></ActionBar>
            <Body title='Customers with SP on COR12B'>
                <Component></Component>
            </Body>
        </Application>
    );
};

const Component = styled.div``;
export default ManualTasks;

// const nytz = "America/New_York";
// const turtz = "Europe/Istanbul";

// console.log(moment().valueOf());
// console.log(moment.tz(1598888788848, nytz).format("LLL"));
// console.log(moment.tz(1598888788848, turtz).format("LLL"));

// const firestore = useFirestore();
// // const data = Object.entries(useSelector((state) => state.Firestore.data.collToDelete)).map((x) => x[0]);
// // console.log(data);

// useEffect(() => {
//     // firestore
//     //     .update({ collection: "ordersv2", doc: "202009365" }, data)
//     //     .then(() => {
//     //         console.log("success");
//     //     })
//     //     .catch((err) => {
//     //         console.log(err);
//     //     });
//     // data.forEach((x) => {
//     //     console.log(x);
//     //     firestore
//     //         .delete({ collection: "orders", doc: x })
//     //         .then(() => {
//     //             console.log("success");
//     //         })
//     //         .catch((err) => {
//     //             console.log(err);
//     //         });
//     // });
// }, []);
