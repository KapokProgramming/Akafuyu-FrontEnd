import { JWT } from "../model";
import { useJwt } from "react-jwt";

export function authHeader() {
    const token = localStorage.getItem("jwt");
    let jwt = null;
    if (token) {
        jwt = `${token}`;
    }
    if (jwt) {
        return jwt;
    } else {
        return '';
    }
}

export function decodeToken() {
    const token = localStorage.getItem("jwt");
    if(token === null) return ;

    const { decodedToken, isExpired } = useJwt<JWT>(token);
    if (isExpired) {
        alert('token expired');
        logout() ;
    }else{
        if (decodedToken !== null && typeof decodedToken !== 'undefined') {
            return decodedToken
        }
    }
}

export function logout() {
    localStorage.removeItem("jwt");
    window.location.href = "/";
}
