import { Link } from "react-router-dom";

const Home = async () => {
    const response = await fetch(`http://${import.meta.env.VITE_BACKEND}:7700/`)
    const { data, status, errors } = await response.json()
    return (
        <div>
            <h2>Welcome to home</h2>
            <h3>We're working now.</h3>
            <h3>Status: {status}</h3>
            

            <Link to="/post">posts</Link>
        </div>
    );
}

export default Home;