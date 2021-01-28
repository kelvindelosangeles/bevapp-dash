import React from "react";
import styled from "styled-components";
import { View, Text } from "@react-pdf/renderer";

const Header = () => {
    return (
        <View style={$.contact} fixed>
            <Text>Alex Beverageeee</Text>
            <Text>Beer and Soda Distributor</Text>
            <Text>1231 Lafayette Avenue</Text>
            <Text>Bronx, New York</Text>
            <Text>(212) 304-8888</Text>
            <Text>(718) 993-5555</Text>
        </View>
    );
};

const $ = {
    contact: {
        textAlign: "center",
        marginBottom: "20",
    },
};

export default Header;
