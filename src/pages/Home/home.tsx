import { Link } from "react-router-dom";

const Home = () => {
    const url = `http://${import.meta.env.VITE_BACKEND}:7700/`;
    console.log(url);
    fetch(url).then(res => res.json())
    .then(data => console.log(data))

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