import React, { useContext, useState } from "react";
import { TextArea, Title, Wrapper } from "./Post.style";
import PostContext from "./PostContext";

const PostInput = () => {


    const { setMarkdownText } = useContext(PostContext);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setMarkdownText(newText);
    }

    return (
        <Wrapper>
            <Title>Markdown Input</Title>
            <TextArea onChange={onInputChange}></TextArea>
        </Wrapper>
    );
}

export default PostInput;