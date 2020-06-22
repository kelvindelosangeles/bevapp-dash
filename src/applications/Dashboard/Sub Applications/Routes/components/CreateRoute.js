import React, { useState } from "react";
import styled from "styled-components";
import { Drivers } from "../../../../../Assets/Data/Drivers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import MiniOrder2 from "../../../components/MiniOrder2";
import { Colors } from "../../../../../Constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import moment from "moment";
import shortid from "shortid";

const CreateRoute = () => {
    const [driver, setDriver] = useState(null);
    const [routeOrders, setRouteOrders] = useState({});
    const orders = useSelector((state) => state.Firestore.data.ordersv2.orders);
    const dispatch = useDispatch();
    const firestore = useFirestore();

    const changeHandler = (e, value) => {
        setDriver(value);
    };

    const OrderClickHandler = (order) => {
        const orderID = order.details.orderID;
        const { [orderID]: deleted, ...rest } = routeOrders;
        // creates a Conditional Toggle
        return routeOrders.hasOwnProperty(order.details.orderID)
            ? // Check if the route orders contains the order clicked on
              setRouteOrders(rest)
            : // if it contains remove it using destructuring and update it with the new orders list
              setRouteOrders({ ...routeOrders, [order.details.orderID]: order });
        // if not, set add the clicked on route to the list
    };

    const availableOrders = () => {
        return Object.values(orders)
            .filter((f) => {
                return f;
                // TODO: Add a filter to allow only unassgined orders
            })
            .map((i) => {
                return <MiniOrder2 data={i} onClick={() => OrderClickHandler(i)} active={routeOrders.hasOwnProperty(i.details.orderID)} />;
            });
    };

    const submitHandler = () => {
        let routeID = driver.firstName.slice(0, 3) + driver.lastName.slice(0, 1) + shortid.generate();
        let newRoute = {
            [routeID]: { driver, orders: routeOrders, details: { createdAt: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }) } },
        };

        const createARouteFunction = () => {
            firestore
                .update(
                    {
                        collection: "routes",
                        doc: "routes",
                    },
                    newRoute
                )
                .then(() => {
                    console.log("successfully created a route");
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        Object.values(routeOrders).length < 1 ? window.alert("A route must contain at least 1 order") : createARouteFunction();

        //  TODO: Very Important data setup
        // moment(`${activeOrder.details.createdAt} 2020`).format("YYYYMMwE")
    };

    return (
        <Component>
            <div className='heading'>New Route</div>
            <Autocomplete
                options={Drivers}
                getOptionLabel={(option) => option.firstName}
                renderInput={(params) => <TextField {...params} label='Select a Driver' variant='standard' />}
                onChange={changeHandler}
                value={driver}
                autoComplete={false}
            />
            {driver && (
                <React.Fragment>
                    <Body>
                        <div className='subheading'>Add Orders to your Route</div>
                        {availableOrders()}
                        <div className='actions'>
                            <button onClick={submitHandler}>Create Route</button>
                        </div>
                    </Body>
                </React.Fragment>
            )}
        </Component>
    );
};
const Component = styled.div`
    padding: 32px;
    position: relative;
    #options-icon {
        position: absolute;
        top: 16px;
        right: 24px;
        color: ${Colors.black};
        cursor: pointer;
    }
    .heading {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 32px;
    }
    .MuiFormControl-root.MuiTextField-root {
        width: 40% !important;
        margin-bottom: 40px;
        /* FIXME: Figure out why i have to do this */
    }
`;

const Body = styled.div`
    .subheading {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 32px;
    }
    .actions {
        padding-top: 40px;
        display: flex;
        justify-content: flex-end;
        button {
            padding: 14px 32px;
            background-color: ${Colors.blue};
            color: ${Colors.white};
            font-size: 16px;
            font-weight: 600;
            outline: none;
            border: none;
            border-radius: 4px;
        }
    }
`;

export default CreateRoute;
