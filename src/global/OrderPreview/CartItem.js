import React from "react";
import styled from "styled-components";
import TrashIcon from "@material-ui/icons/Delete";
import { Colors } from "../../Constants/Colors";
import { connect } from "react-redux";
import { Order as OrderModel } from "../../Models/Order";

const CartItem = ({ item, dispatch, readOnly, sidebarExpanded, customer }) => {
    const { qty, description } = item;

    const removeItem = () => {
        console.log(item);
        window.confirm(`Remove ${item.description}?`) && dispatch({ type: "REMOVE_ITEM", id: item.id });
    };
    const ToggleModal = () => {
        return readOnly ? null : item.hasOwnProperty("flavors") ? dispatch({ type: "TOGGLE_ATCF", item }) : dispatch({ type: "TOGGLE_ATC", item });
    };
    const flavors =
        item.hasOwnProperty("flavorsQuantity") &&
        Object.entries(item.flavorsQuantity)
            .filter((i) => {
                return Number(i[1] > 0);
            })
            .map((i) => {
                return (
                    <Flavor>
                        <p>{i[1]}</p>
                        <span>x</span>
                        <p>{i[0]}</p>
                    </Flavor>
                );
            });

    return (
        <React.Fragment>
            <Order readOnly={readOnly} expand={sidebarExpanded}>
                <div className='quantity' onClick={ToggleModal}>
                    {qty}
                </div>
                <span>x</span>
                <p className='itemTitle'>{description}</p>
                <p className='cost'>
                    {OrderModel.CalculateItem(item, customer.specialPrices)}
                    {readOnly ? null : <TrashIcon onClick={removeItem} />}
                </p>
            </Order>
            {flavors}
        </React.Fragment>
    );
};

const Order = styled.div`
    display: flex;
    align-items: baseline;
    margin-bottom: 16px;
    .quantity {
        width: 26px;

        font-weight: 700;
        font-size: 16px;
        text-align: right;
        margin-right: 8px;
        cursor: ${(props) => {
            return props.readOnly ? "default" : "pointer";
        }};
           :hover {
            color: ${(props) => {
                return props.readOnly ? Colors.black : Colors.blue;
            }};
            transform: ${(props) => {
                return props.readOnly ? "scale(1)" : "scale(1.2)";
            }};
        }
    }
    span {
        font-weight: 500;
        font-size: 11px;
        letter-spacing: 0;
        line-height: 0.4;
        margin-right: 16px;
    }
    .itemTitle {
        font-weight: 500;
        font-size: 16px;
        max-width: ${({ expand }) => {
            return expand ? "150px" : "249px";
        }};
        text-transform: capitalize;
    }
    .cost {
        font-weight: 700;
        font-size: 16px;
        margin-left: auto;
        display: flex;
        align-items: center;
        svg {
            margin-left: 14px;
            color: ${Colors.black};
            font-size: 20px;
            cursor: pointer;
            :hover {
                color: ${Colors.red};
            }
        }
    }
`;

const Flavor = styled.div`
    display: flex;
    align-items: center;
    padding-left: 80px;
    margin-bottom: 8px;
    p,
    span {
        font-weight: 700;
        font-size: 14px;
        margin-right: 8px;
        :last-child {
            text-transform: capitalize;
        }
    }
`;

export default connect((state) => {
    return {
        sidebarExpanded: state.GlobalState.sidebarExpanded,
    };
})(CartItem);
