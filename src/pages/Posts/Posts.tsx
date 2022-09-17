import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Post } from "../../model";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import Block from "../../components/Block/Block"
import { Contents } from "./Posts.style";

const Posts = () => {
    let params = useParams();
    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    let page: number = 0;

    if (typeof params.page === 'string') {
        page = parseInt(params.page);
    }

    useEffect(() => {
        try {
            fetch(`http://${import.meta.env.VITE_BACKEND}:7700/posts?page=${page}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status !== 'success') {
                        setIsError(true);
                        return;
                    }
                    setPosts(data.data)
                    setIsLoading(false);
                })
        } catch (e) {
            if (e) {
                setIsError(true);
            }
        }
    }, [page])

    if (isLoading) {
        return (
            <>
                <Navbar />
                <LinearProgress />
            </>
        );
    }

    if (isError) {
        return (
            <>
                <Navbar />
                Something went wrong...
            </>
        )
    }


    if (posts.length === 0) {
        return (
            <>
                <Navbar />
                <SearchBar />
                <Contents>
                    Data not found!
                    <div className="btn-group">
                        {page > 0 &&
                            <Link to={`/posts/${page - 1}`} ><Button>Previous page</Button></Link>
                        }
                        <Link to={`/posts/${page + 1}`} ><Button>Next page</Button></Link>
                    </div>
                </Contents>
            </>
        )
    } else {
        return (
            <>
                <Navbar />
                <SearchBar />
                <Contents>
                    <Grid container spacing={8}>
                        {posts.map(post => (
                            <Grid item key={post.post_id} xs={10} sm={4}>
                                <Block post={post} />
                            </Grid>
                        ))}
                    </Grid>

                    <div className="btn-group">
                        {page > 0 &&
                            <Link to={`/posts/${page - 1}`} ><Button>Previous page</Button></Link>
                        }
                        <Link to={`/posts/${page + 1}`} ><Button>Next page</Button></Link>
                    </div>

                </Contents>


            </>
        )
    }
}

export default Posts;