import React, { Component } from "react";
import styled from "styled-components";

class CustomersPrintout extends Component {
    render() {
        const { customers } = this.props;
        return (
            <Comp>
                <header>
                    <h3>Customers List</h3>
                </header>
                <div className='list'>
                    <div className='customer head'>
                        <span></span>
                        <p>Name</p>
                        <p>Address</p>
                        <p>Telephone</p>
                    </div>
                    {Object.values(customers)
                        .filter((z) => {
                            return !z.disabled;
                        })
                        .sort((a, b) => {
                            return a.name > b.name ? 1 : -1;
                        })
                        .map((a, index) => {
                            return (
                                <div className='customer'>
                                    <span>{index}</span>
                                    <p>{a.name}</p>
                                    <p>{a.address}</p>
                                    <p>{a.telephone}</p>
                                </div>
                            );
                        })}
                </div>
            </Comp>
        );
    }
}

export default CustomersPrintout;
const Comp = styled.div`
    @page {
        margin: 6mm;
    }
    padding: 24px;
    background-color: white;
    header {
        h3 {
            font-size: 24px;
        }
        margin-bottom: 40px;
    }
    .customer {
        display: flex;
        margin-top: 8px;
        margin-bottom: 8px;
        padding: 16px;

        page-break-inside: avoid;
        :nth-of-type(even) {
            background-color: #d3d3d369;
        }
        span {
            flex-basis: 10%;
        }
        p {
            flex-basis: 40%;
            text-transform: uppercase;
            :last-of-type {
                flex-basis: 10%;
            }
        }
    }
    .head {
        background-color: white;
        p {
            font-weight: bold;
        }
    }
`;
