import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Contents, Input, Wrapper } from "./Login.style";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const onUsernameChange = (e: React.ChangeEvent<any>): void => {
        const username = e.target.value;
        setUsername(username);
    }


    const onPasswordChange = (e: React.ChangeEvent<any>): void => {
        const password = e.target.value;
        setPassword(password);
    }

    const OnSubmit = (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        if (username.length <= 0 || password.length <= 0) { return }

        const body = {
            username: username,
            password: password
        }

        const payload = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        fetch(`http://${import.meta.env.VITE_BACKEND}:7700/login`, payload)
            .then(res => res.json())
            .then(data => {
                if (data["data"] === "Wrong Login Data" || data.status !== "success") {
                    setErrorMessage(data["data"]);
                    return;
                }
                window.localStorage.setItem("jwt", data["data"])
                alert("Login success")
                navigate('/')
            })

        setPassword('');
    }


    return (
        <>
            <Navbar />
            <Wrapper>
                <Contents>
                    {errorMessage.length > 0 && (
                        <Alert message={errorMessage} />
                    )}
                    <h1>Login</h1>
                    <Input>
                        <TextField value={username} onChange={onUsernameChange} fullWidth label="Username"  required={true} />
                    </Input>
                    <Input>
                        <TextField value={password} onChange={onPasswordChange} fullWidth label="Password"  required={true} type="password" />
                    </Input>
                    <Button variant="outlined" size="large" onClick={OnSubmit}>Login</Button>
                </Contents>
            </Wrapper>

        </>
    );



}

export default Login;