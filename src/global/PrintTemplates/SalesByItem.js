import React from "react";
import styled from "@react-pdf/styled-components";
import DocumentWrapper from "./components/DocumentWrapper";
import Header from "./components/Header";
import PageTitle from "./components/PageTitle";
import { View, Text } from "@react-pdf/renderer";
import Divider from "./components/Divider";
import moment from "moment-timezone";
import { Order as ordersModel } from "../../Models/Order";

const SalesByItem = ({ data, stats, detailedReport }) => {
    return (
        <DocumentWrapper>
            <PageTitle text='Sales By Item Report' />
            <View style={$.summary}>
                <View style={$.header}>
                    <Text style={$.header.label}>Report</Text>
                    <Text style={$.header.text}>Beverage</Text>
                    <Text style={$.header.text}>From</Text>
                    <Text style={$.header.text}>To</Text>
                    <Text style={$.header.text}>Total Cases</Text>
                </View>
                <Divider mb={6} mt={6} />
                <View style={$.header}>
                    <Text style={$.header.label}></Text>
                    <Text style={$.header.text}>{stats.beverage}</Text>
                    <Text style={$.header.text}>{stats.from}</Text>
                    <Text style={$.header.text}>{stats.to}</Text>
                    <Text style={$.header.text}>{stats.beverageCount} Cases</Text>
                </View>
            </View>
            {detailedReport && (
                <View style={$.orders}>
                    <View style={$.header}>
                        <Text style={$.header.label}>Orders</Text>
                        <Text style={$.header.text}>Customer</Text>
                        <Text style={$.header.text}>Created At</Text>
                        <Text style={$.header.text}>Cases</Text>
                        <Text style={$.header.text}></Text>
                    </View>
                    <Divider mt={6} />
                </View>
            )}
            {detailedReport &&
                data.map((a, index) => {
                    return (
                        <View style={$.order} wrap={false}>
                            <Text style={{ ...$.order.value }}>{index + 1}</Text>
                            <Text style={{ ...$.order.value, textTransform: "uppercase" }}>{a.customer.address}</Text>
                            <Text style={$.order.value}>{moment(a.details.createdAt).format("L")}</Text>
                            <Text style={$.order.value}>{a.cart[stats.beverage].qty} Cases</Text>
                        </View>
                    );
                })}
        </DocumentWrapper>
    );
};

const $ = {
    summary: {
        marginBottom: 40,
    },
    order: {
        flexDirection: "row",
        paddingTop: 8,
        paddingBottom: 8,
        borderBottom: "1 solid lightgray",
        value: {
            flexBasis: "20%",
            fontSize: 8,
        },
    },
    header: {
        flexDirection: "row",
        label: {
            fontSize: 9,
            flexBasis: "20%",
            textTransform: "uppercase",
        },
        text: {
            fontSize: 8,
            flexBasis: "20%",
            textTransform: "uppercase",
        },
    },
};

export default SalesByItem;
