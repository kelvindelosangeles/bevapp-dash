import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

import STToggle from "./Components/STToggle";

import STCustomers from "./Components/STCustomers";
import STBeverages from "./Components/STBeverages";

import Home from "./Store Routes/Home";
import AddBeverage from "./Store Routes/AddBeverage";
import EditBeverage from "./Store Routes/EditBeverage";
import AddCustomer from "./Store Routes/AddCustomer";
import { Colors } from "../../Constants/Colors";

const Store = ({ sidebarExpanded }) => {
    const [storeToggle, setStoreToggle] = useState(true);

    const toggleStore = () => {
        setStoreToggle(!storeToggle);
    };

    return (
        <StoreWrapper expand={sidebarExpanded}>
            <main>
                <STToggle storeToggle={storeToggle} toggleStore={toggleStore} />
                {storeToggle ? <STBeverages /> : <STCustomers />}
            </main>
            <Switch>
                <Redirect exact from='/store' to='/store/home' />
                <Route path='/store/home' component={Home} />
                <Route path='/store/addbeverage' component={AddBeverage} />
                <Route path='/store/editbeverage/:id' component={EditBeverage} />
                <Route path='/store/addcustomer' component={AddCustomer} />
            </Switch>

            {/* <STPreview /> */}
        </StoreWrapper>
    );
};

const StoreWrapper = styled.div`
    background-color: ${Colors.white};
    grid-area: app;
    display: grid;
    grid-template-columns: ${({ expand }) => (expand ? "1fr 390px" : "1fr 500px")};
    grid-template-areas: "main preview";
    position: relative;
    height: 100%;
    width: 100%;
    main {
        grid-area: main;
        position: absolute;
        width: 100%;
        /* height: inherit; */
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 24px 24px 24px;
    }
`;

export default connect((state) => {
    return {
        sidebarExpanded: state.GlobalState.sidebarExpanded,
    };
})(Store);
