import { MoreVert } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import colors from "../../../constants/Colors";
const Header = () => {
    return (
        <Component>
            <p className='bevapp-page-heading'>Post Summary</p>
            <i className='bevapp-icon'>
                <MoreVert />
            </i>
        </Component>
    );
};
const Component = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${colors.white};
    box-shadow: ${colors.shadow};
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
    .header {
        font-family: SourceSansPro-SemiBold;
        font-size: 24px;
        color: #000000;
    }
    i {
        cursor: pointer;
    }
`;
export default Header;
