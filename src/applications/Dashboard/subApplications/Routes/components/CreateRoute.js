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
import { withRouter } from "react-router-dom";

const CreateRoute = ({ close }) => {
    const [driver, setDriver] = useState(null);
    const [routeOrders, setRouteOrders] = useState([]);
    const orders = useSelector((state) => state.Firestore.data.ordersv2.orders);
    const firestore = useFirestore();
    // BETA
    const ar = useSelector((state) => state.Firestore.data.routes.routes);
    const allRouteOrders = Object.values(ar)
        .map((a) => {
            return a.orders;
        })
        .flat();

    const driverChangeHandler = (e, value) => {
        setDriver(value);
    };
    const toggleOrder = (order) => {
        let orderID = order.details.orderID;
        let doesOrderExist = routeOrders.indexOf(orderID);
        const removeFromArray = () => {
            return routeOrders.filter((a) => {
                return a !== orderID;
            });
        };
        const addToArray = () => {
            return routeOrders.concat(orderID);
        };
        return doesOrderExist === -1 ? setRouteOrders(addToArray()) : setRouteOrders(removeFromArray());
    };
    const availableOrders = () => {
        return Object.values(orders)
            .filter((f) => {
                return allRouteOrders.indexOf(f.details.orderID) < 0;
            })
            .map((i) => {
                return <MiniOrder2 data={i} onClick={() => toggleOrder(i)} active={routeOrders.indexOf(i.details.orderID) > -1} />;
            });
    };
    const submitHandler = () => {
        let routeID = driver.firstName.slice(0, 3) + driver.lastName.slice(0, 1) + shortid.generate();
        let newRoute = {
            [routeID]: {
                driver,
                orders: routeOrders,
                details: { createdAt: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }), routeID },
            },
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
                    close();
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
                onChange={driverChangeHandler}
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

export default withRouter(CreateRoute);
