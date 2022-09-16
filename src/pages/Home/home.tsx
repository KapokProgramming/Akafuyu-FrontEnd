import { Link } from "react-router-dom";
import { useState } from 'react';
const Home = () => {

    return (
        <div>
            <h2>Welcome to home</h2>
            <h3>We're working now.</h3>
            <h3>Status</h3>

            <Link to="/post">posts</Link>
        </div>
    );
}

export default Home;