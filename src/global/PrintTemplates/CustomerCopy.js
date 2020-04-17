import React from "react";
import styled from "styled-components";
import { Order as OrderModel } from "../../Models/Order";
import moment from "moment";

class CustomerCopy extends React.Component {
    cart = () => {
        return this.props.activeOrder.cart;
    };

    render() {
        const ordersArray = Object.values(this.cart()).map((i) => {
            const flavorsArray =
                i.hasOwnProperty("flavorsQuantity") &&
                Object.entries(i.flavorsQuantity)
                    .filter((i) => {
                        return i[1] > 0;
                    })
                    .map((i) => {
                        return (
                            <Flavor>
                                <p>{i[1]}</p>
                                <p>x</p>
                                <p> {i[0]}</p>
                            </Flavor>
                        );
                    });

            return (
                <React.Fragment>
                    <Quantity>{i.qty}</Quantity>
                    <div className='description'>
                        <p>{i.description}</p>
                        {flavorsArray}
                    </div>
                    <p className='price'>{OrderModel.CalculateItem(i, this.props.activeOrder.customer.specialPrices)}</p>
                </React.Fragment>
            );
        });

        return (
            <CustomerCopyWrapper ref={this.props.reference}>
                <Header>
                    <h5>Alex Beverage</h5>
                    <p>Beer &amp; Soda Distributor</p>
                    <p>1231 Lafayette Avenue</p>
                    <p>Bronx, New York</p>
                    <p>(212) 304-8888</p>
                    <p>(718) 993-5555</p>
                </Header>
                <Address>{this.props.activeOrder.customer.address}</Address>
                <TaxNotice>Tax and Deposits Included</TaxNotice>
                <SecondaryHeader>
                    <h3>LIC. NO.CO</h3>
                    <div>
                        <h3>Thank you for your order</h3>
                        <h3>{moment(this.props.activeOrder.details.createdAt).format("MM/DD/2020")}</h3>
                    </div>
                </SecondaryHeader>
                <DBOrderHeader>
                    <h3>Cases</h3>
                    <h3>Description</h3>
                    <h3>Total</h3>
                </DBOrderHeader>
                <OrderContainer>
                    <h3>Cases</h3>
                    <h3>Description</h3>
                    <h3>Total</h3>
                    {ordersArray}
                </OrderContainer>
                <Footer>
                    <div className='order-data'>
                        <p>Total Cases : {OrderModel.CalculateCases(this.props.activeOrder.cart)}</p>
                        <p>invoice Total: $ {OrderModel.CalculateCart(this.cart(), this.props.activeOrder.customer.specialPrices)}</p>
                    </div>
                    <p className='credit'>Credits ______________________</p>
                    <div className='balances'>
                        <p>Balance _____________________</p>
                        <p>Balance _____________________</p>
                    </div>
                    <p className='paid'>Amount Paid _____________________</p>
                    <div className='signature'>
                        <p>Signature _____________________</p>
                        <p>Date _____________________</p>
                    </div>
                </Footer>
            </CustomerCopyWrapper>
        );
    }
}

const CustomerCopyWrapper = styled.div`
    width: 100%;
    margin: auto;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    @media print {
        * {
            page-break-inside: avoid;
        }
    }
    h3 {
        font-family: OpenSans-SemiBold;
        font-size: 14px;
        text-align: center;
        border-radius: 4px;
    }
`;
const Header = styled.header`
    margin-bottom: 40px;
    padding: 8px;
    h5 {
        font-family: OpenSans-ExtraBold;
        font-size: 14px;
        color: #000000;
        text-align: center;
        margin-bottom: 4px;
    }
    p {
        font-family: OpenSans-SemiBold;
        font-size: 14px;
        color: #000000;
        text-align: center;
    }
`;
const Address = styled.h3`
    padding: 16px 18px;
    align-self: flex-start;
    margin-bottom: 24px;
    border: 2px solid black;
    margin-left: 8px;
`;
const TaxNotice = styled.p`
    font-family: OpenSans-Regular;
    font-size: 9px;
    text-align: center;
    margin-bottom: 24px;
`;

const SecondaryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    padding: 0 8px;
    h3 {
        padding: 0;
    }
`;

const DBOrderHeader = styled.div`
    display: grid;
    grid-gap: 10px 16px;
    grid-template-columns: auto 1fr auto;
    justify-items: flex-start;
    padding: 8px;
    border-top: 1px dotted black;
    border-bottom: 1px dotted black;
`;

const OrderContainer = styled.div`
    display: grid;
    grid-gap: 0px 14px;
    grid-template-columns: auto 1fr auto;
    justify-items: flex-start;
    padding: 0 8px;
    font-family: OpenSans-SemiBold;
    font-size: 14px;
    h3 {
        color: transparent;
        line-height: 0px;
        margin-bottom: 16px;
    }
`;

const Quantity = styled.p`
    padding: 2px;
    border: 1px solid black;
    width: 100%;
    text-align: center;
    height: fit-content;
`;

const Footer = styled.footer`
    page-break-after: always;
    page-break-inside: avoid;
    margin-top: auto;
    padding: 0 8px;
    p {
        font-family: OpenSans-SemiBold;
        font-size: 14px;
    }
    .order-data {
        padding-top: 40px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
    }
    .credit {
        margin-bottom: 16px;
    }
    .balances {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
    }
    .paid {
        margin-bottom: 16px;
    }
    .signature {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 16px;
        p {
            margin-left: 16px;
        }
    }
`;

const Flavor = styled.div`
    padding: 2px;
    padding-left: 16px;
    display: flex;
    p {
        margin-right: 8px;
    }
`;

export default CustomerCopy;
