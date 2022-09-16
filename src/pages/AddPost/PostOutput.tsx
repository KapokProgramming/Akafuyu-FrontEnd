import { ResultArea, Wrapper, Title } from "./Post.style";
import ReactMarkdown from "react-markdown";
import { useContext } from "react";
import PostContext from "./PostContext";

const PostOutput = () => {
    const { markdownText } = useContext(PostContext);

    return (
        <Wrapper>
            <Title>Converted Text</Title>
            <ResultArea>
                <ReactMarkdown>{markdownText}</ReactMarkdown>
            </ResultArea>
        </Wrapper>
    );
}

export default PostOutput