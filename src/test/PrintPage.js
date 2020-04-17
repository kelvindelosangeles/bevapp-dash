import React from "react";
import ReactPDF, { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const PrintPage = () => {
    const $ = {
        page: {
            fontSize: "12",
        },
        header: {
            textAlign: "center",
            marginBottom: "40",
        },
        customer: {
            marginLeft: "16",
            maxWidth: "200",
            border: "2 solid black",
            padding: "16",
            borderRadius: "4",
        },
    };
    return (
        <Document>
            <Page size='A4' style={$.page}>
                <View style={$.header}>
                    <Text>Alex Beverage</Text>
                    <Text>Beer and Soda Distributor</Text>
                    <Text>1231 Lafayette Avenue</Text>
                    <Text>Bronx, New York</Text>
                    <Text>(212) 304-8888</Text>
                    <Text>(718) 993-5555</Text>
                </View>
                <Text style={$.customer}>Customer Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, asperiores?</Text>
            </Page>
        </Document>
    );
};

export default PrintPage;
