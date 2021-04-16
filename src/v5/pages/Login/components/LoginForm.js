import React from "react";
import { useForm } from "react-hook-form";
import { useFirebase } from "react-redux-firebase";
import styled from "styled-components";
import colors from "../../../constants/Colors";
const LoginForm = ({ toggle }) => {
    const { register, reset, handleSubmit } = useForm();
    const firebase = useFirebase();
    const submitHandler = (data) => {
        const { email, password } = data;
        firebase
            .login({
                email,
                password,
            })
            .then(() => {
                console.log("success");
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
                <p className='subheading'>Login to your bevapp account to get started</p>
            </header>
            <div className='input-group'>
                <p className='label'>Email</p>
                <input className='bevapp-input' type='text' name='email' ref={register({ required: true })} />
            </div>
            <div className='input-group'>
                <p className='label'>Password</p>
                <input className='bevapp-input' type='password' name='password' ref={register({ required: true })} />
            </div>
            <button>Login</button>
            <div className='toggle' onClick={() => toggle(true)}>
                Forgot Password?
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
        padding: 16px 0;
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
export default LoginForm;

// TODO:
// Add error handeling within the UI
