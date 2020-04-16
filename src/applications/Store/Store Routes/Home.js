import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Colors } from "../../../Constants/Colors";
import AddBeverageIcon from "../../../Assets/Images/Icons/AddBeveragesIcon.svg";
import AddCustomerIcon from "../../../Assets/Images/Icons/AddCustomersIcon.svg";

const Home = () => {
    return (
        <HomeWrapper>
            <Card to='/store/addcustomer'>
                <img src={AddCustomerIcon} alt='' />
                <button>Add A New Customer</button>
            </Card>
            <Card to='/store/addbeverage'>
                <img src={AddBeverageIcon} alt='' />
                <button>Add A New Beverage</button>
            </Card>
        </HomeWrapper>
    );
};

const HomeWrapper = styled.div`
    position: relative;
    grid-area: preview;
    height: 100%;
    width: 100%;
    background-color: ${Colors.white};
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Card = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0;
    cursor: pointer;
    text-decoration: none;
    color: ${Colors.black};
    :hover {
        transform: scale(1.1);
        transition: all 200ms ease-in-out;
    }
    img {
        margin-bottom: 24px;
    }
    button {
        padding: 9px 24px;
        border-radius: 4px;
        border: 3px solid ${Colors.black};

        font-weight: 700;
        font-size: 13px;
        background-color: ${Colors.white};
        cursor: pointer;
    }
`;

export default Home;
