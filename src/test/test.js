import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import styled from "styled-components";
import DocumentWrapper from "../Global/PrintTemplates/components/DocumentWrapper";
import Header from "../Global/PrintTemplates/components/Header";
import { PDFViewer } from "@react-pdf/renderer";
import PaymentReportPDF from "../Global/PrintTemplates/PaymentReportPDF";
import PageTitle from "../Global/PrintTemplates/components/PageTitle";

const Test = () => {
    return (
        <Component>
            <PDFViewer height='100%' width='100%'>
                <PaymentReportPDF />
            </PDFViewer>
        </Component>
    );
};
const Component = styled.div`
    background-color: white;
    /* padding: 24px; */
`;
export default Test;
