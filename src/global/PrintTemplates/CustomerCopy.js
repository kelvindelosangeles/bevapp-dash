import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class CustomerCopy extends React.Component {
  cart = () => {
    try {
      return !this.props.editedCopy
        ? this.props.activeOrder.cart
        : this.props.activeOrder.editedOrder.cart;
    } catch (error) {
      return this.props.activeOrder.cart;
    }
  };

  render() {
    const ordersArray = Object.values(this.cart()).map(i => {
      const flavorsArray =
        i.hasOwnProperty("flavorsQuantity") &&
        Object.entries(i.flavorsQuantity)
          .filter(i => {
            return i[1] > 0;
          })
          .map(i => {
            return (
              <Flavor>
                <p>{i[1]}</p> <p>x</p> <p> {i[0]}</p>
              </Flavor>
            );
          });
      const calcTotal = (qty, price) => {
        return (qty * parseFloat(price).toFixed(2)).toFixed(2);
      };
      return (
        <React.Fragment>
          <Quantity>{i.qty}</Quantity>
          <div className="description">
            <p>{i.description}</p>
            {flavorsArray}
          </div>
          <p className="price">$ {calcTotal(i.qty, i.price)}</p>
        </React.Fragment>
      );
    });
    const totalCostArray = Object.values(this.cart()).map(i => {
      return parseFloat((i.qty * parseFloat(i.price)).toFixed(2));
    });
    const total = totalCostArray.reduce((a, b) => {
      return a + b;
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
            <h3>October 16th 2019</h3>
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
          <div className="order-data">
            <p>Total Cases : 17</p>
            <p>invoice Total: $ {total}</p>
          </div>
          <p className="credit">Credits ______________________</p>
          <div className="balances">
            <p>Balance _____________________</p>
            <p>Balance _____________________</p>
          </div>
          <p className="paid">Amount Paid _____________________</p>
          <div className="signature">
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
  h3 {
    font-family: OpenSans-SemiBold;
    font-size: 9px;
    text-align: center;
    border-radius: 4px;
  }
`;
const Header = styled.header`
  margin-bottom: 40px;
  padding: 8px;
  h5 {
    font-family: OpenSans-ExtraBold;
    font-size: 10px;
    color: #000000;
    text-align: center;
    margin-bottom: 4px;
  }
  p {
    font-family: OpenSans-SemiBold;
    font-size: 10px;
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
  grid-gap: 10px 16px;
  grid-template-columns: auto 1fr auto;
  justify-items: flex-start;
  padding: 0 8px;
  font-family: OpenSans-SemiBold;
  font-size: 10px;
  h3 {
    color: transparent;
    line-height: 0px;
  }
`;

const Quantity = styled.p`
  padding: 4px;
  border: 1px solid black;
  width: 100%;
  text-align: center;
  height: fit-content;
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 0 8px;
  p {
    font-family: OpenSans-SemiBold;
    font-size: 10px;
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
  padding: 4px;
  padding-left: 16px;
  display: flex;
  p {
    margin-right: 8px;
  }
`;

export default CustomerCopy;
