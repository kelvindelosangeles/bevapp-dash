import React from "react";
import moment from "moment";
import { Page, Text, View, Document, Font, StyleSheet } from "@react-pdf/renderer";
import { Order as orderModel } from "../../Models/Order";

const DailyJournal = ({ orders, total, totalCases, CalcCasesMultipleOrders, CalcTotalMultipleOrders }) => {
    return (
        <Document>
            <Page size='A4' style={dj.page}>
                <View style={dj.header}>
                    <Text style={dj.header.title}>Daily Summary</Text>
                    <Text>{moment().format("L")}</Text>
                </View>

                <View style={dj.pageHeading}>
                    <Text style={dj.pageInfo}>Driver</Text>
                    <Text style={dj.pageInfo}>Orders</Text>
                    <Text style={dj.pageInfo}>Cases</Text>
                    <Text style={dj.pageInfo}>Total</Text>
                </View>

                {orders.map((a) => {
                    return (
                        <View stye={dj.route}>
                            <View style={dj.route.heading}>
                                <Text style={dj.route.info}>{a.driver.firstName}</Text>
                                <Text style={dj.route.info}>{Object.values(a.orders).length}</Text>
                                <Text style={dj.route.info}>{CalcCasesMultipleOrders(a.orders)}</Text>
                                <Text style={dj.route.info}>${CalcTotalMultipleOrders(a.orders)}</Text>
                            </View>
                            {Object.values(a.orders).map((b) => {
                                return (
                                    <View style={dj.order.heading}>
                                        <Text style={dj.order.info}>{b.customer.address}</Text>
                                        <Text style={dj.order.info}></Text>
                                        <Text style={dj.order.info}>{orderModel.CalculateCases(b.cart)}</Text>
                                        <Text style={dj.order.info}>${orderModel.CalculateCart(b.cart, b.customer.specialPrices)}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    );
                })}

                <View stye={dj.route}>
                    <View style={dj.route.heading}>
                        <Text style={dj.route.info}>Driver Name</Text>
                        <Text style={dj.route.info}>Orders</Text>
                        <Text style={dj.route.info}>Cases</Text>
                        <Text style={dj.route.info}>Total</Text>
                    </View>
                    <View style={dj.order.heading}>
                        <Text style={dj.order.info}>Driver Name</Text>
                        <Text style={dj.order.info}>Orders</Text>
                        <Text style={dj.order.info}>Cases</Text>
                        <Text style={dj.order.info}>Total</Text>
                    </View>
                    <View style={dj.order.heading}>
                        <Text style={dj.order.info}>Driver Name</Text>
                        <Text style={dj.order.info}>Orders</Text>
                        <Text style={dj.order.info}>Cases</Text>
                        <Text style={dj.order.info}>Total</Text>
                    </View>
                </View>

                <View style={dj.footer}>
                    <Text style={dj.footer.data}>Total Cases: {totalCases}</Text>
                    <Text style={dj.footer.data}>Daily total: {total}</Text>
                </View>
            </Page>
        </Document>
    );
};

Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const dj = StyleSheet.create({
    page: {
        fontSize: "10",
        padding: 16,
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
            borderRadius: 4,
        },
        info: {
            flexBasis: "25%",
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
