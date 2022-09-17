import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Wrapper } from "./home.style";

const Home = () => {


    return (
        <>
            <Navbar />
            <Wrapper>

                <h2>Welcome to SE212 term project</h2>
                <h1>Project Akafuyu</h1>
                <Link to={"/posts/0"}>Find recipes</Link>
            </Wrapper>
        </>
    );
}

export default Home;