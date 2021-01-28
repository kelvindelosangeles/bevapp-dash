import React from "react";
import { Document, Page, Text } from "@react-pdf/renderer";

const DocumentWrapper = ({ children }) => {
    return (
        <Document>
            <Page size='A4' style={$.page}>
                {children}
                <Text style={$.pageNumber} render={({ pageNumber, totalPages }) => `page ${pageNumber} of ${totalPages}`} fixed />
            </Page>
        </Document>
    );
};

const $ = {
    page: {
        fontSize: "10",
        padding: 16,
    },
    pageNumber: {
        position: "absolute",
        fontSize: 10,
        top: 16,
        right: 16,
        fontSize: 6,
    },
};
export default DocumentWrapper;
