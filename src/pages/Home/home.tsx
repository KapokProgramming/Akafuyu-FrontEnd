import { Link } from "react-router-dom";
import { useState } from 'react';
const Home = () => {

    const [serverStatus, setServerStatus] = useState('');

    const url = `http://${import.meta.env.VITE_BACKEND}:7700/test`;
    console.log(url);
    fetch(url).then(res => res.json())
        .then(data => {
            console.log(data)
            setServerStatus(data.status)
        })


    return (
        <div>
            <h2>Welcome to home</h2>
            <h3>We're working now.</h3>
            <h3>Status: {serverStatus}</h3>

            <Link to="/post">posts</Link>
        </div>
    );
}

export default Home;