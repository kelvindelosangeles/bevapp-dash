import React, { Component } from "react";
import styled from "styled-components";

class SpecialPricesPrintout extends Component {
    render() {
        const { customers, beverages } = this.props;
        const getCost = (id) => {
            try {
                return "$" + beverages[id].cost;
            } catch (error) {
                return "";
            }
        };
        const getSalesPrice = (id) => {
            try {
                return "$" + beverages[id].price;
            } catch (error) {
                return "";
            }
        };
        return (
            <Comp>
                <header>
                    <h3>Customers with Special Prices </h3>
                </header>
                <div className='list'>
                    {Object.values(customers)
                        .filter((z) => {
                            return !z.disabled;
                        })
                        .filter((a) => {
                            return a.hasOwnProperty("specialPrices") && Object.values(a.specialPrices).length > 0;
                        })
                        .map((b) => {
                            return (
                                <div className='customer'>
                                    <div className='header'>
                                        <p style={{ textTransform: "uppercase" }}>{b.address}</p>
                                    </div>
                                    <div className='item-list'>
                                        <div
                                            className='item'
                                            style={{
                                                fontSize: 12,
                                                fontWeight: "bold",
                                                textTransform: "uppercase",
                                                paddingBottom: 12,
                                            }}>
                                            <p>ID</p>
                                            <p>Cost</p>
                                            <p>Sales Price</p>
                                            <p>Special Price</p>
                                        </div>
                                        {Object.values(b.specialPrices).map((c) => {
                                            return (
                                                <div className='item'>
                                                    <p>{c.id}</p>
                                                    <p>{getCost(c.id)} </p>
                                                    <p>{getSalesPrice(c.id)}</p>
                                                    <p>${c.price}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </Comp>
        );
    }
}

export default SpecialPricesPrintout;
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
        page-break-inside: avoid;
        margin-bottom: 64px;
        .header {
            padding: 16px;
            background-color: black;
            color: white;
        }
        .item-list {
            .item {
                padding: 8px 16px;
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                :nth-of-type(even) {
                    background-color: #d3d3d369;
                }
            }
        }
    }
`;
