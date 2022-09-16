import { useState } from "react";
import { TextArea, Title, Wrapper } from "./Post.style";
import LinearProgress from '@material-ui/core/LinearProgress';
import PostContext from "./PostContext";
import PostInput from "./PostInput";
import PostOutput from "./PostOutput";
import Navbar from "../../components/Navbar/Navbar";

const Post = () => {
    const [markdownText, setMarkdownText] = useState("");
    const [title, setTitle] = useState("");

    const contextValue = {
        markdownText,
        setMarkdownText
    };

    const handleSubmitPost = async () => {

        const body = {
            title: title,
            raw_body: markdownText
        }

        const payload = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        
        const response  = await fetch(`http://${import.meta.env.VITE_BACKEND}:7700/posts`, payload)
        const {data,status, errors} = await response.json()
        if(errors) {
            console.error(errors)
        }

        if (response.ok) {
            console.log(status)
            console.log(data)
        }
        

    }

    return (
        <PostContext.Provider value={contextValue}>
            <Navbar />
            <Wrapper>
                <Title>Markdown Editor</Title>
                <label>
                    <h3>Title</h3>
                    <input type="text" onChange={event => { setTitle(event.target.value) }}></input>
                </label>
                <PostInput />
                <PostOutput />
            </Wrapper>

            <button onClick={handleSubmitPost}>submit</button>
        </PostContext.Provider>
    );
};

export default Post;