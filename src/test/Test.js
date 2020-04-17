import React, { useRef } from "react";
import styled from "styled-components";
import PrintPage from "./PrintPage";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Test = () => {
    const CompRef = useRef();

    return (
        <Component>
            <Heading>Test Page</Heading>
            <PDFDownloadLink document={<PrintPage />} fileName='somename.pdf'>
                {({ blob, url, loading, error }) => (loading ? "Loading document..." : "Download now!")}
            </PDFDownloadLink>
            <PrintPage />
        </Component>
    );
};

const Component = styled.div`
    grid-area: app;
`;
const Heading = styled.p`
    font-size: 40px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 80px;
`;

export default Test;
