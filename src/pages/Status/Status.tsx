import { useState } from "react";
import { Link } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import { useQuery } from "react-query";
import { Wrapper } from "./Status.style";
import Navbar from "../../components/Navbar/Navbar";

type Response = {
    status: string;
    data: any;
}

const getServerStatus = async (): Promise<Response> => {
    return await (await fetch(`http://${import.meta.env.VITE_BACKEND}:7700/`)).json();
}

const Status = () => {

    const { data, isLoading, error } = useQuery<Response>('data', getServerStatus);

    if (isLoading) return <LinearProgress />;
    if (error) return <div>Something went wrong ...</div>

    return (
        <>
            <Navbar />
            <Wrapper>
                <h3>Backend Status: {data?.data} </h3>

                <Link to="/">back to home</Link>
            </Wrapper>
        </>
    );
}

export default Status;