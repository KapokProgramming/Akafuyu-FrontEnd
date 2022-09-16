import { Wrapper } from "./Navbar.style";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Wrapper>
            <div className="topnav">
                <Link to={'/'} className={'navElement'}>Home</Link>
                <Link to={'/post'} className={'navElement'} >Post</Link>
                <Link to={'/status'} className={'navElement'} >About</Link>
                <Link to={'/#'} className={'navElement'}>Profile</Link>
            </div>
        </Wrapper>
    );
}

export default Navbar ;