import React, { useState } from "react";
import styled from "styled-components";
import Page from "../../components/Page";
import pattern from "../../assets/images/backgrounds/wild-sea.png";
import LoginForm from "./components/LoginForm";
import ForgotPassword from "./components/ForgotPassword";

const Login = () => {
    const [forgotPass, setForgotPass] = useState(false);
    return <Page background={pattern}>{forgotPass ? <ForgotPassword toggle={setForgotPass} /> : <LoginForm toggle={setForgotPass} />}</Page>;
};

export default Login;
