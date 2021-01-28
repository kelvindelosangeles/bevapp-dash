import {
    Button,
    ButtonGroup,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { Colors } from "../../Constants/Colors";
import firebase from "firebase";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SalesByItem from "../../Global/PrintTemplates/SalesByItem";

const SOBI = ({ history }) => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [reportStats, setReportStats] = useState(null);
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [beverage, setBeverage] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [companyReport, setCompanyReport] = useState(true);
    const [detailedReport, setDetailedReport] = useState(true);

    const beverages = Object.values(useSelector((state) => state.Firestore.data.inventory.beverages));

    const nextStepHandler = () => {
        setActiveStep((prevState) => prevState + 1);
    };
    const cancelHandler = () => {
        window.confirm("are you sure you want to cancel this report?") && history.push("/dashboard");
    };
    const resetHandler = () => {
        setBeverage(null);
        setFromDate(null);
        setToDate(null);
        setCompanyReport(true);
        setReportData(null);
        setActiveStep(0);
        setOpen(true);
    };
    const beverageSelectHandler = (e, data) => {
        setBeverage(data);
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

    const generateReportHandler = () => {
        const ordersFiltered = orders
            .filter((a) => {
                return moment(a.details.createdAt).isBetween(moment(fromDate), moment(toDate));
            })
            .filter((b) => {
                return b.cart.hasOwnProperty(beverage.id);
            })
            .sort((c, d) => {
                return c.customer.address > d.customer.address ? 1 : -1;
            });

        if (ordersFiltered.length < 1) {
            window.alert("No Items Found");
            return;
        }
        const beverageCount = ordersFiltered
            .map((a) => {
                return parseInt(a.cart[beverage.id].qty);
            })
            .reduce((c, d) => {
                return c + d;
            });

        setReportData(ordersFiltered);
        setReportStats({
            beverage: beverage.id,
            beverageCount,
            from: moment(fromDate).format("L"),
            to: moment(toDate).format("L"),
        });
        setOpen(false);
    };

    useEffect(() => {
        const getOrders = async () => {
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
                    .flat()
                    .map((b) => {
                        return Object.values(b.orders);
                    })
                    .flat();
                setOrders(data);
                setLoading(false);
                setOpen(true);
            } catch (error) {
                console.log(error);
                window.alert("An error has occured");
            }
        };
        getOrders();
    }, []);

    return (
        <Component>
            {loading && (
                <div className='loading'>
                    <Typography variant='overline'> Fetching Data</Typography>
                    <CircularProgress />
                </div>
            )}
            <Dialog open={open} fullWidth>
                <DialogTitle>Sales Order by Item Report</DialogTitle>
                <div className='stepper'>
                    <Stepper activeStep={activeStep} orientation='vertical'>
                        <Step>
                            <StepLabel>{beverage ? beverage.id : "Beverage"}</StepLabel>
                            <StepContent>
                                <Autocomplete
                                    options={beverages}
                                    getOptionLabel={(option) => option.id}
                                    renderInput={(params) => <TextField {...params} label='Select a beverage' variant='standard' />}
                                    onChange={(e, data) => beverageSelectHandler(e, data)}
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
                        <Step>
                            <StepLabel>Options</StepLabel>
                            <StepContent>
                                <FormGroup>
                                    <FormControlLabel
                                        label={<Typography variant='subtitle2'>Show Results for Whole Company</Typography>}
                                        control={
                                            <Switch checked={companyReport} color='primary' onChange={() => setCompanyReport((prev) => !prev)} />
                                        }
                                    />
                                    <FormControlLabel
                                        label={<Typography variant='subtitle2'>Show Detailed Report</Typography>}
                                        control={
                                            <Switch checked={detailedReport} color='primary' onChange={() => setDetailedReport((prev) => !prev)} />
                                        }
                                    />
                                </FormGroup>
                            </StepContent>
                        </Step>
                    </Stepper>
                </div>
                <StyledDialogActions>
                    {activeStep == 3 ? (
                        <Button size='large' variant='contained' color='primary' onClick={generateReportHandler}>
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
                </StyledDialogActions>
            </Dialog>

            {reportData && (
                <React.Fragment>
                    <div className='table'>
                        <Typography variant='overline'>Sales Order by Item Report</Typography>
                        <div className='grid head'>
                            <Typography variant='overline'>Item</Typography>
                            <Typography variant='overline'>From</Typography>
                            <Typography variant='overline'>To</Typography>
                            <Typography variant='overline'>Total Cases</Typography>
                            <Divider />
                            <Divider />
                            <Divider />
                            <Divider />
                        </div>

                        <div className='grid '>
                            <Typography variant='caption'>{reportStats.beverage}</Typography>
                            <Typography variant='caption'>{reportStats.from}</Typography>
                            <Typography variant='caption'>{reportStats.to}</Typography>
                            <Typography variant='caption'>{reportStats.beverageCount}</Typography>
                        </div>
                    </div>
                    {reportData && detailedReport && (
                        <div className='detailed-grid'>
                            {reportData.map((a, index) => {
                                return (
                                    <div className='item'>
                                        <Typography variant='overline'>{index + 1}</Typography>
                                        <Typography variant='overline'>{a.customer.address}</Typography>
                                        <Typography variant='overline'>{moment(a.details.createdAt).format("L")}</Typography>
                                        <Typography variant='overline'>{a.cart[beverage.id].qty} cases</Typography>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <div className='actions'>
                        <PDFDownloadLink
                            document={<SalesByItem data={reportData} stats={reportStats} detailedReport={detailedReport} />}
                            fileName={`Sales by item Report`}>
                            {({ loading }) =>
                                loading ? (
                                    "Loading..."
                                ) : (
                                    <Button size='large' variant='contained' color='primary'>
                                        Download Report
                                    </Button>
                                )
                            }
                        </PDFDownloadLink>

                        <Button size='large' variant='contained' color='secondary' onClick={resetHandler}>
                            Reset
                        </Button>
                    </div>
                </React.Fragment>
            )}
        </Component>
    );
};

const StyledDialogActions = withStyles({
    root: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        justifyItems: "flex-start",
        justifyContent: "space-between",
    },
})(DialogActions);

const Component = styled.div`
    background-color: ${Colors.white};
    padding: 24px;
    display: grid;
    grid-template-rows: max-content max-content max-content;
    grid-row-gap: 24px;
    .loading {
        margin: auto;
        display: grid;
        justify-content: center;
        justify-items: center;
    }
    .table {
        .grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            h5 {
                text-align: center;
            }
            h6 {
                border-right: 1px solid black;
                border-bottom: 1px solid black;
                text-align: center;
                text-transform: capitalize;
            }
        }
        .head {
            padding: 40px 0 16px 0;
        }
    }
    .actions {
        padding: 24px;
        background-color: ${Colors.lightGrey};
        display: grid;
        grid-template-columns: auto auto;
        grid-column-gap: 16px;
        justify-content: flex-end;
    }

    .detailed-grid {
        padding: 16px;
        background-color: ${Colors.lightGrey};
        max-height: 50vh;
        display: grid;
        grid-row-gap: 12px;
        overflow: scroll;
        .item {
            display: grid;
            grid-template-columns: 20px repeat(3, 1fr);
            grid-column-gap: 16px;
            border-bottom: 1px solid darkgray;
            margin-bottom: 8px;
        }
    }
`;

export default withRouter(SOBI);
