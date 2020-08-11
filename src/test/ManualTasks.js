import React from "react";
import styled from "styled-components";
import { withFirestore } from "react-redux-firebase";
import Application, { ActionBar, Body } from "../components/layout/Application";
import { useEffect } from "react";

const ManualTasks = ({ firestore }) => {
    return (
        <Application>
            <ActionBar />
            <Body title='Manual Tasks'>This is the manual Task Page</Body>
        </Application>
    );
};
const Component = styled.div``;
export default withFirestore(ManualTasks);
