import React from "react";
import moment from "moment";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { Order as orderModel } from "../../Models/Order";

const WarehousePDF = ({ order, beverages }) => {
    // USing the first instance of a section for documentation
    const section1 = Object.values(order.cart)
        .filter((i) => {
            // filter by references of this beverages section,Its being done this way so that when we update a location the old orders have an updated locaton as well.
            return beverages[i.id].section && beverages[i.id].section === "1";
        })
        .sort((a, b) => {
            // console.log(beverages[a.id]);
            // Again referencing by the reference to the beverage and its most recent section
            return beverages[a.id].subSection < beverages[b.id].subSection ? -1 : 1;
        });
    const section2 = Object.values(order.cart)
        .filter((i) => {
            return beverages[i.id].section && beverages[i.id].section === "2";
        })
        .sort((a, b) => {
            return beverages[a.id].subSection < beverages[b.id].subSection ? -1 : 1;
        });
    const section3 = Object.values(order.cart)
        .filter((i) => {
            return beverages[i.id].section && beverages[i.id].section === "3";
        })
        .sort((a, b) => {
            return beverages[a.id].subSection < beverages[b.id].subSection ? -1 : 1;
        });
    const section4 = Object.values(order.cart)
        .filter((i) => {
            return beverages[i.id].section && beverages[i.id].section === "4";
        })
        .sort((a, b) => {
            return beverages[a.id].subSection < beverages[b.id].subSection ? -1 : 1;
        });
    const section5 = Object.values(order.cart)
        .filter((i) => {
            return beverages[i.id].section && beverages[i.id].section === "5";
        })
        .sort((a, b) => {
            return beverages[a.id].subSection < beverages[b.id].subSection ? -1 : 1;
        });
    const section6 = Object.values(order.cart)
        .filter((i) => {
            return beverages[i.id].section && beverages[i.id].section === "6";
        })
        .sort((a, b) => {
            return beverages[a.id].subSection < beverages[b.id].subSection ? -1 : 1;
        });
    const section7 = Object.values(order.cart)
        .filter((i) => {
            return beverages[i.id].section && beverages[i.id].section === "7";
        })
        .sort((a, b) => {
            return beverages[a.id].subSection < beverages[b.id].subSection ? -1 : 1;
        });

    const sectionNone = Object.values(order.cart).filter((i) => {
        return !beverages[i.id].section;
    });

    // TODO: Refactor into one function

    const OrganizedCart = [section1, section2, section3, section4, section5, section6, section7, sectionNone].flat();

    const orderArray = Object.values(OrganizedCart).map((i) => {
        const flavors =
            i.hasOwnProperty("flavors") &&
            Object.entries(i.flavorsQuantity)
                .filter((x) => {
                    return x[1] !== "" && x[1] !== "0";
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
                <Text style={$.orders.l}>
                    {beverages[i.id].section || ""}
                    {beverages[i.id].subSection || ""}
                </Text>
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
    const ordersMapped = chunk(orderArray, 2).map((i) => {
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
                        <Text style={$.heading.date}>{moment().format("MM/DD/2020")}</Text>
                    </View>
                    <Text style={$.heading.license}>LIC.NO.CO. : 1301787</Text>
                </View>

                <View style={$.wrapper} fixed>
                    <View style={$.ordersHeader}>
                        <Text style={$.ordersHeader.w}>LO</Text>
                        <Text style={$.ordersHeader.w}>WH</Text>
                        <Text style={$.ordersHeader.c}> Cases</Text>
                        <Text style={$.ordersHeader.d}>Description</Text>
                        <Text style={$.ordersHeader.ch}>CHK</Text>
                    </View>
                    <View style={$.ordersHeader}>
                        <Text style={$.ordersHeader.w}>LO</Text>
                        <Text style={$.ordersHeader.w}>WH</Text>
                        <Text style={$.ordersHeader.c}> Cases</Text>
                        <Text style={$.ordersHeader.d}>Description</Text>
                        <Text style={$.ordersHeader.ch}>CHK</Text>
                    </View>
                </View>
                {ordersMapped}
                <Text style={$.footer}>Total Cases: {orderModel.CalculateCases(order.cart)} </Text>
                <Text style={$.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
            </Page>
        </Document>
    );
};

const $ = {
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
        borderBottom: "2 solid #565656",
        marginBottom: "4",
    },
    seperator: {
        position: "absolute",
        top: "-4",
        height: "113%",
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
        l: { flexBasis: "10%" },
        w: { flexBasis: "10%" },
        c: { flexBasis: "15%" },
        d: { flexBasis: "55%" },
        ch: { flexBasis: "10%" },
    },
    orders: {
        width: "48%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        // marginBottom: "8",
        l: { flexBasis: "10%", textTransform: "uppercase" },
        w: { flexBasis: "10%" },
        c: { flexBasis: "15%", textAlign: "center", paddingRight: "5%" },
        d: { flexBasis: "55%", textTransform: "uppercase", fontSize: "11", paddingRight: "10%" },
        ch: { flexBasis: "10%" },
        flavorsWrapper: {
            paddingVertical: "4",
            marginLeft: "35%",
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
