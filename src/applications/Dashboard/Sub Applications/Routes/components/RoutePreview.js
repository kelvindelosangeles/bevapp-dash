import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Colors } from "../../../../../Constants/Colors";
import MiniOrder from "../../../Components/MiniOrder";
import { Popover } from "@material-ui/core";
import OptionsIcon from "@material-ui/icons/BlurCircularRounded";

const RoutePreview = () => {
    const [open, setOpen] = useState(false);
    const anchor = useRef();
    return (
        <Component>
            <OptionsIcon ref={anchor} id='options-icon' onClick={() => setOpen(true)} />
            <div className='header'>
                <p className='heading'>Route Sheet</p>
                <div className='grid'>
                    <div className='data'>
                        <p>Driver</p>
                        <span>Danny p</span>
                    </div>
                    <div className='data'>
                        <p>Driver</p>
                        <span>Danny p</span>
                    </div>
                    <div className='data'>
                        <p>Driver</p>
                        <span>Danny p</span>
                    </div>
                </div>
            </div>
            <div className='body'>
                <div className='heading'>Orders</div>
                <MiniOrder />
                <MiniOrder />
                <MiniOrder />
                <MiniOrder />
            </div>
            <Popover
                open={open}
                anchorEl={anchor.current}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}>
                <Menu>
                    <p className='pdf'>pdf Link</p>
                    <p className='edit'>Edit Order</p>
                    <p className='delete'>Delete Order</p>
                </Menu>
            </Popover>
        </Component>
    );
};
const Component = styled.div`
    min-width: 576px;
    position: relative;
    .header {
        padding: 16px 32px 24px 32px;
        background-color: ${Colors.navy};
        color: ${Colors.white};
        .heading {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 56px;
            text-align: center;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 118px;
            justify-content: space-between;

            .data {
                display: grid;
                justify-items: center;
                p {
                    font-size: 18px;
                    font-weight: 600;
                    margin-bottom: 8px;
                }
                span {
                    font-size: 16px;
                }
            }
        }
    }
    .body {
        padding: 32px;
        .heading {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 56px;
        }
    }
    #options-icon {
        position: absolute;
        top: 16px;
        right: 24px;
        color: ${Colors.white};
        cursor: pointer;
    }
`;

const Menu = styled.div`
    display: grid;
    p {
        padding: 16px 32px;
        font-size: 16px;
        font-weight: 600;
        border: 1px solid ${Colors.lightGrey};
        cursor: pointer;
    }
    .edit {
        :hover {
            background-color: ${Colors.yellow};
        }
    }
    .delete {
        :hover {
            background-color: ${Colors.red};
            color: ${Colors.white};
        }
    }
`;
export default RoutePreview;
