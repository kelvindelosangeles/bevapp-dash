import React from "react";
import { useForm } from "react-hook-form";
import { useFirebase } from "react-redux-firebase";
import styled from "styled-components";
import colors from "../../../constants/Colors";

const ForgotPassword = ({ toggle }) => {
    const { register, reset, handleSubmit } = useForm();
    const firebase = useFirebase();
    const submitHandler = (data) => {
        const { email } = data;
        firebase
            .resetPassword(email)
            .then(() => {
                console.log("successfully sent reset email");
                window.alert("Please check your email and follow the steps to reset your password");
                toggle(false);
            })
            .catch((error) => {
                console.log(error);
                window.alert(error.message);
            });
    };

    return (
        <Component onSubmit={handleSubmit(submitHandler)}>
            <header>
                <h5>Welcome to Bevapp</h5>
                <p className='subheading'>Enter your email to reset your password</p>
            </header>
            <div className='input-group'>
                <p className='label'>Email</p>
                <input className='bevapp-input' type='email' name='email' ref={register({ required: true })} />
            </div>
            <button>Reset Password</button>
            <div className='toggle' onClick={() => toggle(false)}>
                Sign in
            </div>
        </Component>
    );
};
const Component = styled.form`
    justify-self: center;
    align-self: center;
    border-radius: 8px;
    background-color: ${colors.white};
    padding: 64px 40px;
    min-width: 400px;
    box-shadow: ${colors.shadow};
    header {
        text-align: center;
        margin-bottom: 24px;
        h5 {
            font-size: 24px;
            font-weight: 700;
            text-transform: capitalize;
            margin-bottom: 8px;
        }
        p {
            font-weight: 500;
        }
    }
    .input-group {
        padding: 8px 0;
        .label {
            margin-bottom: 8px;
            font-size: 12px;
            text-transform: uppercase;
        }
        input {
            width: 100%;
        }
    }
    button {
        margin-top: 16px;
        width: 100%;
        background-color: ${colors.black};
        border: none;
        height: 48px;
        border-radius: 4px;
        font-size: 16px;
        color: white;
        font-weight: 600;
        transition: all 200ms ease-in-out;
        margin-bottom: 16px;
        :hover {
            transform: scale(0.97);
        }
        :active {
            background-color: ${colors.purple};
        }
    }
    .toggle {
        transition: all 200ms ease-in-out;
        font-size: 14px;
        cursor: pointer;
    }
`;
export default ForgotPassword;
