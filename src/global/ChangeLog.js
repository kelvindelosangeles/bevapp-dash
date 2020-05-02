import React from "react";
import styled from "styled-components";
import { Colors } from "../Constants/Colors";
import BugIcon from "@material-ui/icons/BugReportRounded";
import NewIcon from "@material-ui/icons/GradeRounded";

const ChangeLog = () => {
    return (
        <Container>
            <p className='title'>Change Log</p>
            <Log>
                <header>
                    <p className='date'>April 20th, 2020</p>
                    <p className='version'>v 1.1.1 beta</p>
                </header>

                <ul>
                    <label>Dashboard</label>
                    <li>Redesigned Customer and Warehouse Print Copies</li>
                    <li>Warehouse Copy now includes double rows to save space and paper</li>
                    <li>On the Dashboard click on Warehouse PDF or Customer PDF and a docuement will generate that staff can print and email</li>
                </ul>
            </Log>
            <Log>
                <header>
                    <p className='date'>April 11th, 2020</p>
                    <p className='version'>v 1.1.0</p>
                </header>
                <ul>
                    <label>Notifications</label>
                    <li>
                        <NewIcon className='new' />
                        Now notifications appear on the top left corner of the screen when adding new items and deleting items in rapid order.
                    </li>
                </ul>
                <ul>
                    <label>Rapid Order</label>
                    <li>Entered an incorrect value on the flavors of an item? Click on the flavor and modify it directly.</li>
                    <li>Improved Visibility on Rapid Order items.</li>
                </ul>
                <ul>
                    <label>Dashboard</label>
                    <li>Case count is now visible on the orders page</li>
                    <li>Case count available on the order details</li>
                </ul>
                <ul>
                    <label>Store</label>
                    <li>
                        <BugIcon className='bug' /> Scrolling enabled on the add a beverage section
                    </li>
                </ul>
            </Log>
            <Log>
                <header>
                    <p className='date'>April 8th, 2020</p>
                    <p className='version'>v 1.0.2</p>
                </header>
                <ul>
                    <label>Add Flavors Modal</label>
                    <li>The screen that pops up when adding flavors in rapid order now appears in the center and can scroll</li>
                    <li>Flavors are now sorted alphabetically</li>
                </ul>
                <ul>
                    <label>Store</label>
                    <li>Fixed the scrolling issue when editing a store item.</li>
                    <li className='highlight'>
                        <NewIcon className='new' />
                        Edit Order now supports flavors. Click on the "has flavors" toggle and add or remove as many flavors to the item.
                    </li>
                    <li>You can now edit the Id and prices of exisitng beverages.</li>
                </ul>
            </Log>
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

    .title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 40px;
        padding-bottom: 16px;
        border-bottom: 1px solid ${Colors.lightGrey};
    }
`;

const Log = styled.div`
    margin-bottom: 80px;
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
        display: block;
    }
    ul {
        padding: 12px 40px;
        li {
            display: flex;
            padding: 4px 0;
            svg {
                margin-right: 8px;
                margin-left: -32px;
                align-self: flex-start;
            }
            .bug {
                color: ${Colors.red};
            }
            .new {
                color: ${Colors.yellow};
            }
        }
    }
`;
export default ChangeLog;
