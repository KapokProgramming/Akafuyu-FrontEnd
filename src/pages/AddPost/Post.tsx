import { useState } from "react";
import { Title, Wrapper } from "./Post.style";
import PostContext from "./PostContext";
import PostInput from "./PostInput";
import PostOutput from "./PostOutput";
import Navbar from "../../components/Navbar/Navbar";
import { Button, Container, FormControlLabel, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import { authHeader, decodeToken } from "../../services/data";
import { logout } from "../../services/data";
import Checkbox from "@material-ui/core/Checkbox";


const Post = () => {
    const navigate = useNavigate();
    const [markdownText, setMarkdownText] = useState("");
    const [title, setTitle] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const contextValue = {
        markdownText,
        setMarkdownText
    };

    const [isFollowerOnly, setIsFollowerOnly] = useState(false);
    const handleFollowerCheckBoxChange = (e :any) => {

        setIsFollowerOnly(e.target.checked); 
    };
    
    
    
    const jwt = decodeToken();
    const handleSubmitPost = async () => {
        
        if (!title || !markdownText) {
            setErrorMessage('Missing information')
            return;
        }
        if (markdownText.length <= 20 || markdownText.length > 10000) {
            setErrorMessage("Content lenght most between 20 to 10000 characters")
            return;
        }

        if (jwt === undefined) {
            alert('please login');
            logout();
            return;
        }

        const getPostState = () : string => {
            if(isFollowerOnly){
                return "1";
            }else{
                return "0";
            }
        }

        const body = {
            author: jwt.iss,
            post_title: title,
            post_body: markdownText,
            follower_only: getPostState()
        }

        console.log(body)

        const payload = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader()
            },
            body: JSON.stringify(body)
        }

        // console.log(payload)
        const response = await fetch(`http://${import.meta.env.VITE_BACKEND}:7700/posts`, payload)
        const { status, errors } = await response.json()
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
                    <Container>
                        <FormControlLabel control={<Checkbox checked={isFollowerOnly} onChange={handleFollowerCheckBoxChange} />}
                        label="For your follower only"/>
                    </Container>

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