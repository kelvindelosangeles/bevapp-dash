import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";
const TempNav = (props) => {
    switch (props.location.pathname) {
        case "/":
            return (
                <Component>
                    <NavLink to='/rapidorder'>
                        <p>Go To RapidOrder</p>
                    </NavLink>
                </Component>
            );

        default:
            return null;
    }
};
const Component = styled.div`
    padding: 16px;
    background-color: white;

    p {
        color: black;
        font-weight: 600;
        text-align: center;
    }
`;
export default withRouter(TempNav);
