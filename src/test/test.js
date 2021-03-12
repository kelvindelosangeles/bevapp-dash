import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import beverages from "../Assets/Data/Store";
import { Colors } from "../Constants/Colors";

const Test = () => {
    const beverages = Object.values(useSelector((state) => state.Firestore.data.inventory.beverages));
    console.log(beverages);

    return (
        <Component>
            <header>
                <h4>Price sheet</h4>
            </header>
            <section>
                <div className='grid_header'>
                    <p></p>
                    <p>Code</p>
                    <p>Description</p>
                    <p>Cost</p>
                    <p>S/P</p>
                    <p>S/P</p>
                </div>
                {beverages
                    .filter((x) => {
                        return x.id !== "123TEST";
                    })
                    .map((a, index) => {
                        return (
                            <div>
                                <p>{index + 1}</p>
                                <p>{a.id}</p>
                                <p>{a.description}</p>
                                <p>${a.price}</p>
                                <p className='underline'></p>
                                <p className='underline'></p>
                            </div>
                        );
                    })}
            </section>
        </Component>
    );
};
const Component = styled.div`
    background-color: white;
    padding: 24px 0;
    header {
        margin-bottom: 24px;
        padding: 0 16px;
    }
    section {
        display: grid;
        .grid_header {
            font-weight: 600;
        }
        div {
            display: grid;
            grid-template-columns: 30px 1fr 3fr 1fr 1fr 1fr;
            grid-column-gap: 24px;
            padding: 12px 16px;
            page-break-after: always;
            :nth-of-type(even) {
                background-color: ${Colors.lightGrey};
            }

            p {
                text-transform: uppercase;
            }
            .underline {
                border-bottom: 1px solid ${Colors.grey};
            }
        }
    }
`;
export default Test;
