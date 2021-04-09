import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomerSelect from "../../../Global/CustomerSelect/CustomerSelect";
import { Order as OrdersModel } from "../../../Models/Order";
import { Colors } from "../../../Constants/Colors";
import { useDispatch } from "react-redux";
import RemoveSpecialPriceFromAll from "../../../componentsv3/removeSpecialPriceFromAll";

const SPHome = ({ history, customers, beverages }) => {
    const customersWithSpecialPrices = () => {
        return Object.values(customers)
            .filter((i) => {
                return i.specialPrices;
            })
            .map((x) => {
                // First map is for the customer name
                const items = Object.values(x.specialPrices).map((i) => {
                    // second map is for the special item details
                    return (
                        // FIXME: Runs a check if the item exists
                        beverages[i.id] && (
                            <React.Fragment>
                                <p>{i.id}</p>
                                <p>$ {beverages[i.id].price}</p>
                                <p>$ {parseFloat(i.price).toFixed(2)}</p>
                                <p>$ {OrdersModel.CalcMargin(beverages[i.id].price, i.price)}</p>
                                <p>{i.date}</p>
                            </React.Fragment>
                        )
                    );
                });
                const goToCustomer = () => {
                    history.push(`/specialpricing/add/${x.id}`);
                };

                return (
                    <StyledCustomer>
                        <h5 onClick={goToCustomer}>{x.address}</h5>
                        <h6>Beverage ID</h6>
                        <h6>Sales Price</h6>
                        <h6>Special Price</h6>
                        <h6>Margin</h6>
                        <h6>Last Edited</h6>
                        {items}
                    </StyledCustomer>
                );
            });
    };
    const customerChangeHandler = (e, value) => {
        return value !== null && history.push(`/specialpricing/add/${value.id}`);
    };

    const dispatch = useDispatch();

    return (
        <Component>
            <header>
                <p>Special Prices</p>
            </header>
            <AddSPButton>
                <p>Add a Special Price</p>
                <CustomerSelect customerChangeHandler={customerChangeHandler} />
            </AddSPButton>
            <RemoveSpecialPriceFromAll />

            <CustomersGrid>
                <div className='wrapper'>{customersWithSpecialPrices()}</div>
            </CustomersGrid>
        </Component>
    );
};

const Component = styled.div`
    background-color: ${Colors.white};
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 390px;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
        "A A"
        "B D"
        "C C";
    padding: 0 32px 32px 32px;
    padding-bottom: 0;
    header {
        padding: 16px;
        padding-left: 0;
        margin-bottom: 40px;
        grid-area: A;
        p {
            font-size: 24px;
        }
    }
`;
const AddSPButton = styled.div`
    grid-area: B;
    align-self: center;
    width: 90%;
    align-items: center;
    justify-self: start;
    max-width: 300px;
    padding: 18px;
    padding-left: 0;
    border-radius: 4px;
    p {
        justify-content: flex-start;
        display: flex;
        align-items: center;
        font-weight: 700;
        font-size: 12px;
        text-transform: uppercase;
        margin-bottom: 4px;
    }
`;
const CustomersGrid = styled.div`
    grid-area: C;
    position: relative;
    overflow-y: scroll;
    .wrapper {
        padding: 32px 0;
        position: absolute;
        /* height: 100%; */
        width: 100%;
        /* overflow: scroll; */
        display: grid;
        grid-row-gap: 64px;
        align-content: flex-start;
    }
`;
const StyledCustomer = styled.div`
    display: grid;
    grid-template-areas:
        "A A A A A"
        "B B B B B";
    h5 {
        grid-area: A;

        font-weight: 600;
        font-size: 20px;
        margin-bottom: 24px;
        text-transform: uppercase;
        cursor: pointer;
    }
    h6 {
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 24px;
    }
    p {
        font-size: 16px;
        margin-bottom: 8px;
        :last-of-type {
            margin-bottom: 0;
        }
    }
`;

export default connect((state) => {
    return {
        customers: state.Firestore.data.store.customers,
        beverages: state.Firestore.data.inventory.beverages,
    };
})(withRouter(SPHome));
