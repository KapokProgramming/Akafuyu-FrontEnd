import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Post } from "../../model";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import Block from "../../components/Block/Block"
import { Contents } from "./Posts.style";
import { authHeader } from "../../services/data";

const Posts = () => {
    let params = useParams();
    const [posts, setPosts] = useState<Post[]>([])
    const [tempPosts, setTempPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
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
            

            const jwt = authHeader() ;

            const payload = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${jwt}`
                },
            }

            fetch(`http://${import.meta.env.VITE_BACKEND}:7700/posts?page=${page}`, payload)
                .then(res => res.json())
                .then(data => {
                    if (data.status !== 'success') {
                        setIsError(true);
                        return;
                    }
                    console.log(data)
                    setPosts(data.data);
                    setTempPosts(data.data);
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
        console.log(text)
        if (text.length > 2) {
            setPosts([]);
            //Perform search
            // fetch(`http://${import.meta.env.VITE_BACKEND}:7700/posts?page=${page}&title=${text}`)
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
        }else if (text.length === 0 ){
            setPosts(tempPosts);
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
                {/* <h4>Search with {query}</h4> */}
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