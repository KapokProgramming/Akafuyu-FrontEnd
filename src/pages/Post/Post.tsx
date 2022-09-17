import { Container, LinearProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Post } from "../../model";
import { Author, Contents, Title, Wrapper } from "./Post.style";
import ReactMarkdown from "react-markdown";

const PostPage = () => {

    const [data, setData] = useState({} as Post);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    let params = useParams();

    let id: string;
    if (typeof params.id != 'string' || params.id.length <= 0) {
        setIsError(true);
    } else {
        id = (params.id);
    }

    useEffect(() => {
        try {
            fetch(`http://${import.meta.env.VITE_BACKEND}:7700/post/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status !== 'success') {
                        setIsError(true);
                        return;
                    }
                    setData(data.data)
                    setIsLoading(false);
                })
        } catch (e) {
            if (e) {
                setIsError(true);
            }
        }
    }, [])




    if (isError) {
        return (
            <>
                <Navbar />
                <Wrapper>
                    <Container>
                        <Contents>
                            <h2>Post not found</h2>
                            <Link to = {'/posts/0'}>Back</Link>
                        </Contents>
                    </Container>
                </Wrapper>
            </>
        );
    }


    if (isLoading) {
        return (
            <>
                <Navbar />
                <LinearProgress />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Wrapper>
                <Container>
                    <Author>Written by Some display name ............</Author>
                    <Contents>
                        <Title>{data.title}</Title>
                        <ReactMarkdown>{data.raw_body}</ReactMarkdown>
                    </Contents>
                </Container>
            </Wrapper>
        </>
    );

}

export default PostPage;