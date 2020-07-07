import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Colors } from "../../../../../Constants/Colors";
import MiniOrder from "../../../components/MiniOrder";
import { Popover } from "@material-ui/core";
import OptionsIcon from "@material-ui/icons/BlurCircularRounded";
import { useSelector, useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { Order as ordersModel } from "../../../../../Models/Order";
import RoutePDF from "./RoutePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { completeRoute } from "../../../../../redux/actions/RouteActions";
import TotalRoutePDF from "../../../../../Global/PrintTemplates/TotalRoutePDF";

const RoutePreview = ({ data }) => {
    const [open, setOpen] = useState(false);
    const anchor = useRef();
    const orders = useSelector((state) => state.Firestore.data.ordersv2.orders);
    const routes = useSelector((state) => state.Firestore.data.routes.routes);
    const firestore = useFirestore();
    const dispatch = useDispatch();

    const BetaRouteOrders = () => {
        let obj = {};
        //TODO: Run this function to always keep an up to date list of orders even after some have been deleted, this can be done simpler once we remove orders from routes on delete
        data.orders.forEach((a) => {
            orders[a] && Object.assign(obj, { [a]: orders[a] });
        });
        return Object.values(obj);
    };

    const BetaDeleteRoute = () => {
        const { [data.details.routeID]: deleted, ...rest } = routes;
        console.log(deleted);
        console.log(rest);
        console.log("delete route");

        window.confirm("Are you sure you want to delete this route.  This action is irreversable") &&
            firestore.set(
                {
                    collection: "routes",
                    doc: "routes",
                },
                rest
            );
    };

    const BetaTotalCases = () => {
        try {
            return BetaRouteOrders()
                .map((x) => {
                    return ordersModel.CalculateCases(x.cart);
                })
                .reduce((a, b) => {
                    return parseInt(a) + parseInt(b);
                });
        } catch (err) {
            console.log(err);
            return "0";
        }
    };

    const orderTotal = () => {
        try {
            return BetaRouteOrders()
                .map((x) => {
                    return ordersModel.CalculateCart(x.cart, x.customer.specialPrices);
                })
                .reduce((a, b) => {
                    return (parseFloat(a) + parseFloat(b)).toFixed(2);
                });
        } catch (err) {
            console.log(err);
            return "0";
        }
    };

    // Tools needed to print an entire route

    return (
        <Component>
            <OptionsIcon ref={anchor} id='options-icon' onClick={() => setOpen(true)} />
            <div className='header'>
                <p className='heading'>Route Sheet</p>
                <div className='grid'>
                    <div className='data'>
                        <p>Driver</p>
                        <span>{`${data.driver.firstName} ${data.driver.lastName.slice(0, 1)}.`}</span>
                    </div>
                    <div className='data'>
                        <p>Cases</p>
                        <span>{BetaTotalCases()}</span>
                    </div>
                    <div className='data'>
                        <p>Route Total</p>
                        <span>${orderTotal()}</span>
                    </div>
                </div>
            </div>
            <div className='body'>
                <div className='heading'>Orders</div>
                {BetaRouteOrders().map((i) => {
                    return <MiniOrder order={i} />;
                })}
            </div>
            <Popover
                open={open}
                anchorEl={anchor.current}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}>
                <Menu>
                    <p className='pdf'>
                        <PDFDownloadLink
                            document={<RoutePDF route={BetaRouteOrders()} driver={data.driver.firstName.toUpperCase()} />}
                            fileName={`${data.driver.firstName.toUpperCase()}-Route-summary-sheet`}>
                            {({ loading }) => (loading ? "Loading..." : "Route Summary")}
                        </PDFDownloadLink>
                    </p>
                    <p className='pdf'>
                        <PDFDownloadLink
                            document={<TotalRoutePDF route={data} orders={orders} />}
                            fileName={`${data.driver.firstName.toUpperCase()}-Route`}>
                            {({ loading }) => (loading ? "Loading..." : "Print Total Route")}
                        </PDFDownloadLink>
                    </p>
                    <p className='complete' onClick={() => dispatch(completeRoute(data, firestore, setOpen))}>
                        Complete Route
                    </p>
                    <p className='delete' onClick={BetaDeleteRoute}>
                        Delete Route
                    </p>
                </Menu>
            </Popover>
        </Component>
    );
};
const Component = styled.div`
    min-width: 576px;
    position: relative;
    .header {
        padding: 16px 32px 24px 32px;
        background-color: ${Colors.navy};
        color: ${Colors.white};
        .heading {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 56px;
            text-align: center;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 118px;
            justify-content: space-between;

            .data {
                display: grid;
                justify-items: center;
                p {
                    white-space: nowrap;
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 8px;
                }
                span {
                    white-space: nowrap;
                    font-size: 16px;
                    text-transform: capitalize;
                    display: flex;
                    align-items: center;
                    svg {
                        margin-right: 8px;
                    }
                }
            }
        }
    }
    .body {
        padding: 32px;
        .heading {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 56px;
        }
    }
    #options-icon {
        position: absolute;
        top: 16px;
        right: 24px;
        color: ${Colors.white};
        cursor: pointer;
    }
`;

const Menu = styled.div`
    display: grid;
    p {
        padding: 16px 32px;
        font-size: 16px;
        font-weight: 600;
        border: 1px solid ${Colors.lightGrey};
        cursor: pointer;
        text-align: center;
    }
    a {
        color: ${Colors.black};
    }
    .edit {
        :hover {
            background-color: ${Colors.yellow};
        }
    }
    .delete {
        :hover {
            background-color: ${Colors.red};
            color: ${Colors.white};
        }
        .complete {
            :hover {
                background-color: ${Colors.green};
                color: ${Colors.black};
            }
        }
    }
`;
export default RoutePreview;
