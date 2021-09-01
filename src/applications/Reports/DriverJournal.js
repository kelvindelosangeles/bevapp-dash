import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../Constants/Colors";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment-timezone";
import {
    Button,
    ButtonGroup,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Switch,
    TextField,
    Typography,
    withStyles,
} from "@material-ui/core";
import { Drivers } from "../../Assets/Data/Drivers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import { Order as OrdersModel } from "../../Models/Order";

const DriverJournal = ({ history }) => {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [fromDate, setFromDate] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [routes, setRoutes] = useState(null);
    const [driver, setDriver] = useState(null);

    useEffect(() => {
        const getRoutes = async () => {
            try {
                const response = await firebase.firestore().collection("ordersv2").get();
                const data = await response.docs
                    .filter((f) => {
                        // fitlers out orders coming from orders
                        return f.id != "orders";
                    })
                    .map((a) => {
                        return Object.values(a.data());
                    })
                    .flat();

                setRoutes(data);
                setLoading(false);
                setOpen(true);
            } catch (error) {
                console.log(error);
                window.alert("An error has occured");
            }
        };
        getRoutes();
    }, []);

    // console.log("routes", routes);
    // console.log("report Data", reportData);

    const nextStepHandler = () => {
        setActiveStep((prevState) => prevState + 1);
    };
    const driverSelectHandler = (e, data) => {
        setDriver(data);
        nextStepHandler();
    };
    const fromDateHandler = (data) => {
        setFromDate(data);
        nextStepHandler();
    };
    const toDateHandler = (data) => {
        setToDate(data);
        nextStepHandler();
    };
    const createReportHandler = () => {
        const data = routes
            .filter((a) => {
                // filter between dates
                // return a.details.dates
                //     ? moment(a.details.dates.routeDate.date).isBetween(moment(fromDate), moment(toDate).add(1, "days"))
                //     : moment(a.details.createdAt).isBetween(moment(fromDate), moment(toDate).add(1, "days"));
                return a.details.dates
                    ? moment(a.details.dates.routeDate.date).isBetween(moment(fromDate).subtract(1, "days"), moment(toDate))
                    : moment(a.details.createdAt).isBetween(moment(fromDate).subtract(1, "days"), moment(toDate));
            })
            .filter((b) => {
                // filter by driver name
                return b.driver.firstName == driver.firstName;
            });

        const total =
            data.length > 0 &&
            data
                .map((a) => {
                    return Object.values(a.orders);
                })
                .flat()
                .map((b) => {
                    return OrdersModel.CalculateCart(b.cart, b.customer.specialPrices);
                })
                .reduce((a, b) => {
                    return parseFloat(a) + parseFloat(b);
                })
                .toFixed(2);

        const cases =
            data.length > 0 &&
            data
                .map((a) => {
                    return Object.values(a.orders);
                })
                .flat()
                .map((b) => {
                    return OrdersModel.CalculateCases(b.cart);
                })
                .reduce((a, b) => {
                    return parseInt(a) + parseInt(b);
                });
        const routeOrders = data
            .map((a) => {
                return Object.values(a.orders);
            })
            .flat();

        if (data.length < 1) {
            window.alert("No items found");
            return;
        }

        setReportData({
            routes: data,
            total,
            cases,
            routeOrders,
        });
        setOpen(false);
    };
    const resetHandler = () => {
        setDriver(null);
        setFromDate(null);
        setToDate(null);
        setActiveStep(0);
    };
    const cancelHandler = () => {
        window.confirm("are you sure you want to cancel this report?") && history.push("/dashboard");
    };

    return (
        <Component>
            {loading && (
                <div className='loading'>
                    <Typography variant='overline'> Fetching Data</Typography>
                    <CircularProgress />
                </div>
            )}
            <Dialog open={open} fullWidth>
                <DialogTitle>Driver Journal</DialogTitle>
                <div className='stepper'>
                    <Stepper activeStep={activeStep} orientation='vertical'>
                        <Step>
                            <StepLabel>{driver ? driver.firstName : "Driver"}</StepLabel>
                            <StepContent>
                                <Autocomplete
                                    options={Drivers}
                                    getOptionLabel={(option) => option.firstName}
                                    renderInput={(params) => <TextField {...params} label='Select a driver' variant='standard' />}
                                    onChange={(e, data) => driverSelectHandler(e, data)}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>{fromDate ? "From: " + moment(fromDate).format("L") : "From Date"}</StepLabel>
                            <StepContent>
                                <DatePicker
                                    autoOk
                                    maxDate={moment().subtract(1, "days")}
                                    value={moment().subtract(1, "days")}
                                    onChange={(data) => fromDateHandler(data)}
                                />
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>{toDate ? "To: " + moment(toDate).format("L") : "To Date"}</StepLabel>
                            <StepContent>
                                <DatePicker
                                    autoOk
                                    minDate={moment(fromDate).add(1, "days")}
                                    maxDate={moment()}
                                    onChange={(data) => toDateHandler(data)}
                                />
                            </StepContent>
                        </Step>
                    </Stepper>
                </div>
                <DialogActions>
                    {activeStep == 3 ? (
                        <Button size='large' variant='contained' color='primary' onClick={createReportHandler}>
                            Create Report
                        </Button>
                    ) : (
                        <span></span>
                    )}
                    <ButtonGroup>
                        <Button size='large' variant='outlined' color='primary' onClick={resetHandler}>
                            reset
                        </Button>
                        <Button size='large' variant='outlined' color='secondary' onClick={cancelHandler}>
                            cancel
                        </Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
            {reportData && (
                <Report>
                    <header>
                        <Typography variant='subtitle1'> Driver Journal</Typography>
                    </header>
                    <section className='stats'>
                        <div className='stat'>
                            <Typography variant='overline'>Driver</Typography>
                            <Typography variant='caption' className='value'>
                                {driver.firstName}
                            </Typography>
                        </div>
                        <div className='stat'>
                            <Typography variant='overline'>From</Typography>
                            <Typography variant='caption' className='value'>
                                {moment(fromDate).format("L")}
                            </Typography>
                        </div>
                        <div className='stat'>
                            <Typography variant='overline'>To</Typography>
                            <Typography variant='caption' className='value'>
                                {moment(toDate).format("L")}
                            </Typography>
                        </div>
                        <div className='stat'>
                            <Typography variant='overline'>Cases</Typography>
                            <Typography variant='caption' className='value'>
                                {reportData.cases}
                            </Typography>
                        </div>
                        <div className='stat'>
                            <Typography variant='overline'>Total</Typography>
                            <Typography variant='caption' className='value'>
                                $ {reportData.total}
                            </Typography>
                        </div>
                    </section>
                    <section className='orders'>
                        <header>
                            <Typography variant='subtitle1'> Orders </Typography>
                        </header>
                        <div className='order'>
                            <Typography variant='overline'>Index</Typography>
                            <Typography variant='overline'>Customer</Typography>
                            <Typography variant='overline'>Created At</Typography>
                            <Typography variant='overline'>Total</Typography>
                            <Typography variant='overline'>Cases</Typography>
                        </div>
                        {reportData.routeOrders.map((a, index) => {
                            return (
                                <div className='order'>
                                    <Typography variant='overline'>{index + 1}</Typography>
                                    <Typography variant='overline'>{a.customer.alias || a.customer.address}</Typography>
                                    <Typography variant='overline'>{moment(a.details.createdAt).format("L")}</Typography>
                                    <Typography variant='overline'>$ {OrdersModel.CalculateCart(a.cart, a.customer.specialPrices)}</Typography>
                                    <Typography variant='overline'>{OrdersModel.CalculateCases(a.cart)}</Typography>
                                </div>
                            );
                        })}
                    </section>
                </Report>
            )}
        </Component>
    );
};
const Component = styled.div`
    background-color: ${Colors.white};
    padding: 24px;
    grid-area: app;
`;

const Report = styled.div`
    header {
        margin-bottom: 40px;
    }
    section.stats {
        display: grid;
        grid-template-columns: repeat(5, auto);
        margin-bottom: 40px;
        .stat {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-transform: capitalize;
            .value {
                font-weight: 700;
                font-size: 14px;
            }
        }
    }
    section.orders {
        display: grid;
        .order {
            display: grid;
            grid-template-columns: 1fr 4fr 2fr 2fr 2fr;
        }
    }
`;
export default withRouter(DriverJournal);
