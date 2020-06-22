import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Colors } from "../../../../../Constants/Colors";
import MiniOrder from "../../../components/MiniOrder";
import { Popover } from "@material-ui/core";
import OptionsIcon from "@material-ui/icons/BlurCircularRounded";
import { useSelector } from "react-redux";
import { firestore } from "firebase";
import { useFirestore } from "react-redux-firebase";
import RoutePDF from "./RoutePDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const RoutePreview = ({ data }) => {
    const [open, setOpen] = useState(false);
    const anchor = useRef();
    const orders = useSelector((state) => state.Firestore.data.ordersv2.orders);
    const routes = useSelector((state) => state.Firestore.data.routes.routes);
    const firestore = useFirestore();

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

    return (
        <Component>
            <OptionsIcon ref={anchor} id='options-icon' onClick={() => setOpen(true)} />
            <div className='header'>
                <p className='heading'>Route Sheet</p>
                <div className='grid'>
                    <div className='data'>
                        <p>Driver</p>
                        <span>Danny p</span>
                    </div>
                    <div className='data'>
                        <p>Driver</p>
                        <span>Danny p</span>
                    </div>
                    <div className='data'>
                        <p>Driver</p>
                        <span>Danny p</span>
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
                        <PDFDownloadLink document={<RoutePDF route={BetaRouteOrders()} />} fileName={`Route.pdf`}>
                            {({ loading }) => (loading ? "Loading..." : "Route PDF")}
                        </PDFDownloadLink>
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
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 8px;
                }
                span {
                    font-size: 16px;
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
    }
`;
export default RoutePreview;
