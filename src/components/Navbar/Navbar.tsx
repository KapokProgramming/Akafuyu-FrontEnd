import { Wrapper } from "./Navbar.style";
import { Link } from "react-router-dom";

const Navbar = () => {
    let t = window.localStorage.getItem("jwt");

    if (t) {
        return (
            <Wrapper>
                <div className="topnav">
                    <Link to={'/'} className={'navElement'}>Home</Link>
                    <Link to={'/add/post'} className={'navElement'} >Post</Link>
                    <Link to={'/status'} className={'navElement'} >About</Link>
                    <Link to={'/profile'} className={'navElement'} style={{ float: 'right' }}>Profile</Link>
                    <Link to={'/profile'} className={'navElement'} style={{ float: 'right' }}>Logout</Link>
                </div>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div className="topnav">
                <Link to={'/'} className={'navElement'}>Home</Link>
                <Link to={'/status'} className={'navElement'} >About</Link>
                <Link to={'/login'} className={'navElement'} style={{ float: 'right' }}>Login</Link>
                <Link to={'/register'} className={'navElement'} style={{ float: 'right' }}>Register</Link>
            </div>
        </Wrapper>
    );
}

export default Navbar;