import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div>
            <h2>Welcome to home</h2>
            <h3>We're working now.</h3>
            <ul>
            <li><Link to="/post">posts</Link></li>
            <li><Link to="/status">status</Link></li>
            </ul>
        </div>
    );
}

export default Home;