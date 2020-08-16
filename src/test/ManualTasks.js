import React from "react";
import styled from "styled-components";
import { withFirestore } from "react-redux-firebase";
import Application, { ActionBar, Body } from "../components/layout/Application";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ManualTasks = ({ firestore }) => {
    const dataSet1 = [
        {
            name: "Johson",
            amount: 30000,
            sex: "M",
            is_married: true,
        },
        {
            name: "Monika",
            amount: 355000,
            sex: "F",
            is_married: false,
        },
        {
            name: "John",
            amount: 250000,
            sex: "M",
            is_married: false,
        },
        {
            name: "Josef",
            amount: 450500,
            sex: "M",
            is_married: true,
        },
    ];
    const dataSet2 = [
        {
            name: "Johnson",
            total: 25,
            remainig: 16,
        },
        {
            name: "Josef",
            total: 25,
            remainig: 7,
        },
    ];

    return (
        <Application>
            <ActionBar />
            <Body title='Manual Tasks'>
                <ExcelFile>
                    <ExcelSheet data={dataSet1} name='Employees'>
                        <ExcelColumn label='Name' value='name' />
                        <ExcelColumn label='Wallet Money' value='amount' />
                        <ExcelColumn label='Gender' value='sex' />
                        <ExcelColumn label='Marital Status' value={(col) => (col.is_married ? "Married" : "Single")} />
                    </ExcelSheet>
                    <ExcelSheet data={dataSet2} name='Leaves'>
                        <ExcelColumn label='Name' value='name' />
                        <ExcelColumn label='Total Leaves' value='total' />
                        <ExcelColumn label='Remaining Leaves' value='remaining' />
                    </ExcelSheet>
                </ExcelFile>
            </Body>
        </Application>
    );
};
const Component = styled.div``;
export default withFirestore(ManualTasks);
