import { DeleteRounded, RemoveRounded } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Colors } from "../../../../../Constants/Colors";
import CustomerSelect from "../../../../../Global/CustomerSelect/CustomerSelect";
import { removeFromCart, updateCustomer } from "../../../../../redux/actions/RapidOrderActions";
import PageHeader from "./PageHeader";

const Edit = () => {
    const customer = useSelector((state) => state.RapidOrderState.customer);
    const basket = useSelector((state) => state.RapidOrderState.cart);
    const dispatch = useDispatch();
    const customerChangeHandler = (e, value) => {
        dispatch(updateCustomer(value));
    };

    const Item = ({ data }) => {
        console.log(data);
        let DisplayPrice = () => {
            try {
                return "$ " + parseFloat(customer.specialPrices[data.id].price).toFixed(2);
            } catch (err) {
                return "$ " + data.price;
            }
        };
        const removeItem = () => {
            if (window.confirm(`Delete ${data.id} ?`)) {
                dispatch(removeFromCart(data.id));
            }
        };
        const updateQuantity = () => {
            // FIXME: Move the logic to the actons
            dispatch({
                type: data.flavors ? "TOGGLE_ATCF" : "TOGGLE_ATC",
                item: data,
            });
        };

        return (
            <div className='item'>
                <p className='qty' onClick={updateQuantity}>
                    {data.qty}
                </p>
                <div className='details'>
                    <p className='id'>{data.id}</p>
                    <p className='description'>{data.description}</p>
                </div>
                <div className='price'>
                    <p className='original'>{DisplayPrice()}</p>
                    {/* <p className='special'>23.99</p> */}
                </div>
                <DeleteRounded onClick={removeItem} />
            </div>
        );
    };

    return (
        <Component>
            <PageHeader>
                <p>Basket</p>
            </PageHeader>
            <CustomerSelect className='customer-select' customerChangeHandler={customerChangeHandler} selectedCustomer={customer} />
            <div className='basket'>
                {Object.values(basket).map((a) => {
                    return <Item data={a} />;
                })}
            </div>
        </Component>
    );
};
const Component = styled.div`
    overflow: scroll;
    display: grid;
    padding: 16px;
    align-content: flex-start;
    .customer-select {
        margin-bottom: 32px;
    }
    .basket {
        display: grid;
        grid-row-gap: 16px;
        padding-bottom: 40px;
    }
    .item {
        display: grid;
        grid-template-columns: 42px 1fr auto auto;
        align-items: center;
        grid-column-gap: 24px;
        .qty {
            width: 42px;
            height: 42px;
            background-color: ${Colors.lightGrey};
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .details {
            .id {
                font-size: 14px;
                font-weight: 500;
            }
            .description {
                font-size: 12px;
                color: ${Colors.greyText};
            }
        }
        .price {
            font-size: 14px;
        }
        .orginal.special {
            text-decoration: line-through;
        }
        svg {
            color: ${Colors.red};
        }
    }
`;
export default Edit;
