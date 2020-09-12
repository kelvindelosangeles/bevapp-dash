import React, { useState } from "react";
import styled from "styled-components";
import { Drivers } from "../../../../Assets/Data/Drivers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import MiniOrder2 from "../../components/MiniOrder2";

import { useSelector, useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import moment from "moment-timezone";
import shortid from "shortid";
import { withRouter } from "react-router-dom";
import { Colors } from "../../../../Constants/Colors";
import DatePickerv2 from "../../../../components/DatePickerv2";

const CreateRoute = ({ close }) => {
    const [driver, setDriver] = useState(null);
    const [theDate, setTheDate] = useState(moment().valueOf());
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
        let now = moment().valueOf();
        let timeZone = moment.tz.guess();
        let newRoute = {
            [routeID]: {
                driver,
                orders: routeOrders,
                details: {
                    createdAt: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
                    dates: {
                        createdAt: { date: now, tz: timeZone },
                        routeDate: { date: theDate, tz: timeZone },
                    },
                    routeID,
                },
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
            <div className='heading'>
                <p>New Route</p>
                <DatePickerv2 light={false} label={"Route Date"} theDate={theDate} onChange={setTheDate} />
            </div>
            <Autocomplete
                options={Drivers}
                getOptionLabel={(option) => option.firstName}
                renderInput={(params) => <TextField {...params} label='Select a Driver' variant='standard' />}
                onChange={driverChangeHandler}
                value={driver}
                autoComplete={false}
            />
            {driver && (
                <Body>
                    <div className='subheading'>Add Orders to your Route</div>
                    {availableOrders()}
                    <div className='actions'>
                        <button onClick={submitHandler}>Create Route</button>
                    </div>
                </Body>
            )}
        </Component>
    );
};

const Component = styled.div`
    padding: 32px;
    position: relative;
    .heading {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 24px;
        p {
            font-size: 24px;
            font-weight: 600;
        }
        input,
        label {
            color: black !important;
            cursor: pointer;
        }
        .MuiFormControl-root.MuiTextField-root {
            width: 100% !important;
            margin-bottom: 40px;
        }
        .MuiInputLabel-animated {
            color: black !important;
        }
    }
    .MuiFormControl-root {
        width: 50%;
    }
    #options-icon {
        position: absolute;
        top: 16px;
        right: 24px;
        color: ${Colors.black};
        cursor: pointer;
    }
`;
const Body = styled.div`
    .subheading {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 32px;
        margin-top: 40px;
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
