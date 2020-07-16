import React from "react";
import moment from "moment";
import { Page, Text, View, Document, Font, StyleSheet } from "@react-pdf/renderer";
import { Order as orderModel } from "../../Models/Order";

const DailyJournal = ({ orders, total, totalCases, CalcCasesMultipleOrders, CalcTotalMultipleOrders, theDate }) => {
    return (
        <Document>
            <Page size='A4' style={dj.page}>
                <View style={dj.header}>
                    <Text style={dj.header.title}>Daily Summary for {moment(theDate).format("LL")}</Text>
                    {/* <Text>{moment().format("L")}</Text> */}
                </View>

                <View style={dj.pageHeading}>
                    <Text style={dj.pageInfo}>Driver</Text>
                    <Text style={dj.pageInfo}>Orders</Text>
                    <Text style={dj.pageInfo}>Cases</Text>
                    <Text style={dj.pageInfo}>Total</Text>
                </View>

                {orders.map((a) => {
                    return (
                        <React.Fragment>
                            <View style={dj.route.heading} wrap={false}>
                                <Text style={dj.route.info}>{a.driver.firstName}</Text>
                                <Text style={dj.route.info}>{Object.values(a.orders).length}</Text>
                                <Text style={dj.route.info}>{CalcCasesMultipleOrders(a.orders)}</Text>
                                <Text style={dj.route.info}>${CalcTotalMultipleOrders(a.orders)}</Text>
                            </View>
                            {Object.values(a.orders).map((b) => {
                                return (
                                    <View style={dj.order.heading} wrap={false}>
                                        <Text style={dj.order.info}>{b.customer.address}</Text>
                                        <Text style={dj.order.info}></Text>
                                        <Text style={dj.order.info}>{orderModel.CalculateCases(b.cart)}</Text>
                                        <Text style={dj.order.info}>${orderModel.CalculateCart(b.cart, b.customer.specialPrices)}</Text>
                                    </View>
                                );
                            })}
                            <View style={{ marginBottom: 24 }}></View>
                        </React.Fragment>
                    );
                })}

                <View style={dj.footer}>
                    <Text style={dj.footer.data}>Total Cases: {totalCases}</Text>
                    <Text style={dj.footer.data}>Daily total: {total}</Text>
                </View>
                <Text style={dj.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
            </Page>
        </Document>
    );
};

Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const dj = StyleSheet.create({
    pageNumber: {
        position: "absolute",
        fontSize: 10,
        top: 16,
        right: 16,
    },
    page: {
        fontSize: "10",
        padding: 16,
        paddingTop: 32,
    },

    header: {
        textAlign: "center",
        marginBottom: 24,
        title: {
            marginBottom: 4,
        },
    },

    pageHeading: {
        flexDirection: "row",
        padding: "12 8",
        color: "grey",
        borderRadius: 4,
    },
    pageInfo: {
        flexBasis: "25%",
    },

    route: {
        heading: {
            flexDirection: "row",
            backgroundColor: "#1B273F",
            color: "#fff",
            padding: "12 8",
            borderRadius: 4,
        },
        info: {
            textTransform: "uppercase",
            flexBasis: "25%",
        },
    },

    order: {
        heading: {
            flexDirection: "row",
            padding: "12 8",
            // borderRadius: 4,
            backgroundColor: "#F5F5F5",
        },
        info: {
            flexBasis: "25%",
            textTransform: "uppercase",
        },
    },

    footer: {
        marginTop: 20,
        data: {
            padding: "4 8",
        },
    },
});
export default DailyJournal;
