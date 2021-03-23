import { MoreVert } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import colors from "../../../constants/Colors";
const Header = ({ register }) => {
    return (
        <Component>
            <header>
                <p className='bevapp-page-heading'>Accounts Overview</p>
                <input className='bevapp-input' name='search' type='search' placeholder='Search' ref={register()} />
                <i className='bevapp-icon'>
                    <MoreVert />
                </i>
            </header>
        </Component>
    );
};
const Component = styled.div`
    header {
        background-color: ${colors.white};
        margin: 20px 16px;
        padding: 16px;
        border-radius: 8px;
        display: grid;
        align-items: center;
        grid-column-gap: 16px;
        grid-template-columns: 1fr auto;
        grid-template-areas:
            "heading ."
            "search action";
        p {
            margin-bottom: 16px;
            grid-area: heading;
        }
        input {
            grid-area: search;
            width: 100%;
        }
        i {
            grid-area: action;
            cursor: pointer;
        }
        @media (min-width: 768px) {
            grid-template-columns: auto 1fr 2fr auto;
            grid-template-areas: "heading . search action";
            p {
                margin-bottom: unset;
                margin-right
            }
        }
    }
`;
export default Header;
