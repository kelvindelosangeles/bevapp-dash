import React from "react";
import styled from "styled-components";
import { Colors } from "../Constants/Colors";

const ChangeLog = () => {
    return (
        <Container>
            <p className='title'>Change Log</p>

            <Log>
                <header>
                    <p className='date'>April 3rd, 2020</p>
                    <p className='version'>v 1.0.1</p>
                </header>
                <ul>
                    <label>Customer and Warehouse Copies.</label>
                    <li>Font is now larger on customer and warehouse copies.</li>
                    <li>Customer and Warehouse copies display the total cases.</li>
                </ul>
                <ul>
                    <label>Sidebar</label>
                    <li>App can go full screen by clicking on the icon on the top left corner of the page.</li>
                </ul>
                <ul>
                    <label>Rapid Order Entry</label>
                    <li>When taking an order on Rapid Order the Input where you enter Stays visible throughout the whole order.</li>
                </ul>
                <ul>
                    <label>Special Pricing</label>
                    <li>Cancel button added to the special pricing page. When clicked it sends the user back to the main page.</li>
                    <li>Rapid Order is automatically updated if changing a special price while in the middle of an order.</li>
                </ul>
                <ul>
                    <label>Items Updated with Flavors</label>
                    <li>Mikes hard lemonade: MHL12B or MHL22B Mango, Lemonade, cranberry, apple. </li>
                    <li>Smirnoff: SMI12B or SMI22B Original, Apple, grape, mango, pineapple, screwdriver, Pina Colada, Orange. </li>
                    <li>Seirra Nevada: SEI12B or SEI22B Reg/ale, torpedo.</li>
                    <li>Sam Adams: SAA12B Boston Lgr, Cherry Wheat, East Indian.</li>
                    <li>Arizona: ARI20B or ARI24C Iced tea, half&half, peach, raspberry, mango, mango peach, pineapple. </li>
                    <li>
                        Snapple: SNA16B or SNA20B Apple, iced tea, diet iced tea, half&half, peach, diet peach, raspberry, raspberry peach, orangade,
                        grapade.
                    </li>
                    <li>Thanks Tabitha </li>
                </ul>
            </Log>
        </Container>
    );
};

const Container = styled.div`
    padding: 24px;
    font-family: Poppins;

    .title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 40px;
        padding-bottom: 16px;
        border-bottom: 1px solid ${Colors.lightGrey};
    }
`;

const Log = styled.div`
    header {
        display: flex;
        align-items: baseline;
        text-align: center;
        justify-content: center;
        margin-bottom: 24px;
    }
    .date {
        font-size: 18px;
        font-weight: 600;
        margin-right: 12px;
    }
    .version {
        font-size: 16px;
        font-weight: 500;
        color: ${Colors.grey};
    }
    label {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 16px;
    }
    ul {
        padding: 12px 40px;
    }
`;
export default ChangeLog;
