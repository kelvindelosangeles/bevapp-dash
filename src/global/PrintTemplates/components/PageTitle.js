import React from "react";
import styled from "styled-components";
import { View, Text } from "@react-pdf/renderer";
import { Colors } from "../../../Constants/Colors";
import Divider from "./Divider";

const PageTitle = ({ text = "missing text" }) => {
    const $ = {
        wrapper: {
            flexDirection: "row",
            alignItems: "center",
        },
        accent: {
            height: "15pt",
            width: "60pt",
            backgroundColor: Colors.navy,
            marginRight: 8,
        },
        text: {
            textTransform: "uppercase",
            fontSize: 9,
        },
    };

    return (
        <>
            <View style={$.wrapper}>
                <View style={$.accent} />
                <Text style={$.text}> {text}</Text>
            </View>
            <Divider mb={40} />
        </>
    );
};

export default PageTitle;
