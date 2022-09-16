import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Post } from "../../model";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Grid } from "@material-ui/core";

type Response = {
    status: string;
    data: Post[];
}

const getDisplayPost = async (): Promise<Response> => {
    return await (await fetch(`http://${import.meta.env.VITE_BACKEND}:7700/posts`)).json();
}

const Home = () => {

    const { data, isLoading, error } = useQuery<Response>('data', getDisplayPost);


    if (error) {
        return (
            <>
                <Navbar />
                Something went wrong...
            </>
        )
    }

    if (isLoading) {
        return (
            <>
                <Navbar />
                <LinearProgress />
            </>
        )
    }

    return (
        <>
            <Navbar />
            {data?.data.map(post => (
                <Grid item key={post.post_id} xs={12} sm={4}>
                    <h2>{post.post_id}. {post.title}</h2>
                </Grid>
            ))}

            <Link to ={"/posts"}>Find more recipes</Link>
        </>
    );
}

export default Home;