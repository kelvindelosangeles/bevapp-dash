import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import RoutePreview from "./RoutePreview";
import { Order as OrderModel } from "../../../../../Models/Order";
const SingleRoute = ({ data }) => {
    const [open, toggle] = useState(false);
    // TODO: Add to models
    const orderTotal = Object.values(data.orders)
        .map((x) => {
            return OrderModel.CalculateCart(x.cart, x.customer.specialPrices);
        })
        .reduce((a, b) => {
            return (parseFloat(a) + parseFloat(b)).toFixed(2);
        });
    const totalCases = Object.values(data.orders)
        .map((x) => {
            return OrderModel.CalculateCases(x.cart);
        })
        .reduce((a, b) => {
            return parseInt(a) + parseInt(b);
        });

    console.log(data);
    return (
        <React.Fragment>
            <Component className='item' onClick={() => toggle(true)}>
                <p className='driver-name'>{data.driver.firstName + " " + data.driver.lastName.slice(0, 1)}</p>
                <p>{Object.values(data.orders).length}</p>
                <p>{totalCases}</p>
                <p>${orderTotal}</p>
                <p>Pending</p>
            </Component>
            <Dialog open={open} onClose={() => toggle(false)} scroll='paper' onBackdropClick={() => toggle(false)}>
                <RoutePreview />
            </Dialog>
        </React.Fragment>
    );
};
const Component = styled.div`
    .driver-name {
        text-transform: uppercase;
    }
`;

export default SingleRoute;
