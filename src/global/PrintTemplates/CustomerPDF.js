import React from "react";
import moment from "moment";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { Order as orderModel } from "../../Models/Order";

const CustomerPDF = ({ order }) => {
    const orderArray = Object.values(order.cart)
        .sort((a) => {
            return a.hasOwnProperty("flavors") ? 1 : -1;
        })
        .map((i) => {
            return (
                <View style={$.wrapper} wrap={false}>
                    <View style={$.orders}>
                        <View style={$.orders.c}>
                            <Text> {i.qty} </Text>
                        </View>
                        <Text style={$.orders.d}>{i.description}</Text>
                        <Text style={$.orders.t}>{orderModel.CalculateItem(i, order.customer.specialPrices)}</Text>
                    </View>
                </View>
            );
        });

    return (
        <Document>
            <Page size='A4' style={$.page}>
                <View style={$.contact} fixed>
                    <Text>Alex Beverage</Text>
                    <Text>Beer and Soda Distributor</Text>
                    <Text>1231 Lafayette Avenue</Text>
                    <Text>Bronx, New York</Text>
                    <Text>(212) 304-8888</Text>
                    <Text>(718) 993-5555</Text>
                </View>
                <View style={$.heading} fixed>
                    <Text style={$.heading.customer}>{order.customer.address}</Text>
                    <Text style={$.heading.tax}>Tax and Deposits Included</Text>
                    <View style={$.heading.thanks}>
                        <Text>Thank you for your order</Text>
                        <Text style={$.heading.date}>{moment(order.details.createdAt).format("MM/DD/2020")}</Text>
                    </View>
                    <Text style={$.heading.license}>LIC.NO.CO.</Text>
                </View>

                <View style={$.wrapper} fixed>
                    <View style={$.ordersHeader}>
                        <Text style={$.ordersHeader.c}>Cases</Text>
                        <Text style={$.ordersHeader.d}> Description</Text>
                        <Text style={$.ordersHeader.t}>Price</Text>
                    </View>
                </View>
                {orderArray}

                <View style={$.footer} wrap={false}>
                    <Text style={$.footer.cases}>Cases: {orderModel.CalculateCases(order.cart)}</Text>
                    <Text style={$.footer.total}>Total:$ {orderModel.CalculateCart(order.cart, order.customer.specialPrices)}</Text>
                    <View style={$.footer.input}>
                        <Text>Credits</Text>
                        <View style={$.footer.line} />
                    </View>
                    <View style={$.footer.input}>
                        <Text>Balance</Text>
                        <View style={$.footer.line} />
                    </View>
                    <View style={$.footer.input}>
                        <Text>AmountPaid</Text>
                        <View style={$.footer.line} />
                    </View>
                    <View style={$.footer.input}>
                        <Text>Signature Date</Text>
                        <View style={$.footer.line} />
                    </View>
                </View>
            </Page>
        </Document>
    );
};

const $ = {
    page: {
        fontSize: "10",
        padding: 16,
    },
    contact: {
        textAlign: "center",
        marginBottom: "20",
    },
    heading: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10",
        customer: {
            border: "1 solid black",
            borderRadius: "4",
            alignSelf: "flex-start",
            padding: "8",
            flexBasis: "30%",
        },
        tax: {
            textAlign: "center",
            flexBasis: "30%",
        },
        thanks: {
            flexBasis: "30%",
            alignItems: "center",
        },
        date: {
            marginTop: "4",
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
        width: "100%",
        flexDirection: "row",
        border: "1",
        borderRight: "none",
        borderLeft: "none",
        marginBottom: "8",
        paddingVertical: 4,
        c: { flexBasis: "10%" },
        d: { flexGrow: "1" },
        t: { flexBasis: "10%" },
    },
    orders: {
        paddingVertical: "2",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "baseline",
        width: "100%",
        marginBottom: 2,
        c: {
            flexBasis: "10%",
            textAlign: "center",
            paddingRight: "5%",
        },
        d: {
            flexGrow: "1",
            textTransform: "uppercase",
            fontSize: "11",
        },
        t: {
            flexBasis: "10%",
        },

        flavorsWrapper: {
            paddingVertical: "4",
            marginLeft: "25%",
            flexBasis: "65%",
            flexDirection: "row",
            flexWrap: "wrap",
        },
        flavor: {
            padding: "2 5",
        },
    },

    footer: {
        marginTop: "auto",
        fontSize: "10",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingBottom: "100",
        cases: {
            flexBasis: "40%",
            marginBottom: 10,
        },
        total: {
            flexBasis: "40%",
            marginBottom: 8,
            textAlign: "right",
        },
        input: {
            flexBasis: "40%",
            marginBottom: 10,
            // backgroundColor: 'yellow',
        },
        line: {
            borderBottom: "1",
            height: 10,
            // maxWidth: 200,
        },
    },
};

export default CustomerPDF;
