import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Order as OrdersModel } from "../../../Models/Order";
import { Colors } from "../../../Constants/Colors";
import CaseIcon from "../../../Assets/Icons/CaseIcon";

const DBStatBar = () => {
    return <DBStatBarWrapper>The stats go here</DBStatBarWrapper>;
};

const DBStatBarWrapper = styled.div``;

export default DBStatBar;
