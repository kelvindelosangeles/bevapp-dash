import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import SPHome from "./Routes/SPHome";
import SPAdd from "./Routes/SPAdd";

const SpecialPricing = () => {
    return (
        <Container>
            <Switch>
                <Route exact path='/specialpricing/' component={SPHome} />
                <Route path='/specialpricing/add/:customerid' component={SPAdd} />
            </Switch>
        </Container>
    );
};

const Container = styled.div`
    grid-area: app;
`;

export default SpecialPricing;
