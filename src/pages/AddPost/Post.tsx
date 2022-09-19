import { useEffect, useState } from "react";
import { Title, Wrapper } from "./Post.style";
import { useJwt } from "react-jwt";
import PostContext from "./PostContext";
import PostInput from "./PostInput";
import PostOutput from "./PostOutput";
import Navbar from "../../components/Navbar/Navbar";
import { Button, Container, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import { JWT } from "../../model";
import { authHeader } from "../../services/data";
import { logout } from "../../services/data";


const Post = () => {
    const navigate = useNavigate();
    const [markdownText, setMarkdownText] = useState("");
    const [title, setTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [jwt, setJwt] = useState<string>('');
    const [user, setUser] = useState<string>('');

    const contextValue = {
        markdownText,
        setMarkdownText
    };


    useEffect(() => {
        const token = window.localStorage.getItem("jwt");

        if (!(token && token.length > 0 && token !== 'null')) {
            alert('please login');
            navigate('/');
        } else {
            setJwt(token)
        }
    }, [])

    const { decodedToken, isExpired } = useJwt<JWT>(jwt);

    useEffect(() => {
        if (isExpired) {
            alert('token expired');
            logout();
        } else {
            if (decodedToken !== null && typeof decodedToken !== 'undefined') {
                const user_id: string = `${decodedToken.iss}`;
                setUser(user_id);
            }
        }
    }, [decodedToken]);



    const handleSubmitPost = async () => {

        if (!title || !markdownText) {
            setErrorMessage('Incorrect information')
            return;
        }
        if (markdownText.length <= 20 || markdownText.length > 10000) {
            setErrorMessage("Content lenght most between 20 to 10000 characters")
            return;
        }

        const body = {
            author_id: user,
            title: title,
            raw_body: markdownText
        }

        const payload = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader()
            },
            body: JSON.stringify(body)
        }

        const response = await fetch(`http://${import.meta.env.VITE_BACKEND}:7700/posts`, payload)
        const { data, status, errors } = await response.json()
        if (errors || status !== "success") {
            setErrorMessage("Something went wrong");
            console.log(errors)
        }

        if (response.ok) {
            alert("Success");
            navigate('/');
        }


    }

    return (
        <PostContext.Provider value={contextValue}>
            <Navbar />
            <Wrapper>

                {errorMessage.length > 0 && (
                    <Alert message={errorMessage} />
                )}

                <Container>
                    <Title>Post</Title>
                    <TextField type="text" variant="filled" label="Title" onChange={event => { setTitle(event.target.value) }}></TextField>

                    <PostInput />
                    <PostOutput />

                    <div style={{ margin: "2rem" }}>
                        <Button variant="contained" color="primary" onClick={handleSubmitPost}>submit</Button>
                    </div>

                </Container>
            </Wrapper>

        </PostContext.Provider>
    );
};

export default Post;