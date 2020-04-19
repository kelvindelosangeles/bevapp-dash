import React from "react";
import ReactPDF, { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { red } from "@material-ui/core/colors";

const PrintPage = () => {
    const $ = {
        page: {
            fontSize: "10",
            padding: 16,
            // backgroundColor: 'beige',
        },
        contact: {
            textAlign: "center",
            marginBottom: "20",
        },
        heading: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            // backgroundColor: 'beige',
            alignItems: "center",
            marginBottom: "10",
            customer: {
                border: "1 solid black",
                borderRadius: "4",
                alignSelf: "flex-start",

                padding: "8",
                // backgroundColor: 'green',
                flexBasis: "30%",
            },
            tax: {
                textAlign: "center",
                flexBasis: "30%",
                // backgroundColor: 'orange',
            },
            thanks: {
                flexBasis: "30%",
                alignItems: "center",
            },
            license: {
                marginTop: "12",
                flexBasis: "30%",
            },
        },

        wrapper: {
            flexDirection: "row",
            flexWrap: "wrap",
        },

        ordersHeader: {
            width: "50%",
            flexDirection: "row",
            border: "1",
            borderRight: "none",
            borderLeft: "none",
            marginBottom: "8",
            paddingVertical: 4,
            w: { flexBasis: "10%" },
            c: { flexBasis: "15%" },
            d: { flexBasis: "65%" },
            ch: { flexBasis: "10%" },
        },
        orders: {
            flexDirection: "row",
            alignItems: "center",
            width: "50%",
            marginBottom: 2,
            w: { flexBasis: "10%" },
            c: { flexBasis: "15%" },
            d: { flexBasis: "65%" },
            ch: { flexBasis: "10%" },
            checkBox: {
                height: "20",
                width: "20",
                border: "1",
            },
        },

        footer: {
            marginTop: "auto",
            fontSize: "16",
        },
    };
    return (
        <Document>
            <Page size='A4' style={$.page}>
                <View style={$.contact}>
                    <Text>Alex Beverage</Text>
                    <Text>Beer and Soda Distributor</Text>
                    <Text>1231 Lafayette Avenue</Text>
                    <Text>Bronx, New York</Text>
                    <Text>(212) 304-8888</Text>
                    <Text>(718) 993-5555</Text>
                </View>

                <View style={$.heading}>
                    <Text style={$.heading.customer}> Minus, asperiores?Minus, asperiores?Minus, asperiores?</Text>
                    <Text style={$.heading.tax}>Tax and Deposits Included</Text>
                    <View style={$.heading.thanks}>
                        <Text>Thank you for your order</Text>
                        <Text style={$.heading.date}>04/17/2020</Text>
                    </View>
                    <Text style={$.heading.license}>LIC.NO.CO.</Text>
                </View>

                <View style={$.wrapper}>
                    <View style={$.ordersHeader}>
                        <Text style={$.ordersHeader.w}>WH</Text>
                        <Text style={$.ordersHeader.c}> Cases</Text>
                        <Text style={$.ordersHeader.d}>Description</Text>
                        <Text style={$.ordersHeader.ch}>CHK</Text>
                    </View>
                    <View style={$.ordersHeader}>
                        <Text style={$.ordersHeader.w}>WH</Text>
                        <Text style={$.ordersHeader.c}> Cases</Text>
                        <Text style={$.ordersHeader.d}>Description</Text>
                        <Text style={$.ordersHeader.ch}>CHK</Text>
                    </View>

                    <View style={$.orders}>
                        <View style={$.orders.w}>
                            <View style={$.orders.checkBox}></View>
                        </View>
                        <Text style={$.ordersHeader.c}> Cases</Text>
                        <Text style={$.ordersHeader.d}>Description</Text>
                        <View style={$.orders.w}>
                            <View style={$.orders.checkBox}></View>
                        </View>
                    </View>

                    <View style={$.orders}>
                        <View style={$.orders.w}>
                            <View style={$.orders.checkBox}></View>
                        </View>
                        <Text style={$.ordersHeader.c}> Cases</Text>
                        <Text style={$.ordersHeader.d}>Description</Text>
                        <View style={$.orders.w}>
                            <View style={$.orders.checkBox}></View>
                        </View>
                    </View>

                    <View style={$.orders}>
                        <View style={$.orders.w}>
                            <View style={$.orders.checkBox}></View>
                        </View>
                        <Text style={$.ordersHeader.c}> Cases</Text>
                        <Text style={$.ordersHeader.d}>Description</Text>
                        <View style={$.orders.w}>
                            <View style={$.orders.checkBox}></View>
                        </View>
                    </View>

                    <View style={$.orders}>
                        <View style={$.orders.w}>
                            <View style={$.orders.checkBox}></View>
                        </View>
                        <Text style={$.ordersHeader.c}> Cases</Text>
                        <Text style={$.ordersHeader.d}>Description</Text>
                        <View style={$.orders.w}>
                            <View style={$.orders.checkBox}></View>
                        </View>
                    </View>
                </View>

                <Text style={$.footer}> Total Cases: 25 </Text>
            </Page>
        </Document>
    );
};

// const test = styled.div`
//     grid-template-columns: 1fr 1fr 1fr;
//     :nth-of-type() ;
// `;

export default PrintPage;
