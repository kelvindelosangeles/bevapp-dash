import React from "react";
import moment from "moment";
import { Page, Text, View, Document, Font, StyleSheet } from "@react-pdf/renderer";

const NonOrderReportPDF = ({ allCustomers, customers, theDate, orders }) => {
    const getLastOrderDate = (id) => {
        try {
            const customerOrders = orders
                .sort((a, b) => {
                    return moment(a.details.createdAt).valueOf() > moment(b.details.createdAt).valueOf() ? 1 : -1;
                })
                .filter((a) => {
                    return a.customer.id === id;
                });

            if (customerOrders.length === 0) {
                return "no orders";
            }
            return moment(customerOrders[customerOrders.length - 1].details.createdAt).format("L");
        } catch (error) {
            console.log(error);
            return "error";
        }
    };

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
                    <Text>Non Order Report</Text>
                    <Text>No Orders Since {moment(theDate).format("L")}</Text>
                </View>

                <View style={$.ordersHeader} fixed>
                    <Text style={$.ordersHeader.index}>#</Text>
                    <Text style={$.ordersHeader.label}>Customer</Text>
                    <Text style={$.ordersHeader.label}>Telephone</Text>
                    <Text style={$.ordersHeader.label}>Last Order Date</Text>
                </View>

                {customers
                    .sort((a, b) => {
                        return a.address > b.address ? 1 : -1;
                    })
                    .map((a, index) => {
                        return (
                            <View style={$.order} wrap={false}>
                                <Text style={$.order.index}>{index + 1}</Text>
                                <Text style={$.order.value}>{a.address}</Text>
                                <Text style={$.order.value}>{a.telephone}</Text>
                                <Text style={$.order.value}>{getLastOrderDate(a.id)}</Text>
                            </View>
                        );
                    })}

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
});
export default NonOrderReportPDF;
