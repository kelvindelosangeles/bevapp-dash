import React from "react";
import BackIcon from "@material-ui/icons/ArrowBackIosRounded";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colors } from "../../../Constants/Colors";

const GoBack = props => {
  return (
    <GoBackWrapper to={props.to}>
      <BackIcon />
      <p>Go Back</p>
    </GoBackWrapper>
  );
};

const GoBackWrapper = styled(Link)`
  padding: 24px 0;
  /* position: absolute;
  top: 24px;
  left: 24px; */
  display: flex;
  cursor: pointer;
  text-decoration: none;
  color: ${Colors.black};
  svg {
    margin-right: 16px;
  }
`;

export default GoBack;
