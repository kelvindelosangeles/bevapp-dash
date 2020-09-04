import React from "react";
import styled from "styled-components";
import firebase from "firebase";
import { useFirestore } from "react-redux-firebase";
import moment from "moment-timezone";

import { ActionBar, Application, Body } from "../components/layout/Application";
import { useEffect } from "react";

const ManualTasks = () => {
    const firestore = useFirestore();

    // useEffect(() => {
    //     firestore
    //         .update({ collection: "ordersv2", doc: "202009363" }, { [data[0]]: data[1] })
    //         .then(() => {
    //             console.log("success");
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    return (
        <Application>
            <ActionBar></ActionBar>
            <Body title='Manual operation'>this page is used to complete manual operations</Body>
        </Application>
    );
};

export default ManualTasks;

// const nytz = "America/New_York";
// const turtz = "Europe/Istanbul";

// console.log(moment().valueOf());
// console.log(moment.tz(1598888788848, nytz).format("LLL"));
// console.log(moment.tz(1598888788848, turtz).format("LLL"));
