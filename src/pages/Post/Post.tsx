import { Container, LinearProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { DisplayPost } from "../../model";
import { Author, Contents, StarCount, Title, Wrapper } from "./Post.style";
import ReactMarkdown from "react-markdown";

const PostPage = () => {

    const [data, setData] = useState({} as DisplayPost);
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
                    console.log(data.data);
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
                    <StarCount>Star: {data.star_count}</StarCount>
                    <Author>Author: {data.author}</Author>
                    <Contents>
                        <Title>{data.post_title}</Title>
                        <ReactMarkdown>{data.post_body}</ReactMarkdown>
                    </Contents>
                    {/* <h3>STAR BUTTON</h3> */}
                </Container>
            </Wrapper>
        </>
    );

}

export default PostPage;