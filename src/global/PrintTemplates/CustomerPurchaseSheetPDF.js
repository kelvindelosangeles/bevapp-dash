import React from "react";
import moment from "moment";
import { Page, Text, View, Document, Font, StyleSheet } from "@react-pdf/renderer";
import { Order as orderModel } from "../../Models/Order";

const DailyJournal = ({ orders, theDate, customer, totalCases, totalCost }) => {
    return (
        <Document>
            <Page style={$.page}>
                <View style={$.contact} fixed>
                    <Text>Alex Beverage</Text>
                    <Text>Beer and Soda Distributor</Text>
                    <Text>1231 Lafayette Avenue</Text>
                    <Text>Bronx, New York</Text>
                    <Text>(212) 304-8888</Text>
                    <Text>(718) 993-5555</Text>
                </View>

                <View style={$.pageHeader} fixed>
                    <Text>Customer Purchase Sheet: {customer.address}</Text>
                    <Text>Orders since {moment(theDate).format("L")}</Text>
                </View>

                <View style={$.ordersHeader} fixed>
                    <Text style={$.ordersHeader.index}>#</Text>
                    <Text style={$.ordersHeader.label}>Date</Text>
                    <Text style={$.ordersHeader.label}>Cases</Text>
                    <Text style={$.ordersHeader.label}>Total</Text>
                </View>

                {orders
                    .sort((a, b) => {
                        console.log(moment(a.details.createdAt).valueOf());
                        return moment(a.details.createdAt).valueOf() > moment(b.details.createdAt).valueOf() ? 1 : -1;
                    })
                    .map((a, index) => {
                        return (
                            <View style={$.order}>
                                <Text style={$.order.index}>{index + 1}</Text>
                                <Text style={$.order.value}>{moment(a.details.createdAt).format("LLL")}</Text>
                                <Text style={$.order.value}>{orderModel.CalculateCases(a.cart)}</Text>
                                <Text style={$.order.value}>${orderModel.CalculateCart(a.cart, a.customer.specialPrices)}</Text>
                            </View>
                        );
                    })}

                <View style={$.footer}>
                    <Text style={$.footer.value}>Total Cases: {totalCases}</Text>
                    <Text style={$.footer.value}>Total Cost: $ {totalCost}</Text>
                </View>
                <Text style={$.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
            </Page>
        </Document>
    );
};

Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const $ = StyleSheet.create({
    pageNumber: {
        position: "absolute",
        fontSize: 10,
        top: 16,
        right: 16,
    },
    page: {
        fontSize: "10",
        padding: 16,
    },
    contact: {
        marginBottom: "20",
        textAlign: "center",
    },
    pageHeader: {
        marginTop: 4,
        fontSize: "10",
        flexDirection: "row",
        justifyContent: "space-between",
        textTransform: "uppercase",
    },

    ordersHeader: {
        margin: "40 0 12 0",
        flexDirection: "row",
        paddingBottom: 4,
        index: {
            flexBasis: "4%",
            fontSize: 11,
        },
        label: {
            color: "grey",
            fontSize: 11,
            flexBasis: "30%",
        },
    },

    order: {
        padding: "6 0",
        margin: "2 0",
        borderBottom: "1 solid lightgrey",
        flexDirection: "row",
        index: {
            color: "black",
            fontSize: 10,
            flexBasis: "4%",
            paddingTop: 4,
        },
        value: {
            color: "black",
            fontSize: 10,
            flexBasis: "30%",
            paddingTop: 4,
        },
    },

    footer: {
        paddingTop: 24,
        marginTop: "auto",
        value: {
            fontSize: 11,
            margin: "2 0",
        },
    },
});
export default DailyJournal;
