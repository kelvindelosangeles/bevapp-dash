import { Diamond, UserPlus } from "phosphor-react";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import colors from "../../constants/Colors";

const Costs = () => {
    const beverages = Object.values(useSelector((state) => state.Firestore.data.inventory.beverages)).filter((a) => {
        return !a.hasOwnProperty("cost");
    });

    const Beverage = ({ bev }) => {
        return (
            <div className='beverage'>
                <p>{bev.id}</p>
                <p>{bev.description}</p>
                <p>${bev.price}</p>
                <input type='text' placeholder='cost' />
                <div className='submit'>Submit</div>
            </div>
        );
    };

    console.log(beverages);
    return (
        <Component>
            <header>
                <h2>This is a temporary page designed to assist assigning costs to all beverages.</h2>
                <p>
                    Enter a cost for each beverage, and click submit when ready. If you make a mistake you can visit the store page to edit the cost
                </p>
            </header>

            <section>
                <h4>Remaining Beverages: {beverages.length}</h4>
            </section>

            <div className='grid'>
                {beverages.map((a) => {
                    return <Beverage bev={a} />;
                })}
            </div>
        </Component>
    );
};
const Component = styled.div`
    background-color: white;
    padding: 24px;
    height: 100vh;
    overflow: scroll;
    header {
        max-width: 80%;
        margin-bottom: 40px;
    }
    section {
        margin-bottom: 40px;
    }
    .grid {
        display: grid;

        .beverage {
            padding: 20px 8px;
            display: grid;
            align-items: center;
            grid-template-columns: 1fr 3fr 1fr 2fr 1fr;
            justify-items: flex-start;
            grid-column-gap: 24px;
            :nth-of-type(even) {
                background-color: ${colors.greyBackground};
            }
            p {
                text-transform: uppercase;
            }
            input {
                height: 40px;
                text-align: center;
                font-size: 20px;
                font-weight: 900;
            }
            .submit {
                padding: 12px 24px;
                background-color: ${colors.black};
                color: ${colors.white};
                border-radius: 8px;
                cursor: pointer;
                :hover {
                    background-color: white;
                    color: black;
                }
            }
        }
    }
`;
export default Costs;
