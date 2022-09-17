import { Wrapper } from "./Navbar.style";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        window.localStorage.removeItem("jwt");
        navigate('/');
    }

    let t = window.localStorage.getItem("jwt");
    if (typeof t === 'string') {
        if (t && t.length > 0 && t !== 'null') {
            return (
                <Wrapper>
                    <div className="topnav">
                        <Link to={'/'} className={'navElement'}>Home</Link>
                        <Link to={'/add/post'} className={'navElement'} >Post</Link>
                        <Link to={'/status'} className={'navElement'} >About</Link>
                        <Link to={'/profile'} className={'navElement'} style={{ float: 'right' }}>Profile</Link>
                        <Link to= {'#'} onClick={handleLogout} className={'navElement'} style={{ float: 'right' }}>Logout</Link>
                    </div>
                </Wrapper>
            );
        }
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