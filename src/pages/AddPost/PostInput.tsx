
import React, { useContext, useState } from "react";
import { TextArea, Title, Wrapper } from "./Post.style";
import PostContext from "./PostContext";

const PostInput = () => {


    const { setMarkdownText } = useContext(PostContext);

    const onInputChange = (e: React.ChangeEvent<any>): void => {
        const newText = e.target.value;
        setMarkdownText(newText);
    }

    return (
        <Wrapper>

            <Title>Write your post in markdown here</Title>
            <TextArea onChange={onInputChange} ></TextArea>

        </Wrapper>
    );
}

export default PostInput;