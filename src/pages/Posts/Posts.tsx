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
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    let page: number;

    if (typeof params.page === 'string' && /^-?\d+$/.test(params.page)) {
        page = parseInt(params.page);
    } else {
        page = -1;
    }

    useEffect(() => {
        try {
            if (page === -1) {
                setIsSearching(true);
                setIsLoading(false);
                return;
            }

            fetch(`http://${import.meta.env.VITE_BACKEND}:7700/posts?page=${page}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status !== 'success') {
                        setIsError(true);
                        return;
                    }
                    setPosts(data.data)
                    setIsSearching(false);
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


    const onQueryChange = (e: React.ChangeEvent<any>) => {
        const text = e.target.value;
        setQuery(text);
        if (query.length >= 3) {
            console.log(query)
            //do search by title
            // fetch(`http://${import.meta.env.VITE_BACKEND}:7700/posts?page=2`)
            //     .then(res => res.json())
            //     .then(data => {
            //         if (data.status !== 'success') {
            //             setIsError(true);
            //             return;
            //         }
            //         setPosts(data.data)
            //         setIsSearching(false);
            //         setIsLoading(false);
            //     })
        }
    }

    if (isSearching) {
        return (
            <>
                <Navbar />
                <SearchBar onQueryChange={onQueryChange} />
            </>

        )
    }

    if (posts.length === 0) {
        return (
            <>
                <Navbar />
                <SearchBar onQueryChange={onQueryChange} />
                <Contents>
                    Data not found!
                    <div className="btn-group">
                        {page > 0 &&
                            <Link to={`/posts/${page - 1}`} ><Button>Previous page</Button></Link>
                        }
                        {/* <Link to={`/posts/${page + 1}`} ><Button>Next page</Button></Link> */}
                    </div>
                </Contents>
            </>
        )
    } else {
        return (
            <>
                <Navbar />
                <SearchBar onQueryChange={onQueryChange} />
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