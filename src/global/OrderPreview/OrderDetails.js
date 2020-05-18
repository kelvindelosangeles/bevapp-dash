import React from "react";
import styled from "styled-components";
import moment from "moment";

const OrderDetails = ({ orderID, createdAt, status, gridArea }) => {
    return (
        <OrderDetailsWrapper gridArea={gridArea}>
            <div className='row'>
                <div className='detail'>
                    <h6>Order ID</h6>
                    <p>{orderID.slice(6)}</p>
                </div>
                <div className='detail'>
                    <h6>Placed By</h6>
                    <p>Administrator Account</p>
                </div>
            </div>
            <div className='row'>
                <div className='detail'>
                    <h6>Ordered On</h6>
                    <p>{moment(createdAt).format("MMM DD, h:mm")}</p>
                </div>
                <div className='detail'>
                    <h6>Status</h6>
                    <p id='status'>{status}</p>
                </div>
            </div>
        </OrderDetailsWrapper>
    );
};

const OrderDetailsWrapper = styled.section`
    grid-area: ${(props) => props.gridArea};
    padding: 32px;
    .row {
        display: flex;
        :first-of-type {
            margin-bottom: 24px;
        }
    }
    .detail {
        flex: 1;
    }
    #status {
        color: #22aa99;

        font-weight: 700;
    }
    h6 {
        font-weight: 700;
        font-size: 16px;
    }
    p {
        font-weight: 500;
        font-size: 14px;
    }
`;

export default OrderDetails;
