import React from "react";
import styled from "styled-components";
import moment from "moment";
import UserIcon from "@material-ui/icons/PeopleAlt";
import { Colors } from "../../Constants/Colors";
import MenuIcon from "@material-ui/icons/AspectRatio";
import { connect } from "react-redux";

const AppHeader = ({ dispatch }) => {
    const theDate = moment().format("dddd,  MMM Do YYYY");
    const expandHandler = () => {
        dispatch({
            type: "TOGGLE_DRAWER"
        });
    };

    return (
        <AppHeaderWrapper>
            <MenuIcon onClick={expandHandler} />
            <TodaysDate>{theDate}</TodaysDate>
            <User>
                <UserIcon />
                <div>
                    <h6>Kelvin De Los Angeles</h6>
                    <p>Admin</p>
                </div>
            </User>
        </AppHeaderWrapper>
    );
};

const AppHeaderWrapper = styled.div`
    grid-area: appheader;
    display: flex;
    align-items: center;
    min-height: 80px;
    width: 100%;
    padding: 0 32px;
    background-color: ${Colors.white};
    svg {
        cursor: pointer;
        font-size: 24px;
    }
`;

const TodaysDate = styled.p`
    font-family: "Poppins";
    font-weight: 400;
    color: ${Colors.black};
    font-size: 14px;
    margin-left: 40px;
`;

const User = styled.div`
    display: flex;
    margin-left: auto;
    h6 {
        font-family: Poppins;
        font-weight: 600;
        font-size: 16px;
    }
    p {
        font-family: "Poppins";
        font-weight: 400;

        color: ${Colors.greyText};
        font-size: 14px;
    }
    svg {
        font-size: 18px;
        margin-right: 8px;
    }
`;

export default connect()(AppHeader);
