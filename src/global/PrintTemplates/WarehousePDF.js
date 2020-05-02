import React from "react";
import moment from "moment";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { Order as orderModel } from "../../Models/Order";

const WarehousePDF = ({ order }) => {
    const orderArray = Object.values(order.cart)
        .sort((a) => {
            return a.hasOwnProperty("flavors") ? 1 : -1;
        })
        .map((i) => {
            const flavors =
                i.hasOwnProperty("flavors") &&
                Object.entries(i.flavorsQuantity)
                    .filter((x) => {
                        return x[1] !== "";
                    })
                    .map((x) => {
                        return (
                            <Text style={$.orders.flavor} key={x[0]}>
                                {x[1]}x {x[0]}
                            </Text>
                        );
                    });
            return (
                <View style={$.orders}>
                    <View style={$.orders.w}>
                        <View style={$.orders.checkBox}></View>
                    </View>
                    <Text style={$.orders.c}> {i.qty}</Text>
                    <Text style={$.orders.d}>{i.description}</Text>
                    <View style={$.orders.w}>
                        <View style={$.orders.checkBox}></View>
                    </View>
                    <View style={$.orders.flavorsWrapper}>{flavors}</View>
                </View>
            );
        });

    const chunk = (array, size) => {
        const chunked_arr = [];
        let index = 0;
        while (index < array.length) {
            chunked_arr.push(array.slice(index, size + index));
            index += size;
        }
        return chunked_arr;
    };
    // //  FIXME: Add to to models
    // const ordersChunked = chunk(orderArray, 10);
    const ordersChunkedMapped = chunk(orderArray, 2).map((i) => {
        return (
            <View style={$.orderWrapper} wrap={false}>
                <View style={$.seperator}></View>
                {i}
            </View>
        );
    });

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
                </View>
                {ordersChunkedMapped}
                <Text style={$.footer}>Total Cases: {orderModel.CalculateCases(order.cart)} </Text>
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
        justifyContent: "space-between",
    },
    orderWrapper: {
        position: "relative",
        flexDirection: "row",
        // flexWrap: "wrap",
        justifyContent: "space-between",
    },
    seperator: {
        position: "absolute",
        height: "100%",
        width: "5",
        backgroundColor: "#565656",
        left: "49.2%",
    },

    ordersHeader: {
        justifyContent: "space-between",
        width: "48%",
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
        width: "48%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        w: { flexBasis: "10%" },
        c: { flexBasis: "15%", textAlign: "center", paddingRight: "5%" },
        d: { flexBasis: "65%", textTransform: "uppercase", fontSize: "11", paddingRight: "10%" },
        ch: { flexBasis: "10%" },
        flavorsWrapper: {
            paddingVertical: "4",
            marginLeft: "25%",
            flexBasis: "65%",
            flexDirection: "row",
            flexWrap: "wrap",
        },
        flavor: {
            padding: "2 5",
            textTransform: "uppercase",
        },
        checkBox: {
            height: "22",
            width: "22",
            border: "1",
            alignSelf: "flex-start",
        },
    },

    footer: {
        // marginTop: "auto",
        marginTop: "24",
        fontSize: "16",
    },
};

export default WarehousePDF;
