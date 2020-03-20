import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Order as OrderModel } from "../../Models/Order";

class WarehouseCopy extends React.Component {
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

      return (
        <React.Fragment>
          <Quantity></Quantity>
          <p>{i.qty}</p>
          <div className="description">
            <p className="price">$ {i.description}</p>
            {flavorsArray}
          </div>
          <Quantity></Quantity>
        </React.Fragment>
      );
    });

    return (
      <WarehouseCopyWrapper ref={this.props.reference}>
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
          <h3>Warehouse</h3>
          <h3>Cases</h3>
          <h3>Description</h3>
          <h3>CHK</h3>
        </DBOrderHeader>
        <OrderContainer>
          <h3>Warehouse</h3>
          <h3>Cases</h3>
          <h3>Description</h3>
          <h3>CHK</h3>
          {ordersArray}
        </OrderContainer>
        <Footer>
          <div className="order-data">
            <p>Total Cases : 17</p>
            <p>invoice Total: $ {OrderModel.CalculateCart(this.cart())}</p>
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
      </WarehouseCopyWrapper>
    );
  }
}

const WarehouseCopyWrapper = styled.div`
  width: 100%;
  margin: auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  .description .price {
    margin-bottom: 4px;
  }
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
  grid-gap: 10px 32px;
  grid-template-columns: 62px 32px minmax(180px, 200px) auto;
  justify-items: flex-start;
  padding: 8px;
  border-top: 1px dotted black;
  border-bottom: 1px dotted black;
`;

const OrderContainer = styled.div`
  display: grid;
  grid-gap: 10px 32px;
  grid-template-columns: 62px 32px minmax(180px, 200px) auto;
  justify-items: flex-start;

  align-items: flex-start;
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
  width: 28px;
  min-height: 28px;
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
    :first-of-type {
      min-width: 20px;
      text-align: right;
    }
  }
`;

export default connect(state => {
  return {
    activeOrder: state.DashboardState.activeOrder
  };
})(WarehouseCopy);
