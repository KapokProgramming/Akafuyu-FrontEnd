import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Contents, Input, Wrapper } from "./Register.style";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";

const Register = () => {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [displayname, setDisplayname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('')

    const OnSubmit = (e: React.ChangeEvent<any>): void => {
        e.preventDefault();

        if (!username || !displayname || !email || !password || !conPassword) {
            setErrorMessage("Please complete the form")
            return;
        }

        if (conPassword !== password) {
            setErrorMessage("Password doesn't match")
        } else {
            const body = {
                username: username,
                email: email,
                displayname: displayname,
                password: password
            }

            const payload = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }

            fetch(`http://${import.meta.env.VITE_BACKEND}:7700/register`, payload)
                .then(res => res.json())
                .then(data => {
                    if (data.status !== "success") {
                        setErrorMessage(data["data"]);
                        return;
                    } else {
                        // window.localStorage.setItem("jwt", data["data"])
                        navigate('/login')
                    }
                })
        }

        setPassword('');
        setConPassword('')

    }

    return (
        <>
            <Navbar />
            <Wrapper>
                <Contents>
                    {errorMessage.length > 0 && (
                        <Alert message={errorMessage} />
                    )}
                    <h2>Register</h2>
                    <Input>
                        <TextField value={username} onChange={e => setUsername(e.target.value)} fullWidth label="Username" id="fullWidth" required={true} type="text" />
                    </Input>

                    <Input>
                        <TextField value={displayname} onChange={e => setDisplayname(e.target.value)} fullWidth label="Displayname" id="fullWidth" required={true} type="text" />
                    </Input>

                    <Input>
                        <TextField value={email} onChange={e => setEmail(e.target.value)} fullWidth label="Email" id="fullWidth" required={true} type="email" />
                    </Input>

                    <Input>
                        <TextField value={password} onChange={e => setPassword(e.target.value)} fullWidth label="Password" id="fullWidth" required={true} type="password" />
                    </Input>

                    <Input>
                        <TextField value={conPassword} onChange={e => setConPassword(e.target.value)} fullWidth label="Confirm-Password" id="fullWidth" required={true} type="password" />
                    </Input>
                    <Button onClick={OnSubmit} variant="outlined" size="large">Register</Button>
                </Contents>
            </Wrapper>

        </>
    );



}

export default Register;