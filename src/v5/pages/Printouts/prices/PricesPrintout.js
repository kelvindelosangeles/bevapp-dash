import React, { Component } from "react";
import styled from "styled-components";

class PricesPrintout extends Component {
    render() {
        const { beverages } = this.props;
        return (
            <Comp>
                <header>
                    <h3>Price List</h3>
                </header>
                <div className='list'>
                    <div className='customer head'>
                        <span></span>
                        <p>ID</p>
                        <p>Brand</p>
                        <p>Description</p>
                        <p>Cost</p>
                        <p>Price</p>
                    </div>
                    {Object.values(beverages)
                        .sort((a, b) => {
                            return a.id > b.id ? 1 : -1;
                        })
                        .map((a, index) => {
                            return (
                                <div className='customer'>
                                    <span>{index}</span>
                                    <p>{a.id}</p>
                                    <p>{a.brand}</p>
                                    <p>{a.description}</p>
                                    <p>${a.cost}</p>
                                    <p>${a.price}</p>
                                </div>
                            );
                        })}
                </div>
            </Comp>
        );
    }
}

export default PricesPrintout;
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
        display: grid;
        grid-template-columns: 1fr 1fr 2fr 4fr 1fr 1fr;
        grid-column-gap: 16px;
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
            text-transform: uppercase;
        }
    }
    .head {
        background-color: white;
        p {
            font-weight: bold;
        }
    }
`;
