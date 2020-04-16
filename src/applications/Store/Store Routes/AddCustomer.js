import React, { useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { Colors } from "../../../Constants/Colors";
import { useSelector } from "react-redux";
import { withFirestore } from "react-redux-firebase";
const AddCustomer = ({ firestore }) => {
    // Switch All forms to FORMIK TODO:
    const [initialValues, setInitialValues] = useState({
        active: true,
        address: "",
        city: "nyc",
        cr: null,
        name: "",
        sla: "",
        telephone: "",
        id: "",
    });
    const customers = useSelector((state) => state.Firestore.ordered.store[0]);
    const AddCustomerForm = ({ handleChange, values, handleSubmit }) => {
        return (
            <Form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label>Customer ID</label>
                    <input type='text' name='id' value={values.id} onChange={handleChange} required autoComplete='off' />
                </div>
                <div className='input-group'>
                    <label>Store Name</label>
                    <input type='text' name='name' value={values.name} onChange={handleChange} required autoComplete='off' />
                </div>
                <div className='input-group'>
                    <label>City</label>
                    <select name='city' value={values.city} onChange={handleChange}>
                        <option value='nyc'>NYC</option>
                        <option value='bx'>BX</option>
                    </select>
                </div>
                <div className='input-group'>
                    <label>Address</label>
                    <input type='text' name='address' value={values.address} onChange={handleChange} required autoComplete='off' />
                </div>
                <div className='input-group'>
                    <label>SLA</label>
                    <input type='text' name='sla' value={values.sla} onChange={handleChange} required autoComplete='off' />
                </div>
                <div className='input-group'>
                    <label>Telephone</label>
                    <input type='number' name='telephone' value={values.telephone} onChange={handleChange} required autoComplete='off' />
                </div>
                <button>Submit</button>
            </Form>
        );
    };

    const submitHandler = (values, actions) => {
        if (customers.hasOwnProperty(values.id)) {
            alert(`A Customer with ID: ${values.id} already exists.  Please enter a new Customer ID`);
        } else {
            firestore
                .update(
                    {
                        collection: "store",
                        doc: "customers",
                    },
                    { [values.id]: values }
                )
                .then(() => {
                    console.log("Successfully Added A Customer");
                    actions.resetForm();
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error Please Contact Admin");
                });
        }
    };
    return (
        <Container>
            <div className='wrapper'>
                <Header>
                    <p className='page-title'>Add a Customer</p>
                </Header>
                <Formik initialValues={initialValues} onSubmit={(values, actions) => submitHandler(values, actions)}>
                    {AddCustomerForm}
                </Formik>
            </div>
        </Container>
    );
};

const Container = styled.div`
    grid-area: preview;
    position: relative;
    .wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: scroll;
        padding-bottom: 40px;
    }
`;
const Header = styled.div`
    margin-bottom: 40px;
    .page-title {
        font-weight: 700;
        font-size: 24px;
        text-align: center;
    }
`;
const Form = styled.form`
    padding: 16px;
    display: grid;
    grid-row-gap: 24px;
    .input-group {
        label {
            display: block;
            margin-bottom: 16px;
        }
        input,
        select {
            background-color: ${Colors.lightGrey};
            height: 56px;
            min-width: 100%;
            padding: 16px 8px;
            border: none;
            border-radius: 4px;
            background-color: #f5f5f5;
            -webkit-appearance: none;
            font-size: 16px;
        }
        select {
            cursor: pointer;
        }
    }
    button {
        padding: 18px 0;
        border-radius: 4px;
        background-color: ${Colors.black};
        font-weight: 700;
        font-size: 16px;
        color: #ffffff;
        width: 100%;
    }
`;

export default withFirestore(AddCustomer);
