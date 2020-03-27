import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import moment from "moment";
import styled from "styled-components";
import { PageTitle } from "../../../Global/Layout/StyledElements";

import AddressIcon from "@material-ui/icons/BusinessRounded";
import PhoneIcon from "@material-ui/icons/StayCurrentPortraitRounded";
import CityIcon from "@material-ui/icons/LocationCityRounded";

import { Order as OrdersModel } from "../../../Models/Order";
import { Colors } from "../../../Constants/Colors";
import { customers as backup } from "../../../Assets/Data/Customers";
import SpecialItemForm from "../Components/SpecialItemForm";

const SPAdd = ({ match, history, beverages, firestore, customers }) => {
    const [customer] = useState(customers[match.params.customerid]);
    const [itemCode, setItemCode] = useState("");
    const [specialPrices, setSpecialPrices] = useState(null);

    useEffect(() => {
        customer.specialPrices && setSpecialPrices({ ...customer.specialPrices });
    }, []);

    const addItemChangeHandler = e => {
        setItemCode(e.target.value.toUpperCase());
    };

    const addItemHandler = e => {
        e.preventDefault();

        const success = () => {
            setSpecialPrices({
                ...specialPrices,
                [itemCode]: {
                    id: itemCode,
                    price: beverages[itemCode].price,
                    date: moment(new Date()).format("DD/MM/YY"),
                    active: true
                }
            });
            setItemCode("");
        };
        const failed = () => {
            alert("That Item does not exist");
            setItemCode("");
        };
        beverages[itemCode] ? success() : failed();
    };

    const toggleActiveState = id => {
        const text = specialPrices[id].active ? "disable" : "enable";
        const bool = specialPrices[id].active ? false : true;
        window.confirm(`Are you sure you would like to ${text} Item ${id}`) &&
            setSpecialPrices({
                ...specialPrices,
                [id]: { ...specialPrices[id], active: bool }
            });
    };

    const submitHandler = e => {
        e.preventDefault();

        specialPrices === null
            ? alert("Please add a Special price before submitting")
            : firestore
                  .update(
                      {
                          collection: "store",
                          doc: "customers"
                      },
                      {
                          [match.params.customerid]: {
                              ...customer,
                              specialPrices: { ...specialPrices }
                          }
                      }
                  )
                  .then(() => {
                      console.log("success");
                      history.push("/specialpricing");
                  })
                  .catch(err => {
                      console.log(err);
                  });
    };

    const Savior = () => {
        firestore
            .set(
                {
                    collection: "store",
                    doc: "customers"
                },
                { ...backup }
            )
            .then(() => {
                console.log("success");
            })
            .catch(err => {
                console.log(err);
            });
    };

    const SPFormChangeHandler = e => {
        specialPrices[e.target.name].price.length > 4
            ? setSpecialPrices({
                  ...specialPrices,
                  [e.target.name]: {
                      ...specialPrices[e.target.name],
                      price: specialPrices[e.target.name].price.slice(0, 4)
                  }
              })
            : setSpecialPrices({
                  ...specialPrices,
                  [e.target.name]: {
                      ...specialPrices[e.target.name],
                      price: e.target.value
                  }
              });
    };

    const specialPricesArray =
        specialPrices &&
        Object.values(specialPrices).map(i => {
            return (
                <SpecialItemForm
                    state={specialPrices}
                    specialPrice={i}
                    beverages={beverages}
                    toggleActiveState={toggleActiveState}
                    onChange={SPFormChangeHandler}
                />
            );
        });

    return (
        <Grid>
            <PageTitle gridArea={"A"}>Add a Special Price</PageTitle>
            <CustomerDetails>
                <h6>{customer.name}</h6>
                <p>
                    <AddressIcon /> {customer.address}
                </p>
                <p>
                    <PhoneIcon /> {OrdersModel.formatTel(customer.telephone)}
                </p>
                <p>
                    <CityIcon /> {customer.city}
                </p>
            </CustomerDetails>
            <SpecialPrices>
                <h6>Beverage ID</h6>
                <h6>Sales Price</h6>
                <h6>Special Price</h6>
                <h6>Margin</h6>
                <h6>Last Edited</h6>
                <h6>Active</h6>
                {specialPricesArray}
            </SpecialPrices>
            <SPControls>
                <AddItem>
                    <p>Add An Item</p>
                    <form onSubmit={addItemHandler}>
                        <input placeholder='AMS12B' onChange={addItemChangeHandler} value={itemCode} />
                    </form>
                </AddItem>
                <SubmitButton onClick={submitHandler}> Submit</SubmitButton>
            </SPControls>
        </Grid>
    );
};

const Grid = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 390px;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
        "A B"
        "C B"
        "D B";
    padding: 0 32px 32px 32px;
`;

const CustomerDetails = styled.div`
    grid-area: C;
    margin-bottom: 64px;
    h6 {
        font-family: Poppins;
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 8px;
        text-transform: uppercase;
    }
    p {
        font-family: Poppins;
        font-weight: 500;
        font-size: 16px;
        display: flex;
        align-content: center;
        margin-bottom: 8px;
        text-transform: uppercase;
        svg {
            margin-right: 8px;
        }
    }
`;

const SpecialPrices = styled.div`
    grid-area: D;
    display: grid;
    grid-template-areas: "A A A A A A";
    align-content: flex-start;
    grid-row-gap: 8px;
    h6 {
        font-family: Poppins;
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 24px;
    }
    p {
        font-family: Poppins;
        font-size: 16px;
        margin-bottom: 8px;
        :last-of-type {
            margin-bottom: 0;
        }
    }
`;

const SPControls = styled.div`
    grid-area: B;
    display: flex;
    flex-direction: column;
    padding: 24px;
`;

const AddItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 64px;
    p {
        font-family: Poppins;
        font-weight: 500;
        font-size: 16px;
        margin-right: 16px;
    }
    input {
        padding: 10px 24px;
        font-size: 16px;
        font-family: Poppins;
        font-weight: 600;
        background-color: ${Colors.lightGrey};
        border: none;
        border-radius: 4px;
        max-width: 117px;
        text-align: center;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 16px 0;
    background-color: ${Colors.purple};
    border-radius: 4px;
    border: none;
    color: ${Colors.white};
    font-family: Poppins;
    font-weight: 700;
    font-size: 18px;
    margin-top: auto;
    cursor: pointer;
`;

export default connect(state => {
    return {
        beverages: state.Firestore.data.inventory.beverages,
        customers: state.Firestore.data.store.customers
    };
})(withFirestore(withRouter(SPAdd)));
