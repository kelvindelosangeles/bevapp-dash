import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import RoutePreview from "./RoutePreview";
import { Order as OrderModel } from "../../../../../Models/Order";
import { useSelector } from "react-redux";
const SingleRoute = ({ data }) => {
    const [open, toggle] = useState(false);
    const orders = useSelector((state) => state.Firestore.data.ordersv2.orders);
    const BetaRouteOrders = () => {
        let obj = {};
        //TODO: Run this function to always keep an up to date list of orders even after some have been deleted, this can be done simpler once we remove orders from routes on delete
        data.orders.forEach((a) => {
            orders[a] && Object.assign(obj, { [a]: orders[a] });
        });
        return Object.values(obj);
    };
    const orderTotal = () => {
        try {
            return BetaRouteOrders()
                .map((x) => {
                    return OrderModel.CalculateCart(x.cart, x.customer.specialPrices);
                })
                .reduce((a, b) => {
                    return (parseFloat(a) + parseFloat(b)).toFixed(2);
                });
        } catch (err) {
            console.log(err);
            return "0";
        }
    };
    const totalCases = () => {
        try {
            return BetaRouteOrders()
                .map((x) => {
                    return OrderModel.CalculateCases(x.cart);
                })
                .reduce((a, b) => {
                    return parseInt(a) + parseInt(b);
                });
        } catch (err) {
            console.log(err);
            return "0";
        }
    };

    return (
        <React.Fragment>
            <Component className='item' onClick={() => toggle(true)}>
                <p className='driver-name'>{data.driver.firstName + " " + data.driver.lastName.slice(0, 1)}</p>
                <p>{BetaRouteOrders().length}</p>
                <p>{totalCases()}</p>
                <p>${orderTotal()}</p>
                <p>Pending</p>
            </Component>
            <Dialog open={open} onClose={() => toggle(false)} scroll='paper' onBackdropClick={() => toggle(false)}>
                <RoutePreview data={data} />
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
