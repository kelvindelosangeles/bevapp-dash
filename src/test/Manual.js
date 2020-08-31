import React from "react";
import styled from "styled-components";
import firebase from "firebase";
import { useFirestore } from "react-redux-firebase";
import moment from "moment";

import { ActionBar, Application, Body } from "../components/layout/Application";
import { useEffect } from "react";

const ManualTasks = () => {
    const firestore = useFirestore();

    console.log(moment("2017-09-06T12:03:00.000Z").tz("Etc/GMT").format("lll"));

    console.log(moment(1598885510850).format("zz"));

    // const data []
    // useEffect(() => {
    //     data.forEach((a) => {
    //         firestore
    //             .update({ collection: "ordersv2", doc: "202008355" }, { [a[0]]: a[1] })
    //             .then(() => {
    //                 console.log("success");
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     });
    // }, []);

    return (
        <Application>
            <ActionBar></ActionBar>
            <Body title='Manual operation'>this page is used to complete manual operations</Body>
        </Application>
    );
};

export default ManualTasks;
