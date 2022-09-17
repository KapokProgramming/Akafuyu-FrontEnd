import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Contents, Input, Wrapper } from "./Register.style";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";

const Register = () => {

    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <Wrapper>
                <Contents>
                <h2>Register</h2>
                    <Input>
                        <TextField fullWidth label="Username" id="fullWidth" required={true} type="text" />
                    </Input>

                    <Input>
                        <TextField fullWidth label="Displayname" id="fullWidth" required={true} type="text" />
                    </Input>

                    <Input>
                        <TextField fullWidth label="Email" id="fullWidth" required={true} type="email" />
                    </Input>

                    <Input>
                        <TextField fullWidth label="Password" id="fullWidth" required={true} type="password" />
                    </Input>

                    <Input>
                        <TextField fullWidth label="Confirm-Password" id="fullWidth" required={true} type="password" />
                    </Input>
                    <Button variant="outlined" size="large">Register</Button>
                </Contents>
            </Wrapper>

        </>
    );



}

export default Register;