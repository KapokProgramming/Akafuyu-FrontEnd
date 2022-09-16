import { Link } from "react-router-dom";

const Home = () => {
    return (
    <div>
        <h2>Welcome to home</h2>
        <h3>We're working now.</h3>
        <Link to="/post">posts</Link>
    </div>
    );
}

export default Home;