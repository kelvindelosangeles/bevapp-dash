import React from "react";
import styled from "styled-components";
import { View } from "@react-pdf/renderer";
import { Colors } from "../../../Constants/Colors";
const Divider = ({ mb = 0, mt = 0 }) => {
    const $ = {
        height: 1,
        width: "100%",
        backgroundColor: Colors.navy,
        marginTop: mt,
        marginBottom: mb,
    };

    return <View style={$}></View>;
};
export default Divider;
