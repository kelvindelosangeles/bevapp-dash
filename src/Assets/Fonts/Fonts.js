import { createGlobalStyle } from "styled-components";

import AvenirBold from "./AvenirNext-Bold.ttf";
import AvenirRegular from "./AvenirNext-Regular.ttf";
import AvenirMedium from "./AvenirNext-Medium.ttf";
import AvenirDemiBold from "./AvenirNext-DemiBold.ttf";
import AvenirHeavy from "./AvenirNext-Heavy.ttf";

export default createGlobalStyle`
@font-face {
    font-family: 'AvenirNext-Regular';
    src: url(${AvenirRegular}) format('ttf');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'AvenirNext-Medium';
    src: url(${AvenirMedium}) format('ttf');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'AvenirNext-DemiBold';
    src: url(${AvenirDemiBold}) format('ttf');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'AvenirNext-Bold';
    src: url(${AvenirBold}) format('ttf');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'AvenirNext-Heavy';
    src: url(${AvenirHeavy}) format('ttf');
    font-weight: normal;
    font-style: normal;
}
`;
